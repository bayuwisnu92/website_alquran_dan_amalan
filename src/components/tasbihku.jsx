import { useState, useEffect } from "react";

export default function Tasbihku() {
    const [count, setCount] = useState(() => {
        // Ambil nilai dari localStorage saat inisialisasi
        const savedCount = localStorage.getItem("count");
        return savedCount ? JSON.parse(savedCount) : 0;
    });

    useEffect(() => {
        // Simpan count ke localStorage setiap kali count berubah
        localStorage.setItem("count", JSON.stringify(count));
        
        if (count === 100 || count === 786 || count === 1000) {
            alert(`Anda telah mencapai ${count} hitungan!`);
        }
    }, [count]);

    return (
        <div className="tasbih-container">
            <div className="tasbih-display">
                <p className="count">{count}</p>
            </div>
            
            <div className="reset-button">
            <button className="reset" onClick={() => setCount(0)}>Reset</button>
            </div>
            
            <div className="tasbih-buttons">
                <button className="tasbihplus mt-2" onClick={() => setCount(count + 1)}>Tambah</button>
            </div>
        </div>
    );
}