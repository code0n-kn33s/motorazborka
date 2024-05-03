import React from "react";
import Header from "../elements/Header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ConfigProvider, theme } from 'antd';
import Aside from "../elements/Aside";
import Footer from '../elements/Footer';

import { getToken } from '../helpers';
import { useDispatch, useSelector } from "react-redux";
import { closeTooltip, openTooltip } from "../toolkitReducers";

export default function Main() {
  const { fetching } = useSelector(state => state.state)
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    // if (location.pathname === "/" && getToken() !== null) {
    //   navigate('/profile')
    // }

    // if (getToken() === null) {
    //   navigate('/login')
    // }
  }, [])

  return (
    <div className="page">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          // algorithm: theme.compactAlgorithm,
          token: {
            fontFamily: "Roboto, Helvetica Neue",
            // Seed Token
            colorPrimary: '#dd7426',
            borderRadius: 2,
            colorPrimaryBgHover: '#FFA500',
            // Alias Token
            colorBgContainer: 'transparent',
          },
        }}
      >
        {fetching === "loading" && <Spinner />}
        <Header />
        <Tooltip />

        <div className="body-wrapper">
          <div className="sections-wrapper">
            <Outlet />
          </div>
        </div>
        <Footer />
      </ConfigProvider>
    </div>
  );
}

export const Tooltip = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isTooltip } = useSelector((state) => state.auth)

  React.useEffect(() => {
    if (isTooltip === true) {
      dispatch(openTooltip())
    }
  }, [isTooltip])

  const clickDone = () => {
    dispatch(closeTooltip())
  }

  return (
    <>
      {(isTooltip) && <div class="tooltip">

        {isTooltip && <div className="tooltip-liqi">
          <h2>Tooltip!</h2>
        </div>
        }
        <div>
          <button
            className="KYS-section__next-page btn btn--primary"
            onClick={clickDone}
            type="button"
          >
            Готово
          </button>
        </div>
      </div>}
    </>
  )
}

const Spinner = () => {
  return <div className="site-spinner"><span class="loader"></span></div>
}