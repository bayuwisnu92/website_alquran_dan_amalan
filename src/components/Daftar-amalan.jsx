import { useState, useEffect } from 'react';

export default function CatatanAmalan() {
    // Inisialisasi state amalanItems dengan data dari localStorage atau array kosong
    const [amalanItems, setAmalanItems] = useState(() => {
        const savedItems = localStorage.getItem('amalanItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    // State untuk input amalan baru
    const [newAmalanName, setNewAmalanName] = useState('');
    const [newAmalanTarget, setNewAmalanTarget] = useState(1000);

    // State untuk pengurutan
    const [sortBy, setSortBy] = useState('input');

    // State untuk jenis amalan
    const [amalanType, setAmalanType] = useState('umum');

    // Opsi untuk jenis amalan
    const amalanOptions = {
        umum: Array(1000).fill().map((_, i) => i + 1),
        sholat: [2, 3, 4],
        sedekah: [1000, 2000, 5000, 10000, 20000, 50000, 100000],
        quran: [1, 5, 10, 25, 50, 100]
    };

    // Tambahkan fungsi untuk mendapatkan unit yang sesuai
    function getUnitLabel(type) {
        switch (type) {
            case 'sholat':
                return 'rakaat';
            case 'sedekah':
                return 'Rupiah';
            case 'quran':
                return 'ayat';
            default:
                return 'kali';
        }
    }

    // Efek untuk menyimpan amalanItems ke localStorage setiap kali berubah
    useEffect(() => {
        localStorage.setItem('amalanItems', JSON.stringify(amalanItems));
    }, [amalanItems]);

    // Fungsi untuk menambahkan amalan baru
    function handleAddAmalan(e) {
        e.preventDefault();
        if (!newAmalanName) return;

        const newAmalan = {
            id: Date.now(),
            name: newAmalanName,
            target: amalanType === 'sedekah' ? parseInt(newAmalanTarget, 10) : newAmalanTarget,
            type: amalanType,
            completed: false,
        };

        setAmalanItems([...amalanItems, newAmalan]);
        setNewAmalanName('');
        setNewAmalanTarget(amalanType === 'sedekah' ? 1000 : 1);
    }

    // Fungsi untuk menghapus amalan
    function handleDeleteAmalan(id) {
        setAmalanItems(amalanItems.filter(item => item.id !== id));
    }

    // Fungsi untuk menandai amalan sebagai sudah dilakukan atau belum
    function handleToggleAmalan(id) {
        setAmalanItems(amalanItems.map(item => 
            item.id === id ? {...item, completed: !item.completed} : item
        ));
    }

    // Fungsi untuk menghapus semua amalan
    function handleClearList() {
        const confirm = window.confirm('Apakah Anda yakin ingin menghapus semua amalan?');
        if (confirm) setAmalanItems([]);
    }

    // Mengurutkan amalan berdasarkan kriteria yang dipilih
    const sortedAmalans = [...amalanItems].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'completed') {
            return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
        }
        return 0;
    });

    // Menghitung total amalan dan amalan yang sudah dilakukan
    const totalAmalans = amalanItems.length;
    const completedAmalans = amalanItems.filter(item => item.completed).length;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-light">Catatan Amalan Harianku 🕌</h1>
            
            {/* Form untuk menambahkan amalan baru */}
            <form className="mb-4" onSubmit={handleAddAmalan}>
                <h3 className="mb-3 text-light">Amalan apa yang ingin Anda lakukan hari ini?</h3>
                <div className="input-group mb-3">
                    <select 
                        className="form-select"
                        value={amalanType}
                        onChange={(e) => setAmalanType(e.target.value)}
                    >
                        <option value="umum">Umum (kali)</option>
                        <option value="sholat">Sholat (rakaat)</option>
                        <option value="sedekah">Sedekah (Rupiah)</option>
                        <option value="quran">Baca Al-Quran (ayat)</option>
                    </select>
                    <select 
                        className="form-select"
                        value={newAmalanTarget} 
                        onChange={(e) => setNewAmalanTarget(Number(e.target.value))}
                    >
                        {amalanOptions[amalanType].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="nama amalan..." 
                        value={newAmalanName}
                        onChange={(e) => setNewAmalanName(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">Tambah</button>
                </div>
            </form>

            {/* Daftar amalan harian */}
            <div className="card note-card mb-4">
                <ul className="list-group list-group-flush">
                    {sortedAmalans.map((amalan) => (
                    <li key={amalan.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input 
                                className="form-check-input"
                                type="checkbox" 
                                checked={amalan.completed}
                                onChange={() => handleToggleAmalan(amalan.id)}
                            />
                            <label className="form-check-label" style={{ 
                                textDecoration: amalan.completed ? 'line-through' : 'none',
                                color: 'black' // Tambahkan ini untuk mengubah warna teks menjadi hitam
                            }}>
                                {amalan.type === 'sedekah' 
                                    ? `${amalan.target.toLocaleString()} ${getUnitLabel(amalan.type)} ${amalan.name}`
                                    : `${amalan.target} ${getUnitLabel(amalan.type)} ${amalan.name}`
                                }
                            </label>
                        </div>
                        <button className="btn btn-danger btn-sm badge hapus" onClick={() => handleDeleteAmalan(amalan.id)}><i className="bi bi-trash3"></i></button>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Kontrol untuk pengurutan dan pembersihan daftar */}
            <div className="d-flex justify-content-between mb-4">
                <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Urutkan berdasarkan urutan input</option>
                    <option value="name">Urutkan berdasarkan nama amalan</option>
                    <option value="completed">Urutkan berdasarkan status selesai</option>
                </select>
                <button className="btn btn-warning" onClick={handleClearList}>Bersihkan Daftar</button>
            </div>

            {/* Footer dengan statistik */}
            <footer className="text-center text-muted">
                Ada {totalAmalans} amalan di daftar, {completedAmalans} amalan sudah dilakukan ({totalAmalans > 0 ? (completedAmalans / totalAmalans * 100).toFixed(0) : 0}%)
            </footer>
        </div>
    );
}