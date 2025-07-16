// import { NextResponse } from 'next/server';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { db } from '@/app/firebase/firebaseConfig';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const filter = searchParams.get('filter') || 'weekly'; // daily, weekly, monthly

//     const usersSnapshot = await getDocs(collection(db, 'users'));
//     const leaderboard = [];

//     for (const doc of usersSnapshot.docs) {
//       const user = doc.data();
      
//       // Assuming contributions and issuesSolved are stored in the user document
//       // These fields will be populated by ClerkFirebaseSync
//       const contributions = user[`contributions_${filter}`] || 0;
//       const issuesSolved = user[`issuesSolved_${filter}`] || 0;

//       if (contributions === 0 && issuesSolved === 0) {
//         continue; // Skip users with no activity for the selected filter
//       }

//       leaderboard.push({
//         id: user.id,
//         name: user.name || 'Unknown User',
//         imageUrl: user.imageUrl || '/default-avatar.png',
//         contributions,
//         issuesSolved,
//         score: contributions + issuesSolved, // Simple scoring
//       });
//     }

//     leaderboard.sort((a, b) => b.score - a.score);
//     const rankedUsers = leaderboard.map((user, index) => ({ ...user, rank: index + 1 }));

//     return NextResponse.json(rankedUsers);

//   } catch (error) {
//     console.error('Failed to fetch leaderboard:', error);
//     return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
//   }
// }





// // File: app/api/leaderboard/route.ts

// import { NextResponse } from 'next/server';
// import { db } from '@/app/firebase/firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// export async function GET() {
//   try {
//     const snapshot = await getDocs(collection(db, 'leaderboard'));

//     const users: any[] = [];
//     snapshot.forEach((doc) => {
//       users.push(doc.data());
//     });

//     // Sort by totalContributions descending
//     users.sort((a, b) => b.totalContributions - a.totalContributions);

//     return NextResponse.json(users);
//   } catch (error) {
//     console.error('Error fetching leaderboard:', error);
//     const errorMessage = (error instanceof Error) ? error.message : 'Internal Server Error';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }


// // File: app/api/leaderboard/route.ts
// //working
// import { NextResponse } from 'next/server';
// import { db } from '@/app/firebase/firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const page = parseInt(searchParams.get('page') || '1');
//   const limit = parseInt(searchParams.get('limit') || '10');

//   try {
//     const snapshot = await getDocs(collection(db, 'leaderboard'));
//     const users: any[] = [];
//     snapshot.forEach((doc) => users.push(doc.data()));

//     // Sort by totalContributions descending
//     users.sort((a, b) => b.totalContributions - a.totalContributions);

//     // Pagination
//     const startIndex = (page - 1) * limit;
//     const paginatedUsers = users.slice(startIndex, startIndex + limit);

//     return NextResponse.json({
//       data: paginatedUsers,
//       total: users.length,
//       page,
//       totalPages: Math.ceil(users.length / limit),
//     });
//   } catch (error) {
//     console.error('Error fetching leaderboard:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }






// File: app/api/leaderboard/route.ts
//working
import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const filter = searchParams.get('filter') || 'all';

  try {
        let q;

    // Calculate date ranges for filtering
    const now = new Date();
   const startDate = new Date();

    if (filter === 'weekly') {
      startDate.setDate(now.getDate() - 7);
    } else if (filter === 'monthly') {
      startDate.setMonth(now.getMonth() - 1);
    }

    if (filter === 'weekly' || filter === 'monthly') {
      q = query(
        collection(db, 'leaderboard'),
        where('updatedAt', '>=', startDate.toISOString())
      );
    } else {
      q = collection(db, 'leaderboard');
    }
    const snapshot = await getDocs(collection(db, 'leaderboard'));
    const users: any[] = [];
    snapshot.forEach((doc) => users.push(doc.data()));

    // Sort by totalContributions descending
    users.sort((a, b) => b.totalContributions - a.totalContributions);

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedUsers = users.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: paginatedUsers,
      total: users.length,
      page,
      totalPages: Math.ceil(users.length / limit),
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
