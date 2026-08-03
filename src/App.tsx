import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import Home from './pages/Home'
import ThetaCase from './pages/ThetaCase'
import { AskDataCase } from './pages/AskDataCase'
import { BoschSchemaCase } from './pages/BoschSchemaCase'
import { AIValleyCase } from '@/pages/AIValleyCase'
import { LivingArtCase } from '@/pages/LivingArtCase'
import NotFound from './pages/NotFound'

/** 路由切换时回到顶部（hash 锚点除外） */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/** GitHub Pages 的 404.html 把深链塞进 ?spa=/...，这里还原成真实路由 */
function useSpaRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const target = params.get('spa')
    if (!target) return
    const rest = [...params.entries()].filter(([k]) => k !== 'spa')
    const query = rest.length ? '?' + new URLSearchParams(rest).toString().replace(/~and~/g, '&') : ''
    navigate(target.replace(/~and~/g, '&') + query + window.location.hash, { replace: true })
  }, [navigate])
}

export default function App() {
  useSpaRedirect()
  return (
    <>
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[200] rounded-full bg-plum px-5 py-2.5 text-[13px] font-medium text-cream focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/theta" element={<ThetaCase />} />
        <Route path="/work/genai-analytics" element={<AskDataCase />} />
        <Route path="/work/bosch-schema" element={<BoschSchemaCase />} />
        <Route path="/work/ai-valley" element={<AIValleyCase />} />
        <Route path="/work/therapy-as-living-art" element={<LivingArtCase />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
