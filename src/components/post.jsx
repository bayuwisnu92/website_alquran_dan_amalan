import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post() {
  // State management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Initialize readSurah from localStorage (single value)
  const [readSurah, setReadSurah] = useState(() => {
    const storedReadSurah = localStorage.getItem('readSurah');
    return storedReadSurah ? JSON.parse(storedReadSurah) : null;
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('postsData');
        
        if (storedData) {
          setPosts(JSON.parse(storedData));
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://api.npoint.io/99c279bb173a6e28359c/data",
          { headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setPosts(data);
        localStorage.setItem('postsData', JSON.stringify(data));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Scroll event listener
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle read status of surah (single selection)
  const toggleReadStatus = (nomor) => {
    setReadSurah(prev => {
      const newReadSurah = prev === nomor ? null : nomor;
      localStorage.setItem('readSurah', JSON.stringify(newReadSurah));
      return newReadSurah;
    });
  };

  // Scroll to currently marked surah
  const scrollToMarkedSurah = () => {
    if (readSurah) {
      const element = document.getElementById(`surah-${readSurah}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      post.nama.toLowerCase().includes(searchTermLower) ||
      post.nomor.toString().includes(searchTerm) ||
      post.type.toLowerCase().includes(searchTermLower)
    );
  });

  // Loading and error states
  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9f0 0%, #e6f5e6 100%)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '3rem',
          color: '#047857',
          marginBottom: '1rem',
          fontFamily: 'Arial, sans-serif'
        }}>﷽</div>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#065f46'
        }}>جاري التحميل يا أصدقاء...</h1>
      </div>
    </div>
  );

  if (error) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#fff5f5'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#b91c1c'
      }}>Error: {error.message}</h1>
    </div>
  );

  // Main component render
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      paddingBottom: '4rem'
    }}>
      {/* Header with Quran Cover Design */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
        color: 'white',
        padding: '2rem 1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          opacity: 0.3
        }}></div>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>﷽</div>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>Al-Qur'an Al-Kareem</h2>
          <p style={{
            color: '#d1fae5',
            fontSize: '1.125rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>Bacalah dengan menyebut nama Tuhanmu</p>
        </div>
      </div>

      {/* Search Input */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem'
      }}>
        <div style={{
          maxWidth: '42rem',
          margin: '0 auto',
          position: 'relative'
        }}>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '9999px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              border: 'none',
              outline: 'none',
              fontSize: '1.125rem',
              transition: 'all 0.3s ease',
              paddingRight: '3rem'
            }}
            placeholder="Cari surat (nama, nomor, atau tipe)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#059669'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Surah Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredPosts.map(post => (
          <div 
            key={post.nomor} 
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              border: readSurah === post.nomor ? '2px solid #059669' : 'none'
            }}
            id={`surah-${post.nomor}`}
          >
            <Link
              to={`/detail/${post.nomor}`}
              state={{ 
                nama: post.asma, 
                arti: post.arti, 
                latin: post.nama, 
                ket: post.keterangan 
              }}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{
                    backgroundColor: '#059669',
                    color: 'white',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginRight: '1rem',
                    flexShrink: 0
                  }}>
                    {post.nomor}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '0.25rem'
                    }}>{post.asma}</h3>
                    <p style={{
                      color: '#059669',
                      fontWeight: '500'
                    }}>({post.nama})</p>
                  </div>
                </div>
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    backgroundColor: post.type === 'makkiyah' ? '#fef3c7' : '#dbeafe',
                    color: post.type === 'makkiyah' ? '#92400e' : '#1e40af'
                  }}>
                    {post.type}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{post.ayat} ayat</span>
                </div>
              </div>
            </Link>
            
            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleReadStatus(post.nomor);
                }}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  ...(readSurah === post.nomor 
                    ? { backgroundColor: '#059669', color: 'white' }
                    : { backgroundColor: '#f3f4f6', color: '#374151' })
                }}
              >
                {readSurah === post.nomor ? '✓ Sedang Dibaca' : 'Tandai Sedang Dibaca'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Marked Surah Button */}
      {showScrollButton && (
        <button
          onClick={scrollToMarkedSurah}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            backgroundColor: '#059669',
            color: 'white',
            padding: '1rem',
            borderRadius: '50%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            transition: 'all 0.2s ease'
          }}
          disabled={!readSurah}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#065f46',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} Al-Qur'an Digital. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}