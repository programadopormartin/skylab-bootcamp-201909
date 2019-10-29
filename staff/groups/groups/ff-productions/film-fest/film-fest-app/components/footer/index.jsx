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
                <img className="social-media__icon" src="../film-fest-design/img/facebook.png" alt="facebook"></img>
                <img className="social-media__icon" src="../film-fest-design/img/instagram.png" alt="instagram"></img>
                <img className="social-media__icon" src="../film-fest-design/img/twitter.png" alt="twitter"></img>
                <img className="social-media__icon" src="../film-fest-design/img/youtube.png" alt="youtube"></img>
            </div>
            <div className="footer-nav copyright">
                <p> © Copyright 2019, FF Productions, Inc. o afiliados. </p>
            </div>
        </nav>
    </footer>

}