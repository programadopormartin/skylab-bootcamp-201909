function Footer({onResetHash}) {

    return <footer className="bottom">
        <nav className="footer-nav">
            <div className="footer-nav__go-up go-up">
                <div className="go-up__button" onClick={event=>{
                    event.preventDefault()                    
                    onResetHash()                    
                }}></div>
            </div>
            <div className="footer-nav__social-media social-media">
                <a href="https://es-es.facebook.com/"><img className="social-media__icon" src="../film-fest-design/img/facebook.png" alt="facebook" ></img></a>
                <a href="https://twitter.com/?lang=es">  <img className="social-media__icon" src="../film-fest-design/img/twitter.png" alt="twitter"></img></a>
                <a href="https://www.youtube.com/?hl=es&gl=ES">  <img className="social-media__icon" src="../film-fest-design/img/youtube.png" alt="youtube"></img></a>
                <a href="https://www.instagram.com/?hl=es">  <img className="social-media__icon" src="../film-fest-design/img/instagram.png" alt="instagram"></img></a>
            </div>
            <div className="footer-nav copyright">
                <p> © Copyright 2019, FF Productions, Inc. o afiliados. </p>
            </div>
        </nav>
    </footer>

}