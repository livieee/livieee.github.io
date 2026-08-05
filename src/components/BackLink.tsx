import { Link, useLocation } from 'react-router'

/**
 * 案例页的返回入口。
 *
 * 案例页有两条来路：首页的 Selected Impact，和 /work 索引页。写死其中一条
 * 总有一半人被送错地方 —— 从首页进来的被丢进没见过的列表页、还丢了滚动位置；
 * 从 /work 进来的每看完一个就得重新滚到底找入口。
 *
 * 所以来路由卡片自己带上（`<Link state={{ from: 'home' | 'work' }}>`），
 * 这里读回来决定去哪。直接敲网址或从外部链接进来的没有 state，默认回首页的
 * 作品区 —— 首页是主入口，而且 #impact 能落到作品区而不是页面顶部。
 */
export function useBackTarget() {
  const from = (useLocation().state as { from?: string } | null)?.from
  return from === 'work'
    ? { to: '/work', label: 'All work' }
    : { to: '/#impact', label: 'Back to work' }
}

export function BackLink({ className = '' }: { className?: string }) {
  const { to, label } = useBackTarget()
  return (
    <Link
      to={to}
      className={`group/back inline-flex items-center gap-1.5 text-[13px] font-medium text-plum-muted transition-colors hover:text-plum ${className}`}
    >
      <span aria-hidden className="transition-transform duration-300 group-hover/back:-translate-x-0.5">
        ←
      </span>
      {label}
    </Link>
  )
}
