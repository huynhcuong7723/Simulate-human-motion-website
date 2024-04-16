import "./Dashboard.css";
import React, { useState, useEffect } from 'react';
import usavtar from './usav.png';

function Dashboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalRoleOneAccounts, setTotalRoleOneAccounts] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/GET_Data_login')
            .then(response => response.json())
            .then(data => {
                setData(data[0].public.input.jsondata);
                setFilteredData(data[0].public.input.jsondata); // Khởi tạo filteredData ban đầu là toàn bộ dữ liệu
                setTotalAccounts(Object.keys(data[0].public.input.jsondata).length);
                // Đếm số lượng tài khoản có role = 1
                const roleOneAccounts = Object.values(data[0].public.input.jsondata).filter(account => account.role === 1);
                setTotalRoleOneAccounts(roleOneAccounts.length);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    return (
        <div className='dash-content' style={{ paddingTop: '5px' }}>
            <div className='overview'>
                <div className='title'>
                    <i className='uil uil-tachometer-fast-alt'></i>
                    <span className='text'>Dashboard</span>
                </div>

                <div className='boxes' >
                    <div className='box box1'>
                        <i class="uil uil-users-alt"></i>
                        <span className='text'>Total Accounts</span>
                        <span className='number'>{totalAccounts}</span>
                    </div>
                    <div className='box box2'>
                        <i class="uil uil-servers"></i>
                        <span className='text'>Total Sensor</span>
                        <span className='number'>4</span>
                    </div>
                    <div className='box box3'>
                        <i class="uil uil-user-check"></i>
                        <span className='text'>Total Admins</span>
                        <span className='number'>{totalRoleOneAccounts}</span>
                    </div>
                </div>

                <div className='title'>
                    <i class="uil uil-user-check"></i>
                    <span className='text'>Recently Users</span>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(filteredData)
                            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
                            .slice(0, 10) // Get the top 10 accounts
                            .map(item => {
                                const date = new Date(item.date);
                                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <div className='logous1'>
                                                <img src={usavtar} alt="Avatar" />
                                            </div>
                                        </td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>{formattedDate}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;