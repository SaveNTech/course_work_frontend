import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Truck, BarChart3 } from 'lucide-react'

const navItems = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Панель управления' },
  { to: '/products',     icon: Package,         label: 'Товары'            },
  { to: '/sales',        icon: ShoppingCart,    label: 'Продажи'           },
  { to: '/distribution', icon: Truck,           label: 'Распределение'     },
  { to: '/reports',      icon: BarChart3,       label: 'Отчёты'            },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>DTL CRM</h1>
        <span>Продажи и распределение</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => isActive ? 'active' : undefined}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">v1.0.0 · 2025</div>
    </aside>
  )
}
