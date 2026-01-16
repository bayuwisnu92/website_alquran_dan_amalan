import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import StripTagHtml from '../components/strptaghtml';
import PageTitle from '../components/PageTitle';

export default function DetailSurat() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const location = useLocation();
    const nama = location.state?.nama;
    const arti = location.state?.arti;
    const latin = location.state?.latin;
    const ket = location.state?.ket;
    const [searchNumber, setSearchNumber] = useState('');
    const ayatRefs = useRef({});
    const [expandedPosts, setExpandedPosts] = useState({});
    const [lastReadAyat, setLastReadAyat] = useState(localStorage.getItem(`lastRead_${id}`) || '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = localStorage.getItem(`suratData_${id}`);
                if (cachedData) {
                    setData(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }

                const response = await fetch(`https://api.npoint.io/99c279bb173a6e28359c/surat/${id}`);
                const result = await response.json();
                setData(result);
                localStorage.setItem(`suratData_${id}`, JSON.stringify(result));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const toggleShowMore = (postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const ayatElement = ayatRefs.current[searchNumber];
        if (ayatElement) {
            ayatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Nomor ayat tidak ditemukan');
        }
    };

    const markAsLastRead = (ayatNumber) => {
        setLastReadAyat(ayatNumber);
        localStorage.setItem(`lastRead_${id}`, ayatNumber);
    };

    const scrollToLastRead = () => {
        const lastReadElement = ayatRefs.current[lastReadAyat];
        if (lastReadElement) {
            lastReadElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    if (loading) return (
        <div className="text-center mt-5 py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Memuat Surah...</p>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mt-5 mx-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Gagal memuat data: {error.message}
        </div>
    );

    if (data.length === 0) return (
        <div className="alert alert-info mt-5 mx-3" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            Data surah tidak ditemukan
        </div>
    );

    return (
        <div className="mushaf-container">
            {/* Mushaf-style background */}
            <div className="mushaf-paper-effect">
                <div className="container py-4">
                    <PageTitle title={`${latin} - ${nama}`} />
                    
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-xl-8">
                            {/* Surah Header */}
                            <div className="text-center mb-5">
                                <h1 className="surah-title arabic-title mb-2">{nama}</h1>
                                <h2 className="surah-latin mb-3">{latin}</h2>
                                <p className="surah-translation text-muted">{arti}</p>
                                
                                <div className="surah-meta d-flex justify-content-center gap-3 mt-3">
                                    <span className="badge bg-gold">Surah ke-{id}</span>
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => toggleShowMore('detail')}
                                    >
                                        <i className={`bi ${expandedPosts['detail'] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                        {expandedPosts['detail'] ? 'Sembunyikan' : 'Detail Surah'}
                                    </button>
                                </div>

                                {expandedPosts['detail'] && (
                                    <div className="surah-description mt-3 px-4 py-3">
                                        <StripTagHtml html={ket} />
                                    </div>
                                )}
                            </div>

                            {/* Search and Navigation */}
                            <div className="mushaf-controls d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                                <form onSubmit={handleSearch} className="search-form flex-grow-1">
                                    <div className="input-group">
                                        <span className="input-group-text bg-light">
                                            <i className="bi bi-search"></i>
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Cari nomor ayat..."
                                            min="1"
                                            value={searchNumber}
                                            onChange={(e) => setSearchNumber(e.target.value)}
                                        />
                                        <button className="btn btn-primary" type="submit">
                                            Cari
                                        </button>
                                    </div>
                                </form>

                                {lastReadAyat && (
                                    <button 
                                        className="btn btn-success last-read-btn"
                                        onClick={scrollToLastRead}
                                    >
                                        <i className="bi bi-bookmark-check"></i> Ayat {lastReadAyat}
                                    </button>
                                )}
                            </div>

                            {/* Ayat List */}
                            <div className="mushaf-content">
                                {data.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className={`ayat-item ${lastReadAyat === item.nomor ? 'last-read' : ''}`}
                                        ref={el => ayatRefs.current[item.nomor] = el}
                                    >
                                        <div className="ayat-header">
                                            <div className="ayat-number">
                                                <span className="number-circle">{item.nomor}</span>
                                            </div>
                                            <button 
                                                className="mark-read-btn"
                                                onClick={() => markAsLastRead(item.nomor)}
                                                title="Tandai terakhir dibaca"
                                            >
                                                {lastReadAyat === item.nomor ? (
                                                    <i className="bi bi-bookmark-check-fill text-primary"></i>
                                                ) : (
                                                    <i className="bi bi-bookmark"></i>
                                                )}
                                            </button>
                                        </div>

                                        <div className="ayat-text arabic-text">
                                            {item.ar}
                                        </div>

                                        <div className="ayat-translation">
                                            <div className="translation-text">
                                                <StripTagHtml html={item.tr} />
                                            </div>
                                            <div className="translation-meta">
                                                <small className="text-muted">{item.id}</small>
                                            </div>
                                        </div>

                                        <div className="ayat-separator">
                                            <span className="separator-icon">۝</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}