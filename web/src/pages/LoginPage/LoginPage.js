import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'
import { RPCError, RPCErrorCode } from 'magic-sdk'
import { useState } from 'react'
import ProfileCell from 'src/components/ProfileCell'

const LoginPage = () => {
  const [error, setError] = useState(null)

  const { isAuthenticated, logIn, logOut } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const email = e.currentTarget.email.value

    try {
      logIn({ email })
    } catch (err) {
      if (err instanceof RPCError) {
        switch (err.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
            return <div> RPCErrorCode.MagicLinkFailedVerification </div>
          case RPCErrorCode.MagicLinkExpired:
            return <div>RPCErrorCode.MagicLinkExpired </div>
          case RPCErrorCode.MagicLinkRateLimited:
            return <div>RPCErrorCode.MagicLinkRateLimited </div>
        }
      }
    }
  }

  return (
    <>
      <h1>LoginPage</h1>

      <br />
      {isAuthenticated ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <ProfileCell />
          </div>
          <br />
          <button onClick={() => logOut()}> Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="email" style={{ marginRight: 20 }}>
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="you@example.co.uk"
              required
            />
          </div>

          <button type="submit">login</button>
        </form>
      )}
    </>
  )
}

export default LoginPage
