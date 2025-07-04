


// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     return NextResponse.json({ text });
//   } catch (err) {
//     console.error("Gemini error:", err);
//     return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
//   }
// }



// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { db } from '@/app/firebase/firebaseConfig';
// import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt, userId, issueId } = await req.json();

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     // Store the conversation in Firestore
//     if (userId && issueId) {
//       const docRef = doc(db, 'users', userId, 'savedIssues', issueId);
//       await updateDoc(docRef, {
//         chatHistory: arrayUnion({
//           prompt,
//           response: text,
//           timestamp: new Date().toISOString()
//         })
//       });
//     }

//     return NextResponse.json({ text });
//   } catch (err) {
//     console.error("Gemini error:", err);
//     return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
//   }
// }



// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { db } from '@/app/firebase/firebaseConfig';
// import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// function cleanGeminiResponse(text: string): string {
//   return text
//     .replace(/!\[.*?\]\((?!https?:\/\/).*?\)/g, '') // Remove broken image links
//     .replace(/!Image/g, '')                         // Remove !Image placeholders
//     .replace(/\n{3,}/g, '\n\n')                     // Trim excessive newlines
//     .trim();
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt, userId, issueId, chatHistory } = await req.json();

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Build conversation history for context
//     const chatSession = model.startChat({
//       history: [
//         ...(chatHistory || []).flatMap((chat: any) => [
//           { role: "user", parts: [{ text: chat.prompt }] },
//           { role: "model", parts: [{ text: chat.response }] },
//         ])
//       ],
//     });

//     const result = await chatSession.sendMessage(prompt);
//     const response = await result.response;
//  const rawText = response.text();

// const text = cleanGeminiResponse(rawText);
//     // Store the conversation in Firestore
//     if (userId && issueId) {
//       const docRef = doc(db, 'users', userId, 'savedIssues', issueId);
//       await updateDoc(docRef, {
//         chatHistory: arrayUnion({
//           prompt,
//           response: text,
//           timestamp: new Date().toISOString()
//         })
//       });
//     }

//     return NextResponse.json({ text });
//   } catch (err) {
//     console.error("Gemini error:", err);
//     return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/app/firebase/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 🧼 Sanitize Gemini response (optional but helpful)
function cleanGeminiResponse(text: string): string {
  return text
    .replace(/!\[.*?\]\((?!https?:\/\/).*?\)/g, '') // Remove broken image links
    .replace(/!Image/g, '')                         // Remove !Image placeholders
    .replace(/\n{3,}/g, '\n\n')                     // Trim excessive newlines
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, userId, issueId, chatHistory } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Reworded prompt to guide Gemini for better markdown
    const betterPrompt = `
Please analyze and explain the following GitHub issue clearly.

If the issue mentions images, format them using proper markdown like:
![Alt text](https://link-to-image.com/image.png)

Do NOT use !Image or placeholders.

Issue details:
${prompt}
`;

    // Provide chat history if available
    const chatSession = model.startChat({
      history: [
        ...(chatHistory || []).flatMap((chat: any) => [
          { role: "user", parts: [{ text: chat.prompt }] },
          { role: "model", parts: [{ text: chat.response }] },
        ]),
      ],
    });

    const result = await chatSession.sendMessage(betterPrompt);
    const rawText = await result.response.text();
    const cleanedText = cleanGeminiResponse(rawText);

    // Save to Firestore
    if (userId && issueId) {
      const docRef = doc(db, 'users', userId, 'savedIssues', issueId);
      await updateDoc(docRef, {
        chatHistory: arrayUnion({
          prompt,
          response: cleanedText,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ text: cleanedText });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
