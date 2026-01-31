import React from 'react'
import SeoSocialSharing from './components/SeoSocialSharing'

export default function Home() {
  return (
    <>
      <SeoSocialSharing
        meta={{
          titleKey: 'sampradayam.home.title',
          descriptionKey: 'sampradayam.home.description',
          keywordsKey: 'sampradayam.home.keywords',
        }}
        openGraph={{
          titleKey: 'sampradayam.home.title',
          descriptionKey: 'sampradayam.home.description',
          imageUrl: '/assets/og/home.jpg',
          pageUrl: 'https://sampradayam.org',
        }}
      />
      <main>
        <h1>Sampradayam</h1>
        <p>
          Welcome to the example Home page using the combined SEO & social sharing module.
        </p>
      </main>
    </>
  )
}
