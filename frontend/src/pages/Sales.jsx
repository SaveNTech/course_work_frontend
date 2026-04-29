import { useState } from 'react'
import { Search } from 'lucide-react'
import { sales } from '../data/mockData'

const rub = v =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v)

function StatusBadge({ status }) {
  const cls = { 'Выполнен': 'success', 'В обработке': 'warning', 'Отменён': 'danger' }
  return <span className={`badge ${cls[status] ?? 'gray'}`}>{status}</span>
}

const STATUSES = ['Все статусы', 'Выполнен', 'В обработке', 'Отменён']

export default function Sales() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Все статусы')

  const filtered = sales.filter(s => {
    const q = search.toLowerCase()
    return (
      (s.customer.toLowerCase().includes(q) ||
       s.id.toLowerCase().includes(q) ||
       s.product.toLowerCase().includes(q)) &&
      (status === 'Все статусы' || s.status === status)
    )
  })

  const totalSum   = filtered.reduce((acc, s) => acc + s.total, 0)
  const completed  = filtered.filter(s => s.status === 'Выполнен').length
  const processing = filtered.filter(s => s.status === 'В обработке').length

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Учёт продаж</h1>
          <p className="page-subtitle">{sales.length} записей</p>
        </div>
      </div>

      <div className="summary-row">
        {[
          { label: 'Всего сделок',    value: filtered.length },
          { label: 'Выполнено',       value: completed       },
          { label: 'В обработке',     value: processing      },
        ].map(({ label, value }) => (
          <div key={label} className="stat-card" style={{ padding: '16px 20px' }}>
            <div className="stat-card-label" style={{ marginBottom: 6 }}>{label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="toolbar">
            <div className="search-input">
              <Search size={15} color="#94a3b8" />
              <input
                placeholder="Поиск по клиенту, номеру или товару…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            Итого: <strong style={{ color: '#1e293b' }}>{rub(totalSum)}</strong>
          </span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Дата</th>
                <th>Клиент</th>
                <th>Товар</th>
                <th style={{ textAlign: 'center' }}>Кол-во</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td><code style={{ fontSize: 12, color: '#64748b' }}>{s.id}</code></td>
                  <td className="text-muted">{new Date(s.date).toLocaleDateString('ru-RU')}</td>
                  <td className="product-name-cell">{s.customer}</td>
                  <td className="text-muted">{s.product}</td>
                  <td style={{ textAlign: 'center' }}>{s.qty}</td>
                  <td style={{ fontWeight: 500 }}>{rub(s.total)}</td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="no-data">Нет данных</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
