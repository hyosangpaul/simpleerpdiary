import React, { useState } from "react";

interface InventoryItem {
  id: number;
  productName: string;
  quantity: number;
  location: string;
}

const InventoryRegister: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, productName: "상품 1", quantity: 50, location: "창고 A" },
    { id: 2, productName: "상품 2", quantity: 30, location: "창고 B" },
    { id: 3, productName: "상품 3", quantity: 100, location: "창고 A" },
    { id: 4, productName: "상품 4", quantity: 75, location: "창고 C" },
    { id: 5, productName: "상품 5", quantity: 45, location: "창고 B" },
  ]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<InventoryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInventory, setNewInventory] = useState<Omit<InventoryItem, "id">>({
    productName: "",
    quantity: 0,
    location: "",
  });

  const handleSelectInventory = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((iid) => iid !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("삭제할 재고를 선택해주세요.");
      return;
    }
    setInventory((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSaveEdit = () => {
    if (editData) {
      setInventory((prev) =>
        prev.map((i) => (i.id === editingId ? editData : i)),
      );
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleAddInventory = () => {
    const id = Math.max(...inventory.map((i) => i.id), 0) + 1;
    setInventory((prev) => [...prev, { ...newInventory, id }]);
    setNewInventory({
      productName: "",
      quantity: 0,
      location: "",
    });
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  return (
    <div className="inventory-register">
      <div className="inventory-header">
        <h2>재고관리</h2>
        <div className="inventory-actions">
          {editingId !== null ? (
            <button
              className="btn btn-list"
              onClick={() => {
                setEditingId(null);
                setEditData(null);
                setShowAddForm(false);
                setSelectedIds([]);
              }}
            >
              목록
            </button>
          ) : (
            <>
              <button
                className="btn btn-add"
                onClick={() => setShowAddForm(true)}
              >
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
        <div className="inventory-form">
          <h3>새 재고 추가</h3>
          <div className="form-group">
            <label>상품명</label>
            <input
              type="text"
              value={newInventory.productName}
              onChange={(e) =>
                setNewInventory({
                  ...newInventory,
                  productName: e.target.value,
                })
              }
              placeholder="상품명을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label>수량</label>
            <input
              type="number"
              value={newInventory.quantity}
              onChange={(e) =>
                setNewInventory({
                  ...newInventory,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
              placeholder="수량"
            />
          </div>
          <div className="form-group">
            <label>위치</label>
            <input
              type="text"
              value={newInventory.location}
              onChange={(e) =>
                setNewInventory({ ...newInventory, location: e.target.value })
              }
              placeholder="창고 위치"
            />
          </div>
          <div className="form-buttons">
            <button className="btn btn-save" onClick={handleAddInventory}>
              저장
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => setShowAddForm(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {editingId !== null && editData && (
        <div className="inventory-form">
          <h3>재고 수정</h3>
          <div className="form-group">
            <label>상품명</label>
            <input
              type="text"
              value={editData.productName}
              onChange={(e) =>
                setEditData({ ...editData, productName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>수량</label>
            <input
              type="number"
              value={editData.quantity}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>위치</label>
            <input
              type="text"
              value={editData.location}
              onChange={(e) =>
                setEditData({ ...editData, location: e.target.value })
              }
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

      <table className="inventory-table">
        <thead>
          <tr>
            <th className="checkbox-col">
              <input
                type="checkbox"
                checked={
                  selectedIds.length === inventory.length &&
                  inventory.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(inventory.map((i) => i.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </th>
            <th>상품명</th>
            <th>수량</th>
            <th>위치</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr
              key={item.id}
              className={selectedIds.includes(item.id) ? "selected" : ""}
            >
              <td className="checkbox-col">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleSelectInventory(item.id)}
                />
              </td>
              <td
                className="inventory-name"
                onClick={() => handleEditClick(item)}
              >
                {item.productName}
              </td>
              <td>{item.quantity}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {inventory.length === 0 && (
        <div className="empty-message">
          등록된 재고가 없습니다. 추가 버튼을 클릭하여 재고를 추가하세요.
        </div>
      )}
    </div>
  );
};

export default InventoryRegister;
