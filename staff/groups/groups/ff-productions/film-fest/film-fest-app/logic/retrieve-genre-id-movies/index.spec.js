describe('retrieve-genre-by-id', () => {

    /* it ('should retrieve genre related movies on provided id', ()=>{
        let genreID = 28
        
    }) */

    fit('should succeed on correct credentials', done => {
        genreID = 28

        retrieveGenreIdMovies(genreID, (error, result) => {
            console.log(error)
            console.log(result.results)
            expect(error).toBeUndefined()
            expect(result).toBeDefined()
            expect(result.results instanceof Array).toBeTruthy()
            expect(result.results.lenght == 20).toBeTruthy()
            done()
        })
    })




    /*  it ('should retrieve genre related movies on provided id', ()=>{

    })

 */










})