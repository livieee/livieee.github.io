import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import Home from './pages/Home'
import ThetaCase from './pages/ThetaCase'
import { AskDataCase } from './pages/AskDataCase'
import { BoschSchemaCase } from './pages/BoschSchemaCase'
import { AIValleyCase } from '@/pages/AIValleyCase'
import { LivingArtCase } from '@/pages/LivingArtCase'
import NotFound from './pages/NotFound'

/**
 * 路由切换时回到顶部；带 hash 时滚到对应锚点。
 *
 * 跨页深链（首页 → /work/theta#pitch-story）有两个坑：目标节点在导航那一刻
 * 还没挂载，浏览器的原生锚点跳转会落空；就算找到了，上方还有一堆懒加载图片，
 * 落位后会把内容往下顶，一次性对齐会偏掉。所以这里持续校正约 1.6s，
 * 位置连续两次稳定就收工；用户一旦自己动了就立刻停手。
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let stop = false
    let stable = 0
    let last = Number.NaN
    const bail = () => {
      stop = true
    }
    // 用户接管就不再纠正
    window.addEventListener('wheel', bail, { passive: true, once: true })
    window.addEventListener('touchstart', bail, { passive: true, once: true })
    window.addEventListener('keydown', bail, { once: true })

    const t0 = performance.now()
    const tick = () => {
      if (stop) return
      const el = document.querySelector(hash)
      if (el) {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY)
        // 要连续 ~20 帧（约 1/3 秒）位置都没变才算稳，
        // 只看两帧会被"图片还没开始加载"的假平稳骗过去
        if (top === last) {
          if (++stable >= 20) return
        } else {
          stable = 0
          last = top
        }
        // 必须 instant：全站 html 上有 scroll-behavior: smooth，
        // 逐帧再发一次 scrollTo 会不停重启平滑动画，永远追不上目标
        window.scrollTo({ top, behavior: 'instant' as ScrollBehavior })
      }
      if (performance.now() - t0 < 3000) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    return () => {
      stop = true
      window.removeEventListener('wheel', bail)
      window.removeEventListener('touchstart', bail)
      window.removeEventListener('keydown', bail)
    }
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
