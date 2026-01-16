export default function List({ items, onToggleItem, onDeleteItem }) {
  function handleChecked(id) {
    onToggleItem(id);
  }

  return (
    <div className="list mt-4">
      <ul className="list-group">
        {items.map((item) => (
          <li 
            key={item.id} 
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: '#FAEAD4', // Warna kertas
              border: '1px solid #d4c4a8', // Garis tepi kertas
              marginBottom: '8px', // Jarak antar item
              borderRadius: '4px' // Sudut membulat
            }}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChecked(item.id)}
                id={`checkbox-${item.id}`}
                style={{
                  borderColor: '#a89878' // Warna border checkbox
                }}
              />
              <label
                className="form-check-label"
                htmlFor={`checkbox-${item.id}`}
                style={{ 
                  textDecoration: item.checked ? 'line-through' : 'none',
                  color: '#5c4b37' // Warna teks
                }}
              >
                {item.list} {item.sede} {item.mode} {item.barang}
              </label>
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDeleteItem(item.id)}
              style={{
                borderColor: '#a89878', // Warna border tombol
                color: '#8b4513' // Warna ikon
              }}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}