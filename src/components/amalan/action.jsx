import { useState } from 'react';

export default function Action({ onClearList, onSortItems, totalItems, purchasedItems }) {
  const [sortBy, setSortBy] = useState('input');

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    onSortItems(sortValue);
  };

  return (
    <div className="container mt-3">
      <div className="row mb-3">
        <div className="col-md-7 mb-3">
          <select className="form-select" value={sortBy} onChange={handleSortChange}>
            <option value="input">Urutkan berdasarkan urutan input</option>
            <option value="name">Urutkan berdasarkan nama barang</option>
            <option value="checked">Urutkan berdasarkan ceklis</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-danger btn-sm badge" onClick={onClearList}>Bersihkan </button>
        </div>
      </div>
      <footer className="text-center text-muted">
        Ada {totalItems} barang di daftar belanjaan, {purchasedItems} barang sudah dibeli ({Math.round((purchasedItems / totalItems) * 100) || 0}%)
      </footer>
    </div>
  );
}