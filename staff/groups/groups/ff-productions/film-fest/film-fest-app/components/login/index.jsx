function Login(){
    
    return <form>
        <h1 className="login__title">Login</h1>
            <input className="login__field" type="email" name="email" placeholder="e-mail"></input>
            <input className="login__field" type="password" name="password" placeholder="password"></input>
            <div>
            <button className="login__submit">ENTER</button>
            <button className="login__submit">REGISTER!</button>
        </div>
    </form>

}