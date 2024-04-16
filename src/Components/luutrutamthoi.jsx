import React, { useState } from "react";

import "./RegisterAccount.css";
import logore from './picgo.png';
import axios from 'axios';

const initFormValue = {
    title: 'TÀI KHOẢN ĐĂNG KÝ',
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
    properties: {
        firstName: { type: 'string', title: 'TÊN NGƯỜI DÙNG' },
        lastName: { type: 'string', title: 'HỌ NGƯỜI DÙNG' },
        email: { type: 'string', title: 'Email NGƯỜI DÙNG ' },
        password: { type: 'string', title: 'MÃ SỐ', format: 'password' },
        confirmPassword: { type: 'string', title: 'MÃ SỐ', format: 'password' },
        date: { type: Date, default: Date.now },
    },
};

const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const isEmailValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default function RegisterPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});

    const validateForm = () => {
        const error = {};

        if (isEmptyValue(formValue.firstName)) {
            error["firstName"] = "Error: First Name is required";
        }
        if (isEmptyValue(formValue.lastName)) {
            error["lastName"] = "Error: Last Name is required";
        }
        if (isEmptyValue(formValue.email)) {
            error["email"] = "Error: Email is required";
        } else {
            if (!isEmailValid(formValue.email)) {
                error["email"] = "Error: Email is invalid";
            }
        }
        if (isEmptyValue(formValue.password)) {
            error["passWord"] = "Error: Password is required";
        }
        if (isEmptyValue(formValue.confirmPassword)) {
            error["confirmPassword"] = "Error: Confirm Password is required";
        } else if (formValue.confirmPassword !== formValue.password) {
            error["confirmPassword"] = "Error: Confirm Password not match";
        }

        setFormError(error);

        return Object.keys(error).length === 0;
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
            date: new Date().toISOString()
        });
    };

    const fetchData = async () => {
        try {
            const response = await fetch('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/GET_ID_ACC');
            const responseData = await response.json();
            if (responseData[0] && responseData[0].ID_account !== null) {
                return parseFloat(responseData[0].ID_account); // Convert the value to a double using parseFloat
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const generateRandomNumber = async () => {
        const data = await fetchData();
        if (typeof data === 'undefined') {
            return 1;
        } else {
            return data + 1;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        const randomNumberr = await generateRandomNumber();

        if (validateForm()) {
            try {
                const randomNumber = {
                    ID_account: randomNumberr,
                };

                const userData = {
                    firstName: formValue.firstName,
                    lastName: formValue.lastName,
                    email: formValue.email,
                    password: formValue.password,
                    confirmPassword: formValue.confirmPassword,
                    date: formattedDate,
                    ID: formValue.firstName,
                };

                console.error('Random number:', randomNumberr);
                const response = await axios.post('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/Log_in', userData);
                const response1 = await axios.post('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/COUNT_ID', randomNumber);

                console.log('Đã gửi dữ liệu thành công:', response.data);
                console.log('Đã gửi dữ liệu thành công:', response1.data);
                // Xóa thông tin trong form sau khi gửi thành công
                setFormValue({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });

                // Thực hiện các xử lý tiếp theo, ví dụ: chuyển hướng, hiển thị thông báo thành công, vv.
            } catch (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
                // Xử lý lỗi và hiển thị thông báo lỗi
            }
        }
    };


    console.log(formError);

    return (
        <div className="limiter">
            <div className="wrap-login100">
                <div className="login100-pic js-tilt" data-tilt>
                    <img src={logore} alt='Logo' />
                </div>

                <form className="login100-form validate-form" onSubmit={handleSubmit}>
                    <span className="login100-form-title">
                        Register
                    </span>

                    <div
                        className="wrap-input100 validate-input"
                    >
                        <input
                            id="first-name"
                            className="input100"
                            type="text"
                            name="firstName"
                            placeholder="FirstName"
                            value={formValue.firstName}
                            onChange={handleChange}
                        />
                        {formError.firstName && (
                            <div className="error-feedback">{formError.firstName}</div>
                        )}
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i class="uil uil-label"></i>
                        </span>
                    </div>

                    <div
                        className="wrap-input100 validate-input"
                    >
                        <input
                            id="last-name"
                            className="input100"
                            type="text"
                            name="lastName"
                            placeholder="LastName"
                            value={formValue.lastName}
                            onChange={handleChange}
                        />
                        {formError.lastName && (
                            <div className="error-feedback">{formError.lastName}</div>
                        )}
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i class="uil uil-label"></i>
                        </span>
                    </div>

                    <div
                        className="wrap-input100 validate-input"
                    >
                        <input
                            id="email"
                            className="input100"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        {formError.email && (
                            <div className="error-feedback">{formError.email}</div>
                        )}
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i class="uil uil-envelope" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div
                        className="wrap-input100 validate-input"
                    >
                        <input
                            id="password"
                            className="input100"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValue.password}
                            onChange={handleChange}
                        />
                        {formError.passWord && (
                            <div className="error-feedback">{formError.passWord}</div>
                        )}
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i class="uil uil-lock-alt"></i>
                        </span>
                    </div>

                    <div
                        className="wrap-input100 validate-input"
                    >
                        <input
                            id="confirm-password"
                            className="input100"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formValue.confirmPassword}
                            onChange={handleChange}
                        />
                        {formError.confirmPassword && (
                            <div className="error-feedback">{formError.confirmPassword}</div>
                        )}
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i class="uil uil-lock-alt"></i>
                        </span>
                    </div>

                    <div className="container-login100-form-btn">
                        <button type="submit" className="login100-form-btn">Sign Up</button>
                    </div>

                    <div className="text-center p-t-136" style={{ textAlign: "center", paddingTop: "20px" }}>
                        <a className="txt2" href="#">
                            Create your Account
                            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}