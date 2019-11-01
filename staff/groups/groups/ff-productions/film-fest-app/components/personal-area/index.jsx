function PersonalArea({ onPersonalArea, onSave, onSignOut, user }) {
    return <section className="view personal-area">
        <form onSubmit={event => {
            event.preventDefault()/* 
            const { name: { value: name }, surname: {
                value: surname }, email: { value: email },
                password: { value: password },
                passwordConfirmation: { value: passwordConfirmation }, id = { value: id }, token = { value: token } } = event.target
            onPersonalArea(name, surname, email, password, passwordConfirmation, id, token) */

        }}>

            <h1 className="personal-area__title">Personal Area</h1>
            <p>Name:</p>
            <input className="personal-area__field" type="text" name="name" placeholder={user.name} disabled></input>

            <p>Surname:</p>
            <input className="personal-area__field" type="text" name="surname" placeholder={user.surname} disabled></input>

            <p>Email:</p>
            <input className="personal-area__field" type="email" name="email" placeholder={user.username} disabled></input>

            <p>Password:</p>
            <input className="personal-area__field" type="password" name="password" disabled></input>

            <p>Password confirmation:</p>
            <input className="personal-area__field" type="password" name="password-confirmation" disabled></input>

            <button className="personal-area__submit" onClick={event => {
                event.preventDefault()
                const element = document.getElementsByClassName("personal-area__field")
                for (let item of element) {
                    item.removeAttribute("disabled")

                }

            }}>MODIFY</button>

            <button className="personal-area__submit" onClick={event => {
                event.preventDefault()

                let items = document.getElementsByClassName("personal-area__field");
                const name = items[0].value
                const surname = items[2].value
                const email = items[3].value
                const password = items[1].value
                const passwordConfirmation = items[4].value
        
                onSave(name, surname, email, password, passwordConfirmation)


            }}>SAVE</button>

            <button className="personal-area__submit" onClick={event => {
                event.preventDefault()
                onSignOut()
            }}>SIGN OUT</button>

        </form>
    </section>

}
