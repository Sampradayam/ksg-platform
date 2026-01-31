'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ConfirmationPage({ referenceId, status }) {
  const router = useRouter()

  useEffect(() => {
    // Focus on heading for accessibility
    const heading = document.getElementById('confirmation-heading')
    if (heading) heading.focus()
  }, [])

  const getStatusContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: '✅',
          title: 'Registration Successful!',
          message: 'Your visit request has been submitted successfully.',
          nextSteps: [
            'You will receive a confirmation email shortly.',
            'Our team will contact you within 24 hours to finalize arrangements.',
            'Please keep your reference ID for future communications.'
          ]
        }
      case 'pending':
        return {
          icon: '⏳',
          title: 'Registration Pending',
          message: 'Your request is being processed.',
          nextSteps: [
            'We are reviewing your submission.',
            'You will be notified once approved.'
          ]
        }
      case 'error':
        return {
          icon: '❌',
          title: 'Registration Failed',
          message: 'There was an error processing your request.',
          nextSteps: [
            'Please try again or contact support.'
          ]
        }
      default:
        return {
          icon: '❓',
          title: 'Unknown Status',
          message: 'Something went wrong.',
          nextSteps: []
        }
    }
  }

  const content = getStatusContent()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-6xl mb-4" aria-hidden="true">
          {content.icon}
        </div>

        <h1
          id="confirmation-heading"
          className="text-2xl font-bold text-gray-900 mb-4"
          tabIndex={-1}
        >
          {content.title}
        </h1>

        <p className="text-gray-600 mb-6">{content.message}</p>

        {referenceId && (
          <div className="bg-gray-100 rounded p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Reference ID</p>
            <p className="text-lg font-mono font-bold text-gray-900">{referenceId}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Next Steps</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            {content.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => router.push('/')}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Home
          </button>
          <button
            onClick={() => router.push('/tourism-visit')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Tourism Info
          </button>
        </div>
      </div>
    </div>
  )
}