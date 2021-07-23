import axios from 'axios';
import { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './Dashboard.css'

export default function Dashboard() {
    
    const [user, setUser] = useState(false);
    useEffect(() => {
        axios.get('users/me')
            .then((res) => setUser(res.data))
            .catch( (err) => console.log(err.response) )
    }, []);

    const history = useHistory();
    function handleLogout(){
        axios.get('/users/logout');
        history.push('/')
    }
    
    if(user)
        return (
            <div className="Dashboard">
                <Nav className="flex-column">
                   <Nav.Item as ="h1">Dashboard</Nav.Item>
                    <hr />
                    <img width="130" height="130" src={user.image} alt="User" />
                    <Nav.Item>{user.name}</Nav.Item>
                    <Nav.Item>{user.email}</Nav.Item>
                    <Button variant="outline-danger" onClick={() => handleLogout()}>Logout</Button>
                    <hr />
                    <Nav.Link href="/dashboard/users">Usuários</Nav.Link>
                    <Nav.Link href="/dashboard/products">Produtos</Nav.Link>
                </Nav>
                <Router>
                    <Switch>
                        <Route path="/dashboard/users">

                        </Route>
                        <Route path="/dashboard/products">

                        </Route>
                    </Switch>
                </Router>
            </div>
    )
    else
        return (
            <h1>Loading!!</h1>
        )
} 