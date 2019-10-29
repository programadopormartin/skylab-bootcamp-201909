function Header({onGoHome, onGoGenre, onGoWatchlist, onGoPersonalArea}){    
return <header id="top">
            <nav className="main-bar">
                <img className="main-bar__logo bar-icon" src="../film-fest-design/img/logo.png" alt="Logo" onClick={event=>{
                    event.preventDefault()
                    onGoHome()
                }}></img>
                <form className="main-bar__search search-bar" >
                    <input type="search" className="search-bar__search" name="search"></input>
                    <i className="search-bar__icon  bar-icon material-icons" alt="search icon">search</i>
                        
                </form>

                <i className="main-bar__login material-icons" alt="logIn icon" onClick={event=>{
                    event.preventDefault()
                    onGoPersonalArea()
                }}>account_circle</i>

                <p className="main-bar__home header-button" onClick={event=>{
                    event.preventDefault()
                    onGoHome()
                }}>HOME</p>

                <p className="main-bar__genre header-button" onClick={event=>{
                    event.preventDefault()
                    onGoGenre()
                }}>GENRE</p>

                <p className="main-bar__watch-list header-button" onClick={event=>{
                    event.preventDefault()
                    onGoWatchlist()
                }}>LISTS</p>

                <p className="main-bar__surprise-me header-button"  onClick={event=>{
                    event.preventDefault()
                    onGoHome()
                }}>RANDOM</p>
            </nav>
        </header>

} 
