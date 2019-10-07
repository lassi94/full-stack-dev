import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUsers } from '../reducers/userStateReducer'
import { check } from '../reducers/userReducer'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {

    useEffect(() => {
        props.check()
        props.setUsers()
    }, [])

    console.log('Helloo users', props.userCount)

    const getBLogCount = (users, id) => {
        console.log(users, id)
        const result = users.find(item => item.id === id)
        console.log(result.blogs)
        if(result.blogs !== undefined){
            return result.blogs.length
        }else{
            return 0
        }
    }

    if(props.userCount === null){
        return null
    }else if(props.userCount.name !== null){
        console.log("Rendered", props.userCount)
        return(
            <div className="users">
                <h3>Users</h3>
                <Table striped celled>
                    <Table.Body>
                        <Table.Row><Table.Cell>Name</Table.Cell><Table.Cell>Blogs</Table.Cell></Table.Row>
                        {props.userCount.map(item =>
                            <Table.Row key={item.id}>
                                <Table.Cell><Link to={`/users/${item.id}`}>{item.name}</Link></Table.Cell>
                                <Table.Cell>{getBLogCount(props.userCount, item.id)}</Table.Cell>
                            </Table.Row>)}
                    </Table.Body>
                </Table>
            </div>
        )
    }else{
        return(null)
    }
}

const mapState = (state) => {
    return{
        userCount: state.userCount
    }
}

const mapDispatch = {
    setUsers,
    check
}


export default connect(mapState, mapDispatch)(Users)