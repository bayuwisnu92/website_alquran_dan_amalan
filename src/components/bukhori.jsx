import { useState, useEffect, useCallback } from "react";

export default function HadithComponent() {
    // State management
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredHadiths, setFilteredHadiths] = useState([]);
    const [selectedHadithType, setSelectedHadithType] = useState("bukhari");
    const [bookmark, setBookmark] = useState(() => {
        const saved = localStorage.getItem('hadithBookmarks');
        return saved ? JSON.parse(saved) : [];
    });
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Data configuration
    const ranges = [
        { start: 1, end: 100 },
        { start: 101, end: 200 },
        { start: 201, end: 300 },
        { start: 301, end: 400 },
        { start: 401, end: 500 },
        { start: 501, end: 600 },
        { start: 601, end: 700 },
        { start: 701, end: 756 }
    ];

    const hadithTypes = [
        { jenishadist: "bukhari", nama: "Shahih Bukhari" },
        { jenishadist: "muslim", nama: "Shahih Muslim" },
    ];

    // Styles
    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f0fdf4',
            paddingBottom: '3rem',
            position: 'relative'
        },
        header: {
            background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
            color: 'white',
            padding: '2rem 1rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        bismillah: {
            fontSize: '3rem',
            marginBottom: '0.5rem'
        },
        title: {
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        },
        subtitle: {
            color: '#d1fae5',
            fontSize: '1.1rem'
        },
        controlContainer: {
            maxWidth: '1200px',
            margin: '2rem auto',
            padding: '0 1rem'
        },
        controlBox: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        },
        select: {
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '1rem',
            marginBottom: '1rem'
        },
        searchInput: {
            width: '100%',
            padding: '12px 16px 12px 40px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '1rem',
            position: 'relative'
        },
        searchIcon: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#059669'
        },
        hadithCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            position: 'relative'
        },
        arabicText: {
            fontSize: '1.5rem',
            textAlign: 'right',
            lineHeight: '2.5rem',
            margin: '1.5rem 0',
            fontFamily: "'Traditional Arabic', 'Arial', sans-serif"
        },
        translationBox: {
            backgroundColor: '#f8fafc',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem'
        },
        paginationButton: {
            padding: '8px 16px',
            margin: '0 4px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#ecfdf5'
        },
        errorContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fef2f2'
        },
        scrollToBookmarkButton: {
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            backgroundColor: '#d97706',
            color: 'white',
            padding: '1rem',
            borderRadius: '50%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            transition: 'all 0.2s ease'
        },
        bookmarkIndicator: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '8px',
            height: '8px',
            backgroundColor: '#d97706',
            borderRadius: '50%'
        }
    };

    // Helper functions
    const getCacheKey = (type, start, end) => `hadith_${type}_${start}_${end}`;

    const fetchHadiths = useCallback(async () => {
        const { start, end } = ranges[currentPage - 1];
        const cacheKey = getCacheKey(selectedHadithType, start, end);
        setLoading(true);

        try {
            // Try to get data from cache
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                setData(parsedData);
                setFilteredHadiths(parsedData.hadiths);
                setLoading(false);
                return;
            }

            // If not in cache, fetch from API
            const response = await fetch(`https://api.hadith.gading.dev/books/${selectedHadithType}?range=${start}-${end}`);
            
            if (!response.ok) throw new Error('Failed to fetch hadith');
            
            const result = await response.json();
            
            // Save to cache
            localStorage.setItem(cacheKey, JSON.stringify(result.data));

            setData(result.data);
            setFilteredHadiths(result.data.hadiths);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, selectedHadithType]);

    useEffect(() => {
        fetchHadiths();
    }, [fetchHadiths]);

    useEffect(() => {
        if (data && data.hadiths) {
            const filtered = data.hadiths.filter(hadith => 
                hadith.number.toString().includes(searchTerm) ||
                hadith.arab.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hadith.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredHadiths(filtered);
        }
    }, [searchTerm, data]);

    // Scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleBookmark = (hadith) => {
        const bookmarkKey = `${selectedHadithType}-${hadith.number}`;
        setBookmark(prev => {
            const newBookmarks = prev.includes(bookmarkKey)
                ? prev.filter(item => item !== bookmarkKey)
                : [...prev, bookmarkKey];
            
            localStorage.setItem('hadithBookmarks', JSON.stringify(newBookmarks));
            return newBookmarks;
        });
    };

    const scrollToBookmarkedHadith = () => {
        // Find the first bookmarked hadith in the current page
        const bookmarkedHadith = filteredHadiths.find(hadith => 
            bookmark.includes(`${selectedHadithType}-${hadith.number}`)
        );

        if (bookmarkedHadith) {
            const element = document.getElementById(`hadith-${bookmarkedHadith.number}`);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    if (loading) return (
        <div style={styles.loadingContainer}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', color: '#065f46' }}>﷽</div>
                <h1 style={{ fontSize: '1.5rem', color: '#065f46', marginTop: '1rem' }}>Memuat Hadits...</h1>
            </div>
        </div>
    );

    if (error) return (
        <div style={styles.errorContainer}>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '12px' }}>
                <h1 style={{ fontSize: '1.5rem', color: '#b91c1c', marginBottom: '1rem' }}>Terjadi Kesalahan</h1>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{error.message}</p>
                <button 
                    onClick={fetchHadiths}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#065f46',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Coba Lagi
                </button>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.bismillah}>﷽</div>
                <h1 style={styles.title}>Kitab Hadits</h1>
                <p style={styles.subtitle}>
                    Shahih {hadithTypes.find(h => h.jenishadist === selectedHadithType).nama}
                </p>
            </div>

            {/* Controls */}
            <div style={styles.controlContainer}>
                <div style={styles.controlBox}>
                    <select 
                        value={selectedHadithType} 
                        onChange={(e) => setSelectedHadithType(e.target.value)}
                        style={styles.select}
                    >
                        {hadithTypes.map(type => (
                            <option key={type.jenishadist} value={type.jenishadist}>
                                {type.nama}
                            </option>
                        ))}
                    </select>
                    
                    <div style={{ position: 'relative' }}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#059669" 
                            strokeWidth="2" 
                            style={styles.searchIcon}
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari hadits berdasarkan nomor, teks arab, atau terjemahan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>
            </div>

            {/* Hadith List */}
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                {filteredHadiths.length === 0 ? (
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '2rem', 
                        borderRadius: '12px', 
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}>
                        <p style={{ color: '#6b7280' }}>Tidak ditemukan hadits yang sesuai dengan pencarian Anda</p>
                    </div>
                ) : (
                    filteredHadiths.map(hadith => {
                        const isBookmarked = bookmark.includes(`${selectedHadithType}-${hadith.number}`);
                        return (
                            <div 
                                key={hadith.number} 
                                id={`hadith-${hadith.number}`}
                                style={{
                                    ...styles.hadithCard,
                                    borderLeft: isBookmarked ? '4px solid #d97706' : 'none'
                                }}
                            >
                                {isBookmarked && <div style={styles.bookmarkIndicator}></div>}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1.25rem', color: '#065f46', fontWeight: '600' }}>
                                        Hadits No. {hadith.number}
                                    </h3>
                                    <button 
                                        onClick={() => toggleBookmark(hadith)}
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            cursor: 'pointer',
                                            color: isBookmarked ? '#d97706' : '#9ca3af'
                                        }}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="24" 
                                            height="24" 
                                            viewBox="0 0 24 24" 
                                            fill={isBookmarked ? "currentColor" : "none"} 
                                            stroke="currentColor" 
                                            strokeWidth="2"
                                        >
                                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                                        </svg>
                                    </button>
                                </div>
                                
                                <p style={styles.arabicText}>{hadith.arab}</p>
                                
                                <div style={styles.translationBox}>
                                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{hadith.id}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '2rem',
                flexWrap: 'wrap'
            }}>
                {ranges.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentPage(index + 1)}
                        disabled={currentPage === index + 1}
                        style={{
                            ...styles.paginationButton,
                            backgroundColor: currentPage === index + 1 ? '#065f46' : 'white',
                            color: currentPage === index + 1 ? 'white' : '#065f46',
                            border: currentPage === index + 1 ? 'none' : '1px solid #065f46'
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Scroll to Bookmark Button */}
            {showScrollButton && bookmark.length > 0 && (
                <button
                    onClick={scrollToBookmarkedHadith}
                    style={styles.scrollToBookmarkButton}
                    title="Scroll ke hadits yang ditandai"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                    >
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                    </svg>
                </button>
            )}
        </div>
    );
}