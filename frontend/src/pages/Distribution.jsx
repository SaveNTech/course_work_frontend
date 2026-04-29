import { useState } from 'react'
import { Search, Truck } from 'lucide-react'
import { distribution } from '../data/mockData'

function StatusBadge({ status }) {
  const cls = { 'Доставлен': 'success', 'В пути': 'info', 'Ожидает отправки': 'warning' }
  return <span className={`badge ${cls[status] ?? 'gray'}`}>{status}</span>
}

const STATUSES  = ['Все статусы',   'Доставлен', 'В пути', 'Ожидает отправки']
const CARRIERS  = ['Все перевозчики', 'СДЭК', 'DPD', 'Почта России', 'Деловые Линии']

export default function Distribution() {
  const [search,  setSearch]  = useState('')
  const [status,  setStatus]  = useState('Все статусы')
  const [carrier, setCarrier] = useState('Все перевозчики')

  const filtered = distribution.filter(d => {
    const q = search.toLowerCase()
    return (
      (d.destination.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)) &&
      (status  === 'Все статусы'    || d.status  === status)  &&
      (carrier === 'Все перевозчики' || d.carrier === carrier)
    )
  })

  const counts = {
    'В пути':           distribution.filter(d => d.status === 'В пути').length,
    'Доставлен':        distribution.filter(d => d.status === 'Доставлен').length,
    'Ожидает отправки': distribution.filter(d => d.status === 'Ожидает отправки').length,
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Распределение товара</h1>
          <p className="page-subtitle">{distribution.length} поставок</p>
        </div>
      </div>

      <div className="summary-row">
        {[
          { label: 'В пути',            value: counts['В пути'],           cls: 'info'    },
          { label: 'Доставлено',        value: counts['Доставлен'],        cls: 'success' },
          { label: 'Ожидает отправки',  value: counts['Ожидает отправки'], cls: 'warning' },
        ].map(({ label, value, cls }) => (
          <div key={label} className="stat-card" style={{ padding: '16px 20px' }}>
            <div className="stat-card-label" style={{ marginBottom: 8 }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="stat-value" style={{ fontSize: 28 }}>{value}</div>
              <span className={`badge ${cls}`}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="toolbar">
            <div className="search-input">
              <Search size={15} color="#94a3b8" />
              <input
                placeholder="Поиск по адресу или номеру…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select className="filter-select" value={carrier} onChange={e => setCarrier(e.target.value)}>
              {CARRIERS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Дата</th>
                <th>Адрес доставки</th>
                <th style={{ textAlign: 'center' }}>Позиций</th>
                <th>Вес</th>
                <th>Перевозчик</th>
                <th>Ожид. дата</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td><code style={{ fontSize: 12, color: '#64748b' }}>{d.id}</code></td>
                  <td className="text-muted">{new Date(d.date).toLocaleDateString('ru-RU')}</td>
                  <td className="product-name-cell" style={{ maxWidth: 220 }}>{d.destination}</td>
                  <td style={{ textAlign: 'center' }}>{d.items}</td>
                  <td className="text-muted">{d.weight}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Truck size={13} color="#94a3b8" />
                      {d.carrier}
                    </span>
                  </td>
                  <td className="text-muted">{new Date(d.eta).toLocaleDateString('ru-RU')}</td>
                  <td><StatusBadge status={d.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="no-data">Нет данных</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
