import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'
import ThetaCase from './pages/ThetaCase'
import { AskDataCase } from './pages/AskDataCase'
import { BoschSchemaCase } from './pages/BoschSchemaCase'
import { AIValleyCase } from '@/pages/AIValleyCase'

/** 路由切换时回到顶部（hash 锚点除外） */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/theta" element={<ThetaCase />} />
        <Route path="/work/genai-analytics" element={<AskDataCase />} />
        <Route path="/work/bosch-schema" element={<BoschSchemaCase />} />
        <Route path="/work/ai-valley" element={<AIValleyCase />} />
      </Routes>
    </>
  )
}
