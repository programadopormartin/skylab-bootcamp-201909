function Search({onSearch,error, results, on}){

    return  <section className="search" >
                <nav className="search__nav nav">
                    <form className="myForm" onSubmit = {event=>{
                        event.preventDefault()
                        debugger
                        const query = event.target.query.value
                        debugger
                        onSearch(query)

                    }}>
                        <input className="myForm__search" type="search" name="query" placeholder="Are you looking for a special Duck?"/> 
                        <button> <i className="fas fa-search myForm__button" id="searchButton" aria-hidden="true"></i></button>
                    </form>
                </nav>
                <main className="search__main main">
                    {results && onResultsRender(results)}
                </main>

                {error && <Feedback message={error} />} 

            </section>

}