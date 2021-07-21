
import FigureCaption from 'react-bootstrap/esm/FigureCaption';
import {Link} from 'react-router-dom';



import Logo from '../../assets/download.png'
export default function Home() {
    return (
        <div className="Home">
            <div className="Header">
                <div className="flex-title">
                    <img src={Logo} 
                        alt="logo" 
                        width="120px" 
                        height="160px" 
                        padding="0"
                    />
                </div>
        <div className='flex-button'>
            <Link to ="/login">
                <button className="login-button">
                 Login
                </button>
            </Link>
        </div>
    </div>
        <div className="Conteudo">
            <figure>
                <img id="LogoV" 
                alt="Logo-Variant" 
                src={Logo} 
                width="300px" 
                height="150px" 
            />
                <figcaption>O maior e mais top site de compras</figcaption>
            </figure>
        </div>
    </div>
    )
}