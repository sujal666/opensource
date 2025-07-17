// // File: app/api/updateAllLeaderboard/route.ts

// import { NextResponse } from 'next/server';
// import { db } from '@/app/firebase/firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// export const runtime = 'edge';


// export async function GET() {
//   try {
//     const snapshot = await getDocs(collection(db, 'leaderboard'));

//     // Loop through all users and re-fetch their GitHub data
//     for (const doc of snapshot.docs) {
//       const userId = doc.data().userId;
//       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateLeaderboard`, {
//         headers: { Cookie: `__session=${process.env.SESSION_COOKIE}` }, // if auth required
//       });
//     }

//     return NextResponse.json({ message: 'All leaderboard data updated.' });
//   } catch (error) {
//     console.error('Error updating all leaderboard:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }


// // File: app/api/updateAllLeaderboard/route.ts

// import { NextResponse } from 'next/server';
// import { db } from '@/app/firebase/firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// export const runtime = 'edge';

// // ✅ Schedule this API route to run daily at midnight UTC
// export const config = {
//   schedule: '0 0 * * *'
// };

// export async function GET() {
//   try {
//     const snapshot = await getDocs(collection(db, 'leaderboard'));

//     // Loop through all users and re-fetch their GitHub data
//     for (const doc of snapshot.docs) {
//       const userId = doc.data().userId;
//       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateLeaderboard`, {
//         headers: { Cookie: `__session=${process.env.SESSION_COOKIE}` }, // if auth required
//       });
//     }

//     return NextResponse.json({ message: 'All leaderboard data updated.' });
//   } catch (error) {
//     console.error('Error updating all leaderboard:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }




import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const runtime = 'edge';
export const config = {
  schedule: '0 0 * * *' // daily at midnight UTC
};

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'leaderboard'));

    for (const docSnap of snapshot.docs) {
      const userId = docSnap.data().userId;
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateLeaderboard?userId=${userId}`);
    }

    return NextResponse.json({ message: 'All leaderboard data updated.' });
  } catch (error) {
    console.error('Error updating all leaderboard:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
