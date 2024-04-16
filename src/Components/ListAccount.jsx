import React, { useState, useEffect } from 'react';
import "./ListAccount.css";
import usavtar from './usav.png';
import axios from 'axios';

function ListAccount() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [confirmModalKey, setConfirmModalKey] = useState(null);
    const [updatedID, setUpdatedID] = useState('');
    const [updatedFirstName, setUpdatedFirstName] = useState('');
    const [updatedLastName, setUpdatedLastName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPass, setUpdatedPass] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/GET_Data_login')
            .then(response => response.json())
            .then(data => {
                setData(data[0].public.input.jsondata);
                setFilteredData(data[0].public.input.jsondata); // Khởi tạo filteredData ban đầu là toàn bộ dữ liệu
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const showConfirmModal = (key) => {
        setConfirmModalKey(key);
        setConfirmModalVisible(true);
    };

    const hideConfirmModal = () => {
        setConfirmModalKey(null);
        setConfirmModalVisible(false);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible); // Toggle the modal visibility state
    };

    const toggleModal1 = () => {
        setModalVisible1(!modalVisible1); // Toggle the modal visibility state
    };

    const handleDelete = (key) => {
        showConfirmModal(key);
    };

    const handleDeleteConfirm = () => {
        const key = confirmModalKey;
        axios
            .post(`https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/DELETE_ACCOUNT`, {
                data: { key },
            })
            .then(response => {
                console.log('Delete successful:', response);
                setFilteredData(prevData => {
                    const updatedData = { ...prevData };
                    delete updatedData[key];
                    return { ...updatedData };
                });
                hideConfirmModal();
                toggleModal1();
            })
            .catch(error => {
                console.error('Delete error:', error);
            });
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // Lọc dữ liệu dựa trên firstName
        const filtered = Object.keys(data).filter(key => data[key].firstname.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered.reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {}));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUpdate = (key) => {
        const { firstname, lastname, email, password } = data[key];
        setUpdatedID(key);
        setUpdatedFirstName(firstname);
        setUpdatedLastName(lastname);
        setUpdatedEmail(email);
        setUpdatedPass(password);
        toggleModal();
    };
    const handleUpdateConfirm = () => {
        const key = confirmModalKey;
        const updatedData = {
            username: updatedID,
            email: updatedEmail,
            password: updatedPass,
        };
        axios
            .post(`https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/UPDATE_ACCOUNT`, updatedData)
            .then(response => {
                console.log('Update successful:', response);
                setData(prevData => {
                    const updated = { ...prevData };
                    updated[key] = updatedData[key];
                    return updated;
                });
                fetchData();
                toggleModal();
                toggleModal1();
            })
            .catch(error => {
                console.error('Update error:', error);
            });
    };

    // const handleFirstNameChange = (event) => {
    //     setUpdatedFirstName(event.target.value);
    // };

    // const handleLastNameChange = (event) => {
    //     setUpdatedLastName(event.target.value);
    // };

    const handleEmailChange = (event) => {
        setUpdatedEmail(event.target.value);
    };

    const handlePassChange = (event) => {
        setUpdatedPass(event.target.value);
    };

    return (
        <div>
            <link rel='stylesheet' href='https://unicons.iconscout.com/release/v4.0.0/css/line.css' />
            <div className='title'>
                <i className='uil uil-tachometer-fast-alt'></i>
                <span className='text'>Manage Users</span>
            </div>
            <div className='cover' style={{ display: 'flex', alignItems: 'centerHere' }}>
                <div className='search-box1' style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <i className='uil uil-search'></i>
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search User By FirstName" />
                </div>
            </div>

            {modalVisible1 && (
                <div className="modal">
                    <div className="modal-content">
                        <i class="uil uil-check-circle modalicon" style={{ width: "200px" }}></i>
                        <h2>Success</h2>
                        <p>Successfully Update</p>
                        <button className="modal-close" onClick={toggleModal1}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {confirmModalVisible && (
                <div className="modal">
                    <div className="modal-content" style={{ borderRadius: '30px' }}>
                        <i class="uil uil-question-circle modalicon" style={{ width: "200px", color: "red" }}></i>
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="confirm-modal-buttons">
                            <button className="confirm-modal-button modal-close" onClick={handleDeleteConfirm} style={{ marginRight: '10px' }}>
                                Delete
                            </button>
                            <button className="confirm-modal-button modal-close" onClick={hideConfirmModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content" style={{ borderRadius: '30px' }}>
                        <i class="uil uil-file-edit-alt modalicon" style={{ width: "200px", color: "#fc9803" }}></i>
                        <h2>Update Information</h2>
                        {/* <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" value={updatedFirstName} onChange={handleFirstNameChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" value={updatedLastName} onChange={handleLastNameChange} />
                        </div> */}
                        <a >( {updatedFirstName} {updatedLastName} )</a>
                        <div className="form-group" style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px',
                            marginTop: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}>
                            <a style={{ marginRight: '5px' }}>Email:</a>
                            <input type="text" id="email" value={updatedEmail} onChange={handleEmailChange} />
                        </div>
                        <div
                            className="form-group"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '8px',
                                marginTop: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                        >
                            <a style={{ marginRight: '5px' }}>Password:</a>
                            <input type="text" id="password" value={updatedPass} onChange={handlePassChange} />
                        </div>
                        <div className="form-buttons" style={{ paddingTop: '30px' }}>
                            <button className="modal-close" style={{ marginRight: '10px' }} onClick={handleUpdateConfirm}>
                                Update
                            </button>
                            <button className="modal-close" onClick={toggleModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div class="grid-container">
                {Object.keys(filteredData).map(key => (
                    <div key={key} className='tagUser'>
                        <div className='logous'>
                            <img src={usavtar} alt='Logo' />
                        </div>
                        <h2>{filteredData[key].firstname} {filteredData[key].lastname}</h2>
                        <p>First Name: {filteredData[key].firstname}</p>
                        <p>Last Name: {filteredData[key].lastname}</p>
                        <p>Email: {filteredData[key].email}</p>
                        <p>Phone: {filteredData[key].phone}</p>
                        <div>
                            <button className='button1' onClick={() => handleUpdate(key)}>Update</button>
                            <button className='button2' onClick={() => handleDelete(key)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListAccount;