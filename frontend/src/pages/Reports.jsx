import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from 'recharts'
import { monthlySales, categoryData, sales } from '../data/mockData'

const rub = v =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v)

function topCustomers() {
  const map = {}
  sales.forEach(s => {
    if (!map[s.customer]) map[s.customer] = { name: s.customer, orders: 0, total: 0 }
    map[s.customer].orders += 1
    map[s.customer].total  += s.total
  })
  return Object.values(map).sort((a, b) => b.total - a.total).slice(0, 5)
}

export default function Reports() {
  const totalRevenue = monthlySales.reduce((s, m) => s + m.revenue, 0)
  const totalOrders  = monthlySales.reduce((s, m) => s + m.orders,  0)
  const avgCheck     = totalRevenue / totalOrders
  const completedPct = ((sales.filter(s => s.status === 'Выполнен').length / sales.length) * 100).toFixed(1)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Отчёты и аналитика</h1>
          <p className="page-subtitle">Май 2025 — Апр 2026</p>
        </div>
      </div>

      {/* KPI */}
      <div className="stat-grid">
        {[
          { label: 'Общая выручка',   value: rub(totalRevenue) },
          { label: 'Всего заказов',   value: totalOrders       },
          { label: 'Средний чек',     value: rub(avgCheck)     },
          { label: 'Выполнение',      value: `${completedPct}%`},
        ].map(({ label, value }) => (
          <div key={label} className="stat-card">
            <div className="stat-card-label" style={{ marginBottom: 8 }}>{label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Выручка по месяцам</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={monthlySales} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={v => `${(v / 1_000_000).toFixed(1)}М`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip formatter={v => rub(v)} labelStyle={{ fontWeight: 600 }} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="revenue" name="Выручка" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Динамика заказов</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={monthlySales}>
                <defs>
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip labelStyle={{ fontWeight: 600 }} />
                <Area
                  type="monotone" dataKey="orders" name="Заказов"
                  stroke="#8b5cf6" strokeWidth={2.5}
                  fill="url(#ordersGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Продажи по категориям</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Категория</th>
                  <th>Доля</th>
                  <th>Выручка (ориент.)</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map(c => (
                  <tr key={c.name}>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, display: 'inline-block', flexShrink: 0 }} />
                        {c.name}
                      </span>
                    </td>
                    <td>
                      <div className="stock-bar-wrap">
                        <span style={{ minWidth: 32, fontSize: 13 }}>{c.value}%</span>
                        <div className="stock-bar" style={{ maxWidth: 90 }}>
                          <div className="stock-bar-fill" style={{ width: `${c.value}%`, background: c.color }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{rub(totalRevenue * c.value / 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Топ клиентов</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Клиент</th>
                  <th style={{ textAlign: 'center' }}>Заказов</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers().map(c => (
                  <tr key={c.name}>
                    <td className="product-name-cell" style={{ fontSize: 13 }}>{c.name}</td>
                    <td style={{ textAlign: 'center' }}>{c.orders}</td>
                    <td style={{ fontWeight: 500 }}>{rub(c.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
