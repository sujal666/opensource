
'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'


export const ClerkFirebaseSync = () => {
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    if (!isSignedIn || !user) return

    const syncUserToFirestore = async () => {
      try {
        const userRef = doc(db, 'users', user.id)

        await setDoc(
          userRef,
          {
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            imageUrl: user.imageUrl || '',
            createdAt: new Date().toISOString(),
          },
          { merge: true } // merge so we don't overwrite existing data
        )

        console.log('✅ Clerk user synced to Firestore')
      } catch (err) {
        console.error('❌ Failed to sync Clerk user to Firestore:', err)
      }
    }

    syncUserToFirestore()
  }, [user, isSignedIn])

  return null
}
