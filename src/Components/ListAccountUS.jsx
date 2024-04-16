import React, { useState, useEffect } from 'react';
import "./ListAccountUS.css";
import usavtar from './usav.png';

function ListAccountUS() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div>
            <link rel='stylesheet' href='https://unicons.iconscout.com/release/v4.0.0/css/line.css' />
            <div className='title'>
                <i className='uil uil-tachometer-fast-alt'></i>
                <span className='text'>Search Users</span>
            </div>
            <div className='cover' style={{ display: 'flex', alignItems: 'centerHere' }}>
                <div className='search-box1' style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <i className='uil uil-search'></i>
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search User By FirstName" />
                </div>
            </div>

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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListAccountUS;