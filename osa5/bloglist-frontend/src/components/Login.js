import React from 'react'


const Login = ({ handleLogin, setUser, setPass }) => {

    return(
        <form className="login-form" onSubmit={handleLogin}>
            <table>
                <tbody>
                    <tr>
                        <td>Username:</td>
                    </tr>
                    <tr>
                        <td><input type="text" value={setUser.value} name="Username" onChange={setUser.onChange}></input></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                    </tr>
                    <tr>
                        <td><input type="password" value={setPass.value} name="Password" onChange={setPass.onChange}></input></td>
                    </tr>
                    <tr>
                        <td><button type="submit" className="login-button">Login</button></td>
                    </tr>
                </tbody>
            </table>
        </form>)
}


export default Login