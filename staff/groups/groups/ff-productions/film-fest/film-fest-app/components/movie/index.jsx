function MovieSpecs({ changeIcon, movie }) {
    return <section className="specs">
        <div className="specs__image">
            <SpecsImage image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                clickable={false}
                alt="poster movie" />
        </div>

        <h2 className="specs__title">{movie.title}</h2>
        <div className="watchlist">

            <p className="watchlist__title">Add to Watchlist</p>

            <WatchList img className="watchlist__watch_icon" src="../film-fest-design/img/plus32px.png" id="watchlist"
                alt="add to Watchlist" onclick={event => {
                    event.preventDefault()
                    changeIcon()
                }} />

        </div>
        <p className="specs__description">{movie.overview}</p>
        <p className="specs__genre">Science fiction</p>
        <p className="specs__runtime"> 139minin </p>
        <p className="specs__rating__vote_average">{movie.vote_average}</p>
        <p className="desc">State your score</p>

        <div className="specs__rating rating">
            <div className="Stars" style="--rating: 5;" aria-label="Rating of this product is 5 out of 5.">
            </div>

        </div>

    </section>

}