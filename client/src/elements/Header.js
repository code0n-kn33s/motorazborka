import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'

export default function Main(params) {

    const login = () => {

    }
    
    return (
        <nav className="main-nav__wrapper">
            <div className="main-nav-logo" onClick={login}>
                <img src={logo} alt="" />
            </div>
            <ul className="main-nav__first-lvl">
                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="main">
                        <span>
                            Головна
                        </span>
                    </NavLink>
                </li>
                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="detali">
                        <span>
                            Запчастини
                        </span>
                    </NavLink>
                </li>
                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="razborka">
                        <span>
                            Розборка
                        </span>
                    </NavLink>
                </li>
                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="razhodniki">
                        <span>
                            Рoзхідники
                        </span>
                    </NavLink>
                </li>

                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="contacts">
                        <span>
                            Контакти
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}