import React from 'react'
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'


const Nav = () => {
    return (
        <div style={divStyle}>
            <Link to='/'>
                <Button style={{marginRight: '10px'}} variant="secondary">Search Dictionary</Button>
            </Link>

            <Link to='/favourite'>
                <Button variant="secondary">View Favourites</Button>
            </Link>
            
        </div>
    )
}

export default Nav

const divStyle = {
    padding: '60px',
    textAlign: 'center',
}
