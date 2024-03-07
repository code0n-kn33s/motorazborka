import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'

export default function Main(params) {

    return (
        <>
            <nav className="main-nav__wrapper">
                <div className="main-nav-logo">
                    <img src={logo} alt="" />
                </div>
                <ul className="main-nav__first-lvl">
                    <li className="main-nav__first-lvl-item">
                        <NavLink className="link" to="main">
                            <span>
                                Главная
                            </span>
                        </NavLink>
                    </li>
                    <li className="main-nav__first-lvl-item">
                        <NavLink className="link" to="razborka">
                            <span>
                                Разборка
                            </span>
                        </NavLink>
                    </li>
                    <li className="main-nav__first-lvl-item">
                        <NavLink className="link" to="detali">

                            <span>
                                Детали
                            </span>
                        </NavLink>
                    </li>
                    <li className="main-nav__first-lvl-item">
                        <NavLink className="link" to="razhodniki">
                            <span>
                                Разходники
                            </span>
                        </NavLink>
                    </li>

                    <li className="main-nav__first-lvl-item">
                        <NavLink className="link" to="contacts">
                            <span>
                                Контакты
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}