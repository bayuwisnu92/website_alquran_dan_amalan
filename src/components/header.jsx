


export default function Header({ judulnya, quran }){
    return(
        <div id="header">
            <h1 className='text-center container mt-5 judul'>{quran}</h1>
            <h2 className="post-title mb-4 text-center judul">{judulnya}</h2>
        </div>
    )
}