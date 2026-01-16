import { Link } from 'react-router-dom';
import iconsquran from '../assets/iconsquran.png';
import navbaricons from '../assets/navbaricons.png';
import tasbih from '../assets/tasbih.png';
import hadits from '../assets/hadits.png';
import catatan from '../assets/catatan.png';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="floating-nav">
            <button onClick={toggleMenu} className="floating-button">
                <img 
                    src={navbaricons} 
                    alt="Logo" 
                    width="30" 
                    height="30" 
                    className="d-inline-block align-top" 
                /> 
            </button>
            {isMenuOpen && (
                <div className="floating-menu">
                    <Link className='navbol' to="/" onClick={toggleMenu}><img src={iconsquran} alt="Quran" width="30" height="30" /></Link>&nbsp;
                    <Link className='navbol' to="/tasbih" onClick={toggleMenu}><img src={tasbih} alt="Tasbih" width="30" height="30" /></Link>&nbsp;
                    <Link className='navbol' to="/hrbukhori" onClick={toggleMenu}><img src={hadits} alt="Quran" width="30" height="30" /></Link>&nbsp;
                    <Link className='navbol' to="/amalan" onClick={toggleMenu}><img src={catatan} alt="Catatan" width="30" height="30" /></Link>&nbsp;
                    <Link className='navbolbout' to="/about" onClick={toggleMenu}><i className="bi bi-person-circle"></i></Link>
                </div>
            )}
        </nav>
    );
}