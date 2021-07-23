import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Form.css'
import Logo from '../../../assets/download.png';
import axios from 'axios';

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function  handleSubmit(event){
        event.preventDefault();
        axios.post('/users/login', {email,password}).then((res) => history.push('/dashboard'))
        .catch((err) => alert(err))
    }

    return (
        <div className="Form">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="container2">
                <img src={Logo} 
                        alt="logo" 
                        width="240px" 
                        height="220px" 
                    />
                <br />
                <div id="Email">
                    <label htmlFor="email"><p>Login:</p></label>
                    <input type="text"  placeholder="Digite seu email" name="email" 
                    required onChange={handleEmailChange} value = {email}
                    />
                </div>

                <div id="Password">
                    <input id="form-bottom" type="password" placeholder="Digite sua senha"  value ={password} name="password"
                    required onChange={handlePasswordChange}
                    />
                    <span className="passwrod">
                        <Link to=" forgotpsw">
                            Esqueci minha senha
                        </Link>
                    </span>
                    <button type="submit">Entrar</button>
                    <br className="unselectable" />
                    <br className="unselectable" />
                </div>

                </div>
            </form>
        </div>
    )
}