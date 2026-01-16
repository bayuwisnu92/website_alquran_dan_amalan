import { useState } from "react";

export default function Form({ onAddItem }) {
  const daftar = [...Array(1000)].map((_, i) => i + 1);
  const [barang, setBarang] = useState("");
  const [list, setList] = useState(""); // Ubah inisialisasi ke string kosong
  const [mode, setMode] = useState('');
  const [sede, setSede] = useState('');
  const [tampil, setTampil] = useState(false);
  const [buttonbtn, setButtonbtn] = useState('#0D0D0D');
  

  function handleSubmit(e) {
    e.preventDefault();
    if (!barang) return;
    const newBarang = { barang, list, mode, sede, checked: false, id: Date.now() };
    console.log(newBarang);
    setBarang("");
    setList(""); // Ubah kembali ke string kosong
    setMode('');
    setSede('');
    onAddItem(newBarang);
  }

  function toggleTampil() {
    setTampil(!tampil);
    setButtonbtn(buttonbtn === '#0D0D0D' ? '#302F2F' : '#0D0D0D');
  }

  return (
    <>
      <div className={`btn btn- btn-sm mb-4`} onClick={toggleTampil} style={{ backgroundColor : `${buttonbtn}`, color: 'white' }}>{tampil ? '-':'+'}</div>
    
      {tampil && (
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="row mb-3 d-flex justify-content-center">
            <div className="col-md-3">
              <select className="form-select" value={list} onChange={(e) => setList(Number(e.target.value))}>
                <option value="">general</option>
                {daftar.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="">mode</option>
                <option value="rakaat">rakaat</option>
                <option value="ayat">ayat</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={sede} onChange={(e) => setSede(e.target.value)}>
                <option value="">rupiah</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                <option value="4000">4000</option>
              </select>
            </div>
          </div>
          <div className="row mb-3 d-flex justify-content-center">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="nama amalan..."
                value={barang}
                onChange={(e) => setBarang(e.target.value)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-9">
            <button className="btn btn-dark btm-sm badge-dark w-100"> 
              <i className="bi bi-plus-circle"></i> Tambah
            </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

