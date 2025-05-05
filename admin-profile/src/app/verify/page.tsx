'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [message, setMessage] = useState('Verifying...')

  useEffect(() => {
    if (!token) {
      setMessage("Missing token.")
      return
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/admin-x98p9v1k?token=${token}`)
        const text = await res.text()
        setMessage(text)
      } catch (err) {
        setMessage("An error occurred during verification.")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <p className="text-lg font-semibold text-center">{message}</p>
      </div>
    </div>
  )
}
