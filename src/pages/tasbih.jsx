import Tasbihku from "../components/tasbihku";
import PageTitle from "../components/PageTitle";

const Tasbih = () => {
    // Styles
    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f0fdf4',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem',
            width: '100%'
        },
        title: {
            color: '#065f46',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        },
        subtitle: {
            color: '#047857',
            fontSize: '1.25rem',
            marginBottom: '2rem'
        },
        decoration: {
            fontSize: '3rem',
            color: '#059669',
            marginBottom: '1rem'
        },
        content: {
            width: '100%',
            maxWidth: '600px',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
    };

    return (
        <div style={styles.container}>
            <PageTitle title="Tasbih Digital" />
            
            <div style={styles.header}>
                <div style={styles.decoration}>﷽</div>
                <h1 style={styles.title}>Tasbih Digital</h1>
                <p style={styles.subtitle}>Hitung dzikir dengan mudah</p>
            </div>

            <div style={styles.content}>
                <Tasbihku />
            </div>
        </div>
    );
};

export default Tasbih;