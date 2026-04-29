import { useState } from 'react'
import { Search, Plus, X } from 'lucide-react'
import { products as initialProducts } from '../data/mockData'

const rub = v =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v)

const STATUS_CLS = { 'В наличии': 'success', 'Мало': 'warning', 'Нет в наличии': 'danger' }

const CATEGORIES = ['Все категории', 'Электроника', 'Периферия', 'ПО', 'Оргтехника', 'Комплектующие']

const EMPTY_FORM = { name: '', category: 'Электроника', stock: '', price: '', sku: '' }

export default function Products() {
  const [products, setProducts] = useState(initialProducts)
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('Все категории')
  const [modal,    setModal]    = useState(false)
  const [form,     setForm]     = useState(EMPTY_FORM)

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    return (
      (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)) &&
      (category === 'Все категории' || p.category === category)
    )
  })

  function field(key) {
    return e => setForm(f => ({ ...f, [key]: e.target.value }))
  }

  function handleAdd(e) {
    e.preventDefault()
    const stock = parseInt(form.stock, 10)
    const status = stock === 0 ? 'Нет в наличии' : stock < 15 ? 'Мало' : 'В наличии'
    setProducts(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        category: form.category,
        stock,
        maxStock: stock || 1,
        price: parseFloat(form.price),
        status,
        sku: form.sku || `SKU-${Date.now()}`,
      },
    ])
    setModal(false)
    setForm(EMPTY_FORM)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Управление товарами</h1>
          <p className="page-subtitle">{products.length} позиций в каталоге</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          <Plus size={15} /> Добавить товар
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="toolbar">
            <div className="search-input">
              <Search size={15} color="#94a3b8" />
              <input
                placeholder="Поиск по названию или артикулу…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Артикул</th>
                <th>Название</th>
                <th>Категория</th>
                <th>Остаток</th>
                <th>Цена</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><code style={{ fontSize: 12, color: '#64748b' }}>{p.sku}</code></td>
                  <td className="product-name-cell">{p.name}</td>
                  <td className="text-muted">{p.category}</td>
                  <td>
                    <div className="stock-bar-wrap">
                      <span style={{ minWidth: 28, fontSize: 13 }}>{p.stock}</span>
                      <div className="stock-bar">
                        <div
                          className="stock-bar-fill"
                          style={{
                            width: `${Math.min(100, (p.stock / p.maxStock) * 100)}%`,
                            background: p.stock === 0 ? '#ef4444' : p.stock < 15 ? '#f59e0b' : '#22c55e',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{rub(p.price)}</td>
                  <td><span className={`badge ${STATUS_CLS[p.status] ?? 'gray'}`}>{p.status}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="no-data">Ничего не найдено</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">Добавить товар</span>
              <button className="modal-close" onClick={() => setModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Название товара *</label>
                  <input
                    className="form-control" required
                    placeholder="Введите название"
                    value={form.name} onChange={field('name')}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Категория *</label>
                    <select className="form-control" value={form.category} onChange={field('category')}>
                      {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Артикул</label>
                    <input
                      className="form-control" placeholder="SKU-XXXX"
                      value={form.sku} onChange={field('sku')}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Количество *</label>
                    <input
                      className="form-control" type="number" min="0" required
                      placeholder="0" value={form.stock} onChange={field('stock')}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Цена (₽) *</label>
                    <input
                      className="form-control" type="number" min="0" step="0.01" required
                      placeholder="0.00" value={form.price} onChange={field('price')}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setModal(false)}>Отмена</button>
                <button type="submit" className="btn btn-primary">Добавить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
