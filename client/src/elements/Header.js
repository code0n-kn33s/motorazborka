import { useState } from 'react'
import { ModalLogin } from "../pages/main/modalLogin";
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { useSelector } from "react-redux";

import adminImg from './images.png';

export default function Main(params) {
    const [isModalOpen, setModalOpen] = useState(false);
    const isAuth = useSelector(store => store.auth.isAuth);

    const modalLoginClick = () => {
        setModalOpen(true)
    }

    return (
        <nav className="main-nav__wrapper">
            <ModalLogin
                isOpen={isModalOpen}
                setModalOpen={setModalOpen}
            />
            <div className="main-nav-logo" onClick={modalLoginClick}>
                <img src={logo} alt="" />
                {isAuth && <div className='loged-in-icon'><img src={adminImg} alt="" /></div>}
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