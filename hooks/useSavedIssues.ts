// hooks/useSavedIssues.ts
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { RepositoryIssue } from '@/lib/types'
import { db } from '@/app/firebase/firebaseConfig'

export const useSavedIssues = () => {
  const { user, isSignedIn } = useUser()
  const [savedIssues, setSavedIssues] = useState<RepositoryIssue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSaved = async () => {
      if (!isSignedIn || !user) return

      setLoading(true)
      try {
        const snapshot = await getDocs(
          collection(db, 'users', user.id, 'savedIssues')
        )

        const issues = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RepositoryIssue[]

        setSavedIssues(issues)
      } catch (err) {
        console.error('Error fetching saved issues:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSaved()
  }, [user, isSignedIn])

  return { savedIssues, loading }
}
