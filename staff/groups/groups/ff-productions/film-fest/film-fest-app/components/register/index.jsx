function Register() {
        return <section className="view register ">
                <form>
                        <ul>
                                <li><span />
                                        <h1 className="register__title">Register</h1>
                                        <span /></li>

                                <li><span />
                                        <input className="register__field" type="text" name="name" placeholder="name"></input>
                                        <span /></li>

                                <li><span />
                                        <input className="register__field" type="text" name="surname" placeholder="surname"></input>
                                        <span /></li>

                                <li><span />
                                        <input className="register__field" type="email" name="email" placeholder="e-mail"></input>
                                        <span /></li>

                                <li><span />
                                        <input className="register__field" type="password" name="password"
                                                placeholder="password"></input>
                                        <span /></li>

                                <li><span />
                                        <input className="register__field" type="password" name="password-confirmation"
                                                placeholder="password"></input>
                                        <span /></li>
                                <li><span />
                                        <button className="register__submit">SIGN IN</button>
                                        <span /></li>
                                <li><span />
                                        <button className="register__submit">LOGIN!</button>
                                        <span /></li>
                        </ul>
                </form>

                <section className="feedback">
                        <p className="feedback__message">I am the register feedback</p>
                </section>
        </section>
}