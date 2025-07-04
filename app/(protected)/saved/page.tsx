// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';

// import { collection, getDocs } from 'firebase/firestore';
// import { RepositoryIssue } from '@/lib/types';

// import { db } from '@/app/firebase/firebaseConfig';
// import { DashboardTable } from '../dashboard/_components/DashboardTable';

// export default function SavedIssuesPage() {
//   const { user, isSignedIn } = useUser();
//   const [savedIssues, setSavedIssues] = useState<RepositoryIssue[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isSignedIn || !user) return;

//     const fetchSavedIssues = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'users', user.id, 'savedIssues'));
//         const issues = snapshot.docs.map((doc) => doc.data() as RepositoryIssue);
//         setSavedIssues(issues);
//       } catch (error) {
//         console.error("Failed to fetch saved issues:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedIssues();
//   }, [user, isSignedIn]);

//   if (loading) return <div className="p-4">Loading saved issues...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Saved Issues</h1>
//       <DashboardTable customData={savedIssues} disableFilters />
//     </div>
//   );
// }


// 'use client'

// import { useSavedIssues } from '@/hooks/useSavedIssues'
// import { DashboardTable } from '../dashboard/_components/DashboardTable'


// export default function SavedPage() {
//   const { savedIssues, loading } = useSavedIssues()

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Saved Issues</h1>
//       <DashboardTable customData={savedIssues} disableFilters={true} />
//     </div>
//   )
// }


'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

import { RepositoryIssue } from '@/lib/types'
import { DashboardTable } from '../dashboard/_components/DashboardTable'
import { db } from '@/app/firebase/firebaseConfig'
 // Adjust path accordingly

export default function SavedPage() {
  const { user, isSignedIn } = useUser()
  const [savedIssues, setSavedIssues] = useState<RepositoryIssue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn || !user) return

    const fetchSavedIssues = async () => {
      setLoading(true)
      try {
        const ref = collection(db, 'users', user.id, 'savedIssues')
        const snapshot = await getDocs(ref)

        const issues: RepositoryIssue[] = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          issues.push({
            id: data.id,
            title: data.title,
            url: data.url,
            repoName: data.repoName,
            repoUrl: data.repoUrl,
            language: data.language,
            difficulty: data.difficulty,
            updatedAt: data.updatedAt,
            createdAt: data.createdAt,
            //@ts-ignore
            labels: data.labels || [],
            state: data.state,
            comments: data.comments ?? 0,
            body: data.body ?? '',
          })
        })

        setSavedIssues(issues)
      } catch (err) {
        console.error('Error fetching saved issues:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedIssues()
  }, [isSignedIn, user])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Saved Issues</h1>
      <DashboardTable customData={savedIssues} disableFilters={true} />
    </div>
  )
}
