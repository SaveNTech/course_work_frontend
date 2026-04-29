import { useLocation } from 'react-router-dom'

const titles = {
  '/dashboard':    'Панель управления',
  '/products':     'Управление товарами',
  '/sales':        'Учёт продаж',
  '/distribution': 'Распределение товара',
  '/reports':      'Отчёты и аналитика',
}

export default function Header() {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? 'СистемаУчёта'
  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <header className="header">
      <span className="header-title">{title}</span>
      <div className="header-right">
        <span className="header-date">{today}</span>
        <div className="header-user">
          <div className="avatar">АИ</div>
          <span>Администратор</span>
        </div>
      </div>
    </header>
  )
}
