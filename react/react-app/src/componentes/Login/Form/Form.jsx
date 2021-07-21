import { Link } from 'react-router-dom';
import './Form.css'
import Logo from '../../../assets/download.png';

export default function Form() {
    return (
        <div className="Form">
            <form method="POST">
                <div className="container2">
                <img src={Logo} 
                        alt="logo" 
                        width="240px" 
                        height="220px" 
                    />
                <br />
                <div id="Email">
                    <label htmlFor="email"><p>Login</p></label>
                    <input type="text"  placeholder="Digite seu email" name="email" 
                    required
                    />
                </div>

                <div id="Password">
                    <input id="form-bottom" type="password" placeholder="Digite sua senha" name="password"
                    required
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