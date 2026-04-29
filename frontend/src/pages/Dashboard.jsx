import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { TrendingUp, Package, ShoppingCart, Truck } from 'lucide-react'
import { monthlySales, categoryData, sales } from '../data/mockData'

const rub = v =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v)

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
      <p style={{ fontWeight: 600, marginBottom: 4, fontSize: 13 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color, fontSize: 13 }}>
          {rub(p.value)}
        </p>
      ))}
    </div>
  )
}

function StatusBadge({ status }) {
  const cls = { 'Выполнен': 'success', 'В обработке': 'warning', 'Отменён': 'danger' }
  return <span className={`badge ${cls[status] ?? 'gray'}`}>{status}</span>
}

export default function Dashboard() {
  const cur  = monthlySales[monthlySales.length - 1]
  const prev = monthlySales[monthlySales.length - 2]
  const revenueGrowth = (((cur.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1)
  const ordersGrowth  = (((cur.orders  - prev.orders)  / prev.orders)  * 100).toFixed(1)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Панель управления</h1>
          <p className="page-subtitle">Сводная информация о продажах и распределении</p>
        </div>
      </div>

      {/* KPI */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Выручка за месяц</span>
            <div className="stat-icon blue"><TrendingUp size={18} /></div>
          </div>
          <div className="stat-value">{rub(cur.revenue)}</div>
          <div className="stat-change up">
            <TrendingUp size={13} />
            +{revenueGrowth}%&nbsp;<span className="stat-change-label">к прошлому месяцу</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Заказов за месяц</span>
            <div className="stat-icon green"><ShoppingCart size={18} /></div>
          </div>
          <div className="stat-value">{cur.orders}</div>
          <div className="stat-change up">
            <TrendingUp size={13} />
            +{ordersGrowth}%&nbsp;<span className="stat-change-label">к прошлому месяцу</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Товаров на складе</span>
            <div className="stat-icon orange"><Package size={18} /></div>
          </div>
          <div className="stat-value">1&nbsp;284</div>
          <div className="stat-change">
            <span className="stat-change-label">по 12 позициям</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Активных поставок</span>
            <div className="stat-icon purple"><Truck size={18} /></div>
          </div>
          <div className="stat-value">7</div>
          <div className="stat-change">
            <span className="stat-change-label">в 7 городах</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Динамика выручки</span>
            <span className="text-muted">Май 2024 — Апр 2025</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={v => `${(v / 1_000_000).toFixed(1)}М`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone" dataKey="revenue" name="Выручка"
                  stroke="#3b82f6" strokeWidth={2.5} dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">По категориям</span>
            <span className="text-muted">Доля продаж</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={categoryData} cx="50%" cy="42%"
                  innerRadius={52} outerRadius={80}
                  paddingAngle={3} dataKey="value"
                >
                  {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Legend formatter={v => <span style={{ fontSize: 12, color: '#475569' }}>{v}</span>} />
                <Tooltip formatter={v => [`${v}%`, 'Доля']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent sales */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Последние продажи</span>
          <a href="/sales" style={{ fontSize: 13, color: '#3b82f6', textDecoration: 'none' }}>
            Все продажи →
          </a>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Дата</th>
                <th>Клиент</th>
                <th>Товар</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice(0, 5).map(s => (
                <tr key={s.id}>
                  <td><code style={{ fontSize: 12, color: '#64748b' }}>{s.id}</code></td>
                  <td className="text-muted">{new Date(s.date).toLocaleDateString('ru-RU')}</td>
                  <td className="product-name-cell">{s.customer}</td>
                  <td className="text-muted">{s.product}</td>
                  <td style={{ fontWeight: 500 }}>{rub(s.total)}</td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
