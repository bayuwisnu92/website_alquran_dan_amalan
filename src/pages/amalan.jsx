import { useState, useEffect } from "react";
import Header from "../components/amalan/Header";
import Form from "../components/amalan/Form";
import List from "../components/amalan/List";
import Action from "../components/amalan/Action";
import PageTitle from "../components/PageTitle";


const Amalan = () => {
  const [items, setItems] = useState(() => {
    // Mengambil data dari localStorage saat inisialisasi
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Menyimpan items ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleToggleItem = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  function handleDeleteItem(id) {
    setItems(items.filter(item => item.id !== id));
  }

  function handleClearList() {
    setItems([]);
  }

  const handleSortItems = (sortBy) => {
    let sortedItems;
    if (sortBy === 'name') {
      sortedItems = [...items].sort((a, b) => a.barang.localeCompare(b.barang));
    } else if (sortBy === 'checked') {
      sortedItems = [...items].sort((a, b) => a.checked - b.checked);
    } else {
      sortedItems = [...items];
    }
    setItems(sortedItems);
  };

  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.checked).length;

  return (
    <>
    <PageTitle title="Amalan" />
    <div className="container mt-5 ">
      
      <div className="card amal">
        <div className="card-header">
          <Header />
        </div>
        <div className="card-body">
          <Form onAddItem={handleAddItem} />
          <List items={items} onToggleItem={handleToggleItem} onDeleteItem={handleDeleteItem} />
        </div>
        <div className="card-footer">
          <Action
            onClearList={handleClearList}
            onSortItems={handleSortItems}
            totalItems={totalItems}
            purchasedItems={purchasedItems}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Amalan;
