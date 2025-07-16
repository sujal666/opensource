
import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseConfig';

export async function GET() {
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const totalUsers = usersSnapshot.size;
    return NextResponse.json({ totalUsers });
  } catch (error) {
    console.error('Error fetching total users:', error);
    return NextResponse.json({ error: 'Failed to fetch total users' }, { status: 500 });
  }
}
