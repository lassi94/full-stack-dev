import React from 'react'
import { Button, Form } from 'semantic-ui-react'


const Login = ({ handleLogin, setUser, setPass }) => {

    return(
        <Form onSubmit={handleLogin}>
            <Form.Field>
                <label>Username</label>
                <input type="text" name="Username" { ...setUser[0] }></input>
            </Form.Field>
            <Form.Field>
                <label>Username</label>
                <input type="password" name="Password" { ...setPass[0] }></input>
            </Form.Field>
            <Button type="submit" className="login-button">Login</Button>
        </Form>)
}
export default Login