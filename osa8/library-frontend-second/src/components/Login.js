import React, {useState} from 'react'

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    const login = async (event) => {
        event.preventDefault()

        try{
            const result = await props.loginEvent({
                variables: {username: username, password: pass}
            })
            console.log(result)
            localStorage.setItem('user-token', result.data.login.value)
            props.setCur(result.data.login.value)
            props.setPage('authors')

        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <div className="login-page">
            <h1>Login to the application</h1>
        </div>
        <form onSubmit={login}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Username:
                        </td>
                        <td>
                            <input type="text" onChange={ ({ target }) => setUsername(target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password:
                        </td>
                        <td>
                            <input type="password" onChange={ ({ target }) => setPass(target.value)}></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login