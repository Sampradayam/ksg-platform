'use client'

import { useRouter } from 'next/navigation'

export default function TourismInfo({
  data = {
    title: 'Cultural Tourism',
    description: 'Explore the rich heritage and traditions.',
    overview: 'This is an overview of the cultural site.',
    significance: 'Learn about its historical importance.',
    visitingInfo: 'Information on how to visit.'
  },
  isLoading = false,
  error = null,
  onRegisterClick
}) {
  const router = useRouter()

  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick()
    } else {
      router.push('/tourism-visit/register')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <p className="text-xl text-gray-600">{data.description}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{data.overview}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Significance</h2>
          <p className="text-gray-700 leading-relaxed">{data.significance}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visiting Information</h2>
          <p className="text-gray-700 leading-relaxed">{data.visitingInfo}</p>
        </section>

        <div className="text-center">
          <button
            onClick={handleRegisterClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Plan Your Visit
          </button>
        </div>
      </div>
    </div>
  )
}