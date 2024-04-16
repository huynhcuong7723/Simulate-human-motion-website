import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./Login.css";
import logore from './login.png';
const LoginPage = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisiblelogin, setModalVisiblelogin] = useState(false);


    const toggleModallogin = () => {
        setModalVisiblelogin(!modalVisiblelogin); // Toggle the modal visibility state
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password,
        };
        axios
            .post('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/LOGINADM', loginData)
            .then(response => {
                // Kiểm tra phản hồi từ server
                if (response.data.body === true) {
                    // Đăng nhập thành công, cập nhật trạng thái isLoggedIn
                    setIsLoggedIn(true);
                    console.log('Đăng nhập thành công');
                    // Set the session identifier in a cookie
                    document.cookie = 'isLoggedIn=true; path=/;';
                    setIsLoggedIn(true);
                    Cookies.set('session_username', username);
                    Cookies.set('session_firstname', response.data.firstname);
                    Cookies.set('session_lastname', response.data.lastname);
                    Cookies.set('session_email', response.data.email);
                    Cookies.set('session_birthdate', response.data.birthdate);
                    Cookies.set('session_date', response.data.date);
                    Cookies.set('session_phone', response.data.phone);
                    Cookies.set('session_password', response.data.password);
                    Cookies.set('session_role', response.data.role);
                } else {
                    // Đăng nhập không thành công, xử lý thông báo lỗi hoặc thực hiện các hành động khác
                    console.log('Đăng nhập không thành công');
                    toggleModallogin();
                }
            })
            .catch(error => {
                // Xử lý lỗi khi gửi yêu cầu đăng nhập
                console.error('Đăng nhập thất bại:', error);
            });
    };

    return (
        <div>
            <form class="login-formz" style={{ maxWidth: '400px', paddingBottom: '20px' }} onSubmit={handleLogin}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#A2A0A0' }}>Login</h1>
                <div class="form-groupz">
                    <input className='textz' id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                </div>
                <div class="form-groupz">
                    <input className='textz' type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div style={{ textAlign: 'center', marginTop: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button className='buttonz' style={{ width: '50%' }} type="submit">Submit</button>
                </div>
                <div style={{ textAlign: "center", paddingTop: "10px" }}>
                    <a style={{
                        color: 'white',
                        fontSize: '10px',
                        textDecoration: 'underline',
                        transition: '0.3s',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#43d2e8'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        Create New Account ?
                    </a>
                </div>
            </form>
            <div class="login-formz" style={{ maxWidth: '400px', padding: '0' }}>

                <div style={{ textAlign: "center", paddingTop: "5px" }}>
                    <a style={{
                        color: 'white',
                        fontSize: '10px',
                        transition: '0.3s',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#43d2e8'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        ---- Account Admin Test ----
                    </a> </div>
                <div style={{ textAlign: "center", paddingTop: "5px" }}>
                    <a style={{
                        color: 'white',
                        fontSize: '10px',
                        transition: '0.3s',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#43d2e8'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        Username: admin
                    </a> </div>
                <div style={{ textAlign: "center", paddingTop: "5px", paddingBottom: '5px' }}>
                    <a style={{
                        color: 'white',
                        fontSize: '10px',
                        transition: '0.3s',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#43d2e8'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        Password: admin123
                    </a>
                </div>
                <div style={{ textAlign: "center", paddingTop: "5px" }}>
                    <a style={{
                        color: 'white',
                        fontSize: '10px',
                        transition: '0.3s',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#43d2e8'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        ---- Account User Test ----
                    </a> </div>
                <div style={{ textAlign: "center", paddingTop: "5px" }}>
                    <a style={{
                        color: 'white',
                        fontSize: '10px',
                        transition: '0.3s',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#43d2e8'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        Username: userlogin
                    </a> </div>
                <div style={{ textAlign: "center", paddingTop: "5px", paddingBottom: '5px' }}>
                    <a style={{
                        color: 'white',
                        fontSize: '10px',
                        transition: '0.3s',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => e.target.style.color = '#43d2e8'}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        Password: user123
                    </a>
                </div>
            </div>

            {modalVisiblelogin && (
                <div className="modal">
                    <div className="modal-content">
                        <i class="uil uil-exclamation-circle modalicon" style={{ width: "200px", color: 'red' }}></i>
                        <h2>Alert</h2>
                        <p style={{ color: '#4D4C4C' }}>Username or password is incorrect</p>
                        <button className="modal-close" onClick={toggleModallogin}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
};

export default LoginPage;