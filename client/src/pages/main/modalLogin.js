import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
// import { Label } from './label';
import LoginForm from './loginForm'


import { FormOutlined, DollarOutlined } from '@ant-design/icons';
import { loginUser, userLogout } from '../../toolkitReducers'
import { useDispatch, useSelector } from 'react-redux';

// loading
// fullfilled
// rejected

export const ModalLogin = (props) => {
    const { isOpen, setModalOpen } = props
    const authError = useSelector(state => state.auth.authError)

    const [isLogin, setLogin] = useState('')
    const [isPassword, setPassword] = useState('')

    const [isError, setErrors] = useState('')

    const [confirmLoading, setConfirmLoading] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => { }, [authError])


    const handleOk = () => {
        if (isLogin === '' || isPassword === '') {
            setErrors('Поля мають бути заповненими')
        }
        const sendFiedls = {
            "login": isLogin,
            "password": isPassword,
        }

        dispatch(loginUser(sendFiedls))

        setTimeout(() => {
            if (authError) {
                setErrors(authError)
            } else {
                setConfirmLoading(false)
                setModalOpen(false)
            }
        }, 1000);

    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const logout = () => {
        dispatch(userLogout())

        setTimeout(() => {
            setConfirmLoading(false)
            setModalOpen(false)
        }, 200);
    }

    return (
        <>
            <Modal
                title={"Введіть логін та пароль"}
                open={isOpen}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                width={"70%"}
                onCancel={handleCancel}
            >
                <div className='modal-content'>
                    <Button type="primary" onClick={logout} className="login-form-button-modal"  >
                        Вийти
                    </Button>
                    <br />
                    <div className="form-login">
                        <div style={{ color: 'red' }}>{isError}</div>
                        <label className="input-label-item" label="Заголовок деталi" name="username" rules={[{ required: true }]}>
                            <span>Логін <b style={{ color: 'red' }}>*</b></span><br />
                            <Input
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Введiть логін"
                                variant="filled"
                                value={isLogin}
                                size="large"

                                prefix={<FormOutlined />}
                            />
                        </label>
                        <label className="input-label-item" label="Заголовок деталi" name="username" rules={[{ required: true }]}>
                            <span>Пароль <b style={{ color: 'red' }}>*</b></span><br />
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введiть пароль"
                                variant="filled"
                                value={isPassword}
                                size="large"

                                prefix={<FormOutlined />}
                            />
                        </label>

                    </div>
                </div>

            </Modal>
        </>
    );
};