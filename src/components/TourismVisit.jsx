'use client'

import { useRouter } from 'next/navigation'
import TourismInfo from './TourismInfo'

export default function TourismVisit() {
  const router = useRouter()

  const handleRegisterClick = () => {
    router.push('/tourism-visit/register')
  }

  return <TourismInfo onRegisterClick={handleRegisterClick} />
}