import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StripTagHtml from "./strptaghtml";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://api.npoint.io/99c279bb173a6e28359c/data",{
        headers: {
            "Content-Type": "application/json",
            
        },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

 

  

  

  if (loading) return <h1 className="container text-center text-primary">Loading bro...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Daftar Surat</h3>
      <div className="list-group">
        {posts.map((post) => (
          <Link 
            key={post.nomor} 
            to={`/detail/${post.nomor}`} 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-4 shadow-sm rounded"
          >
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="bg-primary text-white rounded-circle p-3" style={{width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  {post.nomor}
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1 text-center">{post.asma}<br></br>{post.nama}</h5>
                <p>jumlah ayat: {post.ayat}</p>
                <small><StripTagHtml html={post.keterangan} /></small>
              </div>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
}