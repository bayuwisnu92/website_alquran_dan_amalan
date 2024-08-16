import { Link } from 'react-router-dom';
export default  function Navbar() {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg navbar-light bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="#">القرآن الكريم</Link>
                <Link to="/" className="btn btn-primary btn-sm"><i className="bi bi-house-door-fill"></i></Link>
                
            </div>
        </nav>
    )
}

