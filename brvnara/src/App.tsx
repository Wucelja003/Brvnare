import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import IntroOverlay from './Components/IntroOverlay'
import Home from './Pages/Home'
import ProcessPage from './Pages/ProcessPage'
import ModelsPage from './Pages/ModelsPage'
import Contact from './Pages/Contact'

// three.js je težak — učitava se kao zaseban chunk
const SilkWaves = lazy(() => import('./Components/SilkWaves'))

// Krem paleta (tamniji tan → svetli krem)
const creamSilk = [
  '#b89a68',
  '#c1a575',
  '#c9b082',
  '#d2bb92',
  '#dbc6a3',
  '#e4d2b6',
  '#eddecb',
  '#f6ecda',
]

export default function App() {
  return (
    <BrowserRouter>
      {/* Uvodna animacija (jednom po sesiji) */}
      <IntroOverlay />

      {/* Globalna animirana pozadina u krem tonovima */}
      <Suspense fallback={null}>
        <div className="pointer-events-none fixed inset-0 -z-10 bg-brand-cream">
          <SilkWaves
            colors={creamSilk}
            speed={0.6}
            scale={2}
            distortion={1}
            curve={1}
            contrast={1}
            brightness={1}
            opacity={0.5}
            frequency={1}
            complexity={1}
          />
        </div>
      </Suspense>

      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proces" element={<ProcessPage />} />
          <Route path="/modeli" element={<ModelsPage />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
