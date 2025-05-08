import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../utils/config-firebase'
import { defineNuxtPlugin } from '#app'

// Initialize Firebase App

export default defineNuxtPlugin(() => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  return { provide: { auth } }
})
