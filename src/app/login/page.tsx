'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button 
        onClick={() => signIn('github', { callbackUrl: '/' })}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#24292e',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Se connecter avec GitHub
      </button>
    </div>
  )
}