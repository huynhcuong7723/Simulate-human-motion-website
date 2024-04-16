import React, { useState } from "react";

import "./UpdateAccount.css";
import logore from './picgo.png';
import usav from './usav.png';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const isEmailValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default function UpdateAccount({ session_username, session_firstname, session_lastname
    , session_birthdate, session_date, session_phone
    , session_email, session_password }) {
    const [formValue, setFormValue] = useState({});
    const [formError, setFormError] = useState({});
    const [modalVisible11, setModalVisible11] = useState(false);
    const [modalVisible111, setModalVisible111] = useState(false);
    const [modalVisible1111, setModalVisible1111] = useState(false);
    const [modalVisible22, setModalVisible22] = useState(false);


    const dangxuatload = () => {
        document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload(true);
    };

    const toggleModal11 = () => {
        setModalVisible11(!modalVisible11); // Toggle the modal visibility state
    };
    const toggleModal111 = () => {
        setModalVisible111(!modalVisible111); // Toggle the modal visibility state
    };
    const toggleModal1111 = () => {
        setModalVisible1111(!modalVisible1111); // Toggle the modal visibility state
    };
    const toggleModal22 = () => {
        setModalVisible22(!modalVisible22); // Toggle the modal visibility state
    };

    const validateForm1 = () => {
        const error = {};

        if (isEmptyValue(formValue.firstname)
            || isEmptyValue(formValue.lastname)
            || isEmptyValue(formValue.email) || isEmptyValue(formValue.phone)) {
            toggleModal11();
            toggleModal1111();
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    };

    const handleChange1 = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit1 = async (event) => {
        event.preventDefault();

        if (validateForm1()) {
            try {

                const userData = {
                    username: session_username,
                    firstname: formValue.firstname,
                    lastname: formValue.lastname,
                    birthdate: formValue.birthdate,
                    email: formValue.email,
                    phone: formValue.phone,
                };
                const response = await axios.post('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/EDIT_US_INFO', userData);
                console.log('Đã gửi dữ liệu thành công:', response.data);
                toggleModal11();
                toggleModal111();
            } catch (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
            }
        }
    };

    const validateForm2 = () => {
        const error = {};

        if (isEmptyValue(formValue.password)) {
            toggleModal22();
            toggleModal1111();
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    };

    const handleChange2 = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit2 = async (event) => {
        event.preventDefault();

        if (validateForm2()) {
            try {

                const userData = {
                    username: session_username,
                    password: formValue.password,
                };
                console.log('Đã gửi dữ liệu thành công:XXXXXXX', userData);
                const response = await axios.post('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/EDIT_US_INFO_Pass', userData);
                console.log('Đã gửi dữ liệu thành công:', response.data);
                toggleModal22();
                toggleModal111();
            } catch (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
            }
        }
    };



    console.log(formError);

    return (
        <div class="container43 login-formz">
            <div class="left-column login1001-pic">
                <img src={usav} alt='Logo' style={{ width: '80%' }} />
            </div>
            <div class="right-column ">
                <div class="limiter">
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#A2A0A0' }}>User Profile</h1>
                    <div class="form-groupz">

                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#A2A0A0', fontWeight: 'bold' }}>Username: </p>
                            <p style={{ marginLeft: '10px', color: '#A2A0A0' }}>{session_username}</p>
                        </div>
                    </div>
                    <div class="form-groupz">
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#A2A0A0', fontWeight: 'bold' }}>First Name:</p>
                            <p style={{ color: '#A2A0A0', marginLeft: '10px' }}>{session_firstname}</p>
                        </div>

                    </div>
                    <div class="form-groupz">
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#A2A0A0', fontWeight: 'bold' }}>Last Name:</p>
                            <p style={{ color: '#A2A0A0', marginLeft: '10px' }}>{session_lastname}</p>
                        </div>
                    </div>
                    <div class="form-groupz">
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#A2A0A0', fontWeight: 'bold' }}>Email:</p>
                            <p style={{ color: '#A2A0A0', marginLeft: '10px' }}>{session_email}</p>
                        </div>
                    </div>

                    <div class="form-groupz">
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#A2A0A0', fontWeight: 'bold' }}>Phone:</p>
                            <p style={{ color: '#A2A0A0', marginLeft: '10px' }}>{session_phone}</p>
                        </div>
                    </div>
                    <div class="form-groupz">
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#A2A0A0', fontWeight: 'bold' }}>Password:</p>
                            <p style={{ color: '#A2A0A0', marginLeft: '10px' }}>{session_password}</p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button style={{ width: '40%', borderRadius: '10px' }} className='buttonz' onClick={toggleModal11} >Edit</button>
                        <button style={{ width: 'auto', marginLeft: '20px', borderRadius: '10px' }} onClick={toggleModal22} className='buttonz'>Change Password</button>
                    </div>

                    {modalVisible22 && (
                        <div className="modal">
                            <div className="modal-content" style={{
                                backgroundColor: '#3A3B3C',
                                border: '5px solid #4D4C4C'
                            }}>
                                <form onSubmit={handleSubmit2}>
                                    <h1 style={{ textAlign: 'center', marginTop: '30px', color: '#A2A0A0' }}>Change Password</h1>
                                    <div class="form-groupz">
                                        <p style={{ textAlign: 'center', color: '#A2A0A0', fontWeight: 'bold' }}>Your Password: {session_password}</p>

                                        <div style={{ display: 'flex' }}>

                                            <input className="textz" type="password" id="password" name="password"
                                                placeholder="Password" value={formValue.password} onChange={handleChange2} />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <button className="modal-close" type="submit">
                                            Submit
                                        </button>
                                        <button className="modal-close" style={{ marginLeft: '10px' }} onClick={toggleModal22}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}


                    {modalVisible1111 && (
                        <div className="modal">
                            <div className="modal-content">
                                <i class="uil uil-exclamation-circle modalicon" style={{ width: "200px", color: 'red' }}></i>
                                <h2>Error</h2>
                                <p>Please enter complete information</p>
                                <button className="modal-close" onClick={toggleModal1111}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {modalVisible111 && (
                        <div className="modal">
                            <div className="modal-content">
                                <i class="uil uil-check-circle modalicon" style={{ width: "200px", color: 'green' }}></i>
                                <h2>Success</h2>
                                <p>Please log out to update data</p>
                                <button className="modal-close" onClick={dangxuatload}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {modalVisible11 && (
                        <div className="modal">
                            <div className="modal-content" style={{
                                backgroundColor: '#3A3B3C',
                                border: '5px solid #4D4C4C'
                            }}>
                                <form onSubmit={handleSubmit1}>
                                    <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px', color: '#A2A0A0' }}>Edit Information</h1>

                                    <div class="form-groupz">
                                        <div style={{ display: 'flex' }}>
                                            <input
                                                className="textz"
                                                id="firstname"
                                                name="firstname"
                                                placeholder="First Name"
                                                value={formValue.firstname}
                                                onChange={handleChange1}
                                            />
                                            <input
                                                className="textz"
                                                id="lastname"
                                                name="lastname"
                                                placeholder="Last Name"
                                                style={{ marginLeft: '10px' }}
                                                value={formValue.lastname}
                                                onChange={handleChange1}
                                            />
                                        </div>
                                    </div>
                                    <div class="form-groupz">
                                        <input className="textz" id="email" name="email"
                                            placeholder="Email" value={formValue.email} onChange={handleChange1} />
                                    </div>

                                    <div class="form-groupz">
                                        <div style={{ display: 'flex' }}>
                                            <DatePicker
                                                className="textz"
                                                id="birthdate"
                                                name="birthdate"
                                                placeholderText="Date of Birth"
                                                selected={formValue.birthdate}
                                                onChange={(date) => {
                                                    const formattedDate = date.toISOString();
                                                    setFormValue((prevFormValue) => ({
                                                        ...prevFormValue,
                                                        birthdate: formattedDate,
                                                    }));
                                                }}
                                            />
                                            <input className="textz" id="phone" name="phone"
                                                placeholder="Phone" style={{ marginLeft: '10px' }} value={formValue.phone} onChange={handleChange1} />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <button className="modal-close" type="submit">
                                            Submit
                                        </button>
                                        <button className="modal-close" style={{ marginLeft: '10px' }} onClick={toggleModal11}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}