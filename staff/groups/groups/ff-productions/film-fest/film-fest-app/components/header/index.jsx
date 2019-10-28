function Header({}){    
return <header id="top">
            <nav className="main-bar">
                <img className="main-bar__logo bar-icon" src="../film-fest-design/img/logo.png" alt="Logo"></img>
                <form className="main-bar__search search-bar" >
                    <input type="search" className="search-bar__search" name="search"></input>
                    <i className="search-bar__icon  bar-icon material-icons" alt="search icon">search</i>
                        
                </form>

                <i className="main-bar__login material-icons" alt="logIn icon">account_circle</i>

                <p className="main-bar__home header-button">HOME</p>

                <p className="main-bar__genre header-button">GENRE</p>

                <p className="main-bar__watch-list header-button">LISTS</p>

                <p className="main-bar__surprise-me header-button">RANDOM</p>
            </nav>
        </header>

} 
