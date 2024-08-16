import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StripTagHtml from '../components/strptaghtml';

export default function Detail() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.npoint.io/99c279bb173a6e28359c/surat/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) return <p>Memuat...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (data.length === 0) return <p>Data tidak ditemukan</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Detail Surat</h2>
            <ul className="list-group">
                {data.map((item, index) => (
                    <li key={item.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto w-100">
                                <span className="fw-bold me-2 nomor">{index + 1}.</span>
                                <span 
                                    className='fw-bold mb-4 text-end' 
                                    style={{
                                        display: 'block', 
                                        direction: 'rtl', 
                                        textAlign: 'right',
                                        fontSize: '24px'
                                    }}
                                >
                                    {item.ar}
                                </span>
                                <div className="text-grey mt-2 arti text-end" style={{fontSize: '10px'}}>{item.id}</div>
                                <div className='text-end arti'><StripTagHtml html={item.tr} /></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}