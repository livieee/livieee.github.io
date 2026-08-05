# HANDOFF — 给接手这个仓库的 coding agent

这份文档给任何 AI coding agent（Claude Code / Cursor / Codex / Copilot …）用。
把它整份粘进对话，或让 agent 先读它，再开始干活。

**一句话**：这是 Olivia Xiao 的个人作品集网站。内容真实性、无障碍与移动端适配
的优先级高于视觉花活；所有改动都要在浏览器里截图验证过才算完成。

---

## 1. 项目速览

| | |
|---|---|
| 线上 | https://livieee.github.io |
| 仓库 | `livieee/livieee.github.io`，默认分支 `main` |
| 栈 | Vite + React 19 + TypeScript + Tailwind CSS 3 + react-router（`BrowserRouter`） |
| 动画 | 以 CSS keyframes / `animation-timeline` 为主；`motion/react` 只在少数处 |
| 部署 | push 到 `main` 触发 GitHub Actions，约 1 分钟上线。**不要手动改 `dist/`** |

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 会先跑 prebuild 检查，见 §5
npm run lint
npm run check:tw   # Tailwind 透明度刻度检查
```

### 路由

| 路径 | 文件 |
|---|---|
| `/` | `src/pages/Home.tsx`（组合 `src/sections/*`） |
| `/work/theta` | `src/pages/ThetaCase.tsx` |
| `/work/genai-analytics` | `src/pages/AskDataCase.tsx` |
| `/work/bosch-schema` | `src/pages/BoschSchemaCase.tsx` |
| `/work/ai-valley` | `src/pages/AIValleyCase.tsx` |
| `/work/therapy-as-living-art` | `src/pages/LivingArtCase.tsx` |

---

## 2. 内容红线与素材来源 → 见 `HANDOFF.private.md`

这个仓库是公开的，所以**内容红线（可验证性、合规口径、脱敏清单、素材授权）、
素材出处清单、用户的个人偏好**都放在 `HANDOFF.private.md`，那份文件不进 git。

**开工前一定要先读那份。** 里面的约束优先级高于本文档的一切技术建议：
写错一句话的代价，比写错一段 CSS 大得多。

如果你手上没有 `HANDOFF.private.md`，先向用户要，不要凭猜测写任何
涉及她经历、头衔、数字或第三方素材的内容。

## 3. 设计系统

字体（`tailwind.config.js`）：

- `font-serif` → **Fraunces**（标题、引语，一律 `font-light`）
- `font-sans` → **Instrument Sans**（正文）
- `font-hand` → **Caveat**（旁注、俏皮的一句话）

主色：`plum` `plum-muted` `plum-faint` / `orchid` / `rose` / `champagne` / `cream`。
案例页里项目自己的色相用十六进制内联（如脑电频带的五个颜色）。

`src/index.css` 的 `@layer components` 里有一套代币，**优先复用，别再手搓长串类名**：

| 类 | 用途 |
|---|---|
| `.label-text` | 全大写小标签 |
| `.glass-panel` / `.glass-panel-strong` | 暗场玻璃面板 |
| `.glass-pill` / `.glass-pill-solid` | 暗场玻璃按钮 |
| `.accent-badge` | 左侧竖线徽章（比圆角 pill 更有编辑感） |
| `.glass-edge` | 玻璃边缘折射：`mask-composite` 裁出 1.4px 渐变边环，上下亮两侧透 |
| `.halftone` | 照片上叠 5×5px 网点（`mix-blend-multiply`），印刷质感 |
| `.stamp` | 盖章动效（详见 §6） |
| `.beat-in` / `.read-progress` | CSS 滚动驱动动画（详见 §6） |
| `.paper-grid` / `.grain` | 纸张纹理 |

**语气**：句首大写而非 Title Case；不要 "Elevate / Seamless / Unleash / Next-Gen"
这类营销词；感叹号能省则省。

---

## 4. 已经踩过的坑（**开工前务必读完**）

这些都是真实调试出来的，重犯一次要花掉半小时以上。

### 4.1 Tailwind 透明度刻度

`bg-white/92`、`border-plum/8`、`bg-rose/12` 这类值**不在默认刻度上**
（只有 `0 5 10 15 … 90 95 100`）。Tailwind **不会生成这些类**，
表现是"底色整个消失"——不报错、不警告，肉眼极难发现。

**这个坑在本仓库出现过 3 次、累计 23 处。** 现在有守卫：

```bash
npm run check:tw        # 也会在 npm run build 前自动跑（prebuild）
```

写出刻度外的值，build 会直接失败并打印文件与行号。**不要绕过它。**

### 4.2 CSS 3D

- **`opacity < 1` 会打平 `preserve-3d`。** 想淡出 3D 场景里的元素，
  把 opacity 加在叶子节点上，不要加在带 `preserve-3d` 的祖先上。
  （小樱牌牌阵曾因此"抽完牌后所有牌都变成背面"。）
- `preserve-3d` 必须每一层祖先都有，断一层就塌。
- **CSS animation 的 `fill-mode: both` 会盖掉内联 style。**
  想用 React state 控制透明度，就别在同一个节点上挂带 fill-mode 的入场动画；
  把动画移到内层 wrapper。
- 透明的 3D 轨道层会挡住点击（命中测试按几何形状而非像素）。
  轨道加 `pointer-events-none`，子元素加 `pointer-events-auto`。

### 4.3 滚动与锚点

- 全站 `html { scroll-behavior: smooth }`。**任何逐帧校正滚动的代码
  必须用 `window.scrollTo({ top, behavior: 'instant' })`**，
  否则每帧都在重启平滑动画，永远追不上目标（曾稳定偏低 685px）。
- 跨页深链（`/work/theta#pitch-story`）有两个坑：目标节点在导航那一刻
  还没挂载；上方懒加载图片落位后会把内容往下顶。
  处理逻辑在 `src/App.tsx` 的 `ScrollToTop`：持续校正 3s、位置连续 20 帧
  稳定才收工、用户一动就停手。改它之前先读注释。
- GitHub Pages 的 SPA 深链靠 `dist/404.html`（build 时由 `index.html` 复制）
  + `useSpaRedirect()`。`curl` 拿到 404 状态码是正常的，浏览器里能正确落地。
- **`overflow: hidden` 会让祖先变成滚动容器，`animation-timeline: view()`
  会绑到它身上 —— 而它永远不滚，进度就卡死不动**（Contact 段曾因此卡在
  64.4%）。祖先只是为了裁切的话，改用 `overflow: clip`：一样裁，但不创建
  滚动容器。判断方法：读 `element.getAnimations()[0].timeline.currentTime`，
  滚动时它如果不变，就是绑错容器了。

### 4.4 Playwright 验证

- 旋转中的元素用 `elementHandle.click()` 会超时，改用
  `page.evaluate(() => btn.click())`。
- 派发事件后立刻读 React state 会读到旧值，包一层 `setTimeout`。
- 截图 `clip` 用的是 **CSS 像素**，和 `deviceScaleFactor` 无关，别混。

---

## 5. 动画的写法约定

### 滚动驱动（首选，跑在合成线程上，不占主线程）

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .beat-in { animation: beat-in linear both; animation-timeline: view();
               animation-range: entry 8% cover 34%; }
  }
}
```

**基线状态必须是"已显示"**，动画只做增强 —— 不支持的浏览器
（Safari 18 以下）不能因此丢内容。阅读进度条同理，用 `scroll(root block)`。

### 一次性事件用 IntersectionObserver

盖章、计数这类**瞬时事件**不要用 `animation-timeline: view()`：
那是随滚动来回擦洗的，往回滚会把章"抬起来"。
参考 `SignalBoard.tsx` 的 `useStampOnce()`：进视口触发一次后立刻 `disconnect`。

### 通用规则

- 只动 `transform` / `opacity`，别动 `width/height/top/left`。
- 每个动效都要有 `prefers-reduced-motion: reduce` 的退路。
- 自动播放的东西（轮播、自动翻页）必须：悬停暂停、**用户一操作就永久让位**、
  走到末尾停住不回卷。不要跟正在读的人抢方向盘。

---

## 6. 交付标准（做完了才算做完）

每一次改动都要：

1. `npm run build` 通过（包含 `prebuild` 的透明度检查）和 `npx tsc -b` 干净。
2. **用 Playwright 或浏览器实际截图看过**，不要只凭代码推断。至少：
   - 桌面 1440px
   - 手机 390px
   - 断言无横向溢出：`document.documentElement.scrollWidth === window.innerWidth`
3. 改了交互，要**程序化验证它真的生效**（读 DOM 状态 / 文本变化），
   不要只看静态截图。
4. commit message 用中文，说清**为什么这么改**，不只是改了什么。
   结尾加 `Co-Authored-By:` 行。
5. 只有用户要求时才 push。

---

## 7. 当前状态与未决事项

已完成的近期工作：IEEE Rising Stars 双奖展示（首页 `IEEEAwards` +
两个案例页）、showcase 页的 dreamcore 暗色改版、小樱牌牌阵与工具星盘、
AI Valley 案例页、全站导航统一。

未决：

- **Kind Notes**（`src/sections/KindNotes.tsx`）已填入六条真实评价
  （四位 CMU 老师 + 两位 People.ai 同事），做成可横滑的信封带。
  `NOTES` 为空时整块不渲染的保护逻辑保留 —— **永远不要用占位文字填充。**
- **志愿者证书**卡在 Canva 导出（她的账号没有 Pro，模板用了 Pro 素材），
  暂时无水印版导不出来。
- CMU **Integrated Innovation Institute 的标识**已从 `cmu.edu/iii` 取得
  （`public/logos/iii.png`）；若要再取其他机构标识，先问用户。

---

## 8. 怎么跟这位用户协作 → 见 `HANDOFF.private.md` §3

要点：动手前先给拟改清单等确认；她的截图可能来自旧版本，先跟线上比对；
「太密太小」时先删元素再放大字号；说"角度"就只改角度；回复用中文。
