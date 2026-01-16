import PageTitle from '../components/PageTitle';
import Navbar from '../components/navbar';

export default function About() {
    return (
        <>
            <Navbar />
            <PageTitle title="About" />
            <section className="about-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="about-content text-center">
                                <h1 className="about-title">Tentang Aplikasi Al-Qur'an</h1>
                                <p className="about-text">
                                    Selamat datang di aplikasi web Al-Qur'an, sebuah platform yang dirancang untuk memberikan kemudahan dalam mengakses dan membaca Al-Qur'an secara digital. Aplikasi ini dibuat dengan tujuan untuk membantu umat Islam dalam memahami dan mendalami ajaran Al-Qur'an, kapan saja dan di mana saja.
                                </p>
                                <p className="about-text">
                                    Fitur utama dari aplikasi ini meliputi:
                                </p>
                                <ul className="about-list text-left">
                                    <li>Membaca Al-Qur'an dengan teks yang jelas dan mudah dibaca.</li>
                                    <li>Pencarian surat dan ayat untuk memudahkan navigasi.</li>
                                    <li>Penandaan ayat favorit untuk memudahkan referensi.</li>
                                    <li>Pilihan terjemahan dalam berbagai bahasa.</li>
                                    <li>Tampilan yang responsif dan user-friendly.</li>
                                </ul>
                                <p className="about-text">
                                    Kami berharap aplikasi ini dapat menjadi alat yang bermanfaat bagi Anda dalam memperdalam pemahaman terhadap Al-Qur'an. Semoga Allah SWT memberikan berkah dan hidayah kepada kita semua.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
