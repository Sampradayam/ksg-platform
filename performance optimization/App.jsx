import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))
const Courses = lazy(() => import("./pages/Courses"))
const Gallery = lazy(() => import("./pages/Gallery"))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
