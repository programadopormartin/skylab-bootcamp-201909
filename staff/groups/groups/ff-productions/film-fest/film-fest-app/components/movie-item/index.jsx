function MovieItem({ item }) {
    return <li className="results__item movie">
        <img className="movie__image" src={"https://image.tmdb.org/t/p/original"+item.poster_path} />
        <h2 className="movie__title">{item.title}</h2>
    </li>
}