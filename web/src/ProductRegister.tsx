import React, { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  description: string
}

const ProductRegister: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '상품 1', price: 10000, description: '상품 설명 1' },
    { id: 2, name: '상품 2', price: 20000, description: '상품 설명 2' },
    { id: 3, name: '상품 3', price: 15000, description: '상품 설명 3' },
  ])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: ''
  })

  const handleSelectProduct = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    )
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert('삭제할 상품을 선택해주세요.')
      return
    }
    setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)))
    setSelectedIds([])
  }

  const handleEditClick = (product: Product) => {
    setEditingId(product.id)
    setEditData(product)
  }

  const handleSaveEdit = () => {
    if (editData) {
      setProducts(prev =>
        prev.map(p => (p.id === editingId ? editData : p))
      )
      setEditingId(null)
      setEditData(null)
    }
  }

  const handleAddProduct = () => {
    const id = Math.max(...products.map(p => p.id), 0) + 1
    setProducts(prev => [...prev, { ...newProduct, id }])
    setNewProduct({
      name: '',
      price: 0,
      description: ''
    })
    setShowAddForm(false)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditData(null)
  }

  return (
    <div className="product-register">
      <div className="product-header">
        <h2>상품등록</h2>
        <div className="product-actions">
          {editingId !== null ? (
            <button
              className="btn btn-list"
              onClick={() => {
                setEditingId(null)
                setEditData(null)
                setShowAddForm(false)
                setSelectedIds([])
              }}
            >
              목록
            </button>
          ) : (
            <>
              <button className="btn btn-add" onClick={() => setShowAddForm(true)}>
                ➕ 추가
              </button>
              <button 
                className="btn btn-delete" 
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
              >
                🗑️ 삭제
              </button>
            </>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="product-form">
          <h3>새 상품 추가</h3>
          <div className="form-group">
            <label>상품명</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="상품명을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label>가격</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: parseInt(e.target.value) || 0 })
              }
              placeholder="가격"
            />
          </div>
          <div className="form-group">
            <label>설명</label>
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="상품 설명"
              rows={3}
            />
          </div>
          <div className="form-buttons">
            <button className="btn btn-save" onClick={handleAddProduct}>
              저장
            </button>
            <button className="btn btn-cancel" onClick={() => setShowAddForm(false)}>
              취소
            </button>
          </div>
        </div>
      )}

      {editingId !== null && editData && (
        <div className="product-form">
          <h3>상품 수정</h3>
          <div className="form-group">
            <label>상품명</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>가격</label>
            <input
              type="number"
              value={editData.price}
              onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="form-group">
            <label>설명</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="form-buttons">
            <button className="btn btn-save" onClick={handleSaveEdit}>
              저장
            </button>
            <button className="btn btn-cancel" onClick={handleCancelEdit}>
              취소
            </button>
          </div>
        </div>
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th className="checkbox-col">
              <input
                type="checkbox"
                checked={selectedIds.length === products.length && products.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(products.map(p => p.id))
                  } else {
                    setSelectedIds([])
                  }
                }}
              />
            </th>
            <th>상품명</th>
            <th>가격</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className={selectedIds.includes(product.id) ? 'selected' : ''}>
              <td className="checkbox-col">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                />
              </td>
              <td
                className="product-name"
                onClick={() => handleEditClick(product)}
              >
                {product.name}
              </td>
              <td>{product.price.toLocaleString()}원</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="empty-message">
          등록된 상품이 없습니다. 추가 버튼을 클릭하여 상품을 추가하세요.
        </div>
      )}
    </div>
  )
}

export default ProductRegister
