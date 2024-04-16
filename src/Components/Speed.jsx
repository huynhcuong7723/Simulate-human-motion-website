import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Speed.css";

const initFormValue = {
    Speed: { type: 'int' },
    date: { type: Date, default: Date.now },
};

const isEmptyValue = (value) => {
    return typeof value !== "string" || value.trim().length < 1;
};

export default function SpeedInputPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});
    const [modalVisible, setModalVisible] = useState(false); // State variable for modal visibility

    const validateForm = () => {
        const error = {};
        const lowerLimit = 500;
        const upperLimit = 5000;

        if (isEmptyValue(formValue.Speed)) {
            error["Speed"] = "Speed is required";
        } else {
            if (formValue.Speed < lowerLimit || formValue.Speed > upperLimit) {
                error["Speed"] = "Vui lòng nhập giá trị từ 500 đến 5000";
            }
        }

        setFormError(error);

        return Object.keys(error).length === 0;
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setFormValue({
            ...formValue,
            Speed: value,
            date: new Date().toISOString(),
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        if (validateForm()) {
            try {
                const userData = {
                    speed: formValue.Speed,
                    date: formattedDate,
                };
                const response = await axios.post(
                    "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/POST_SPEED",
                    userData
                );
                const response1 = await axios.post(
                    "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/test",
                    formValue
                );
                console.log("Đã gửi dữ liệu thành công:", response.data);
                console.log("Đã gửi dữ liệu thành công:", response1.data);
                fetchData();
                toggleModal(); // Show the modal after successful submission
            } catch (error) {
                console.error("Lỗi khi gửi dữ liệu:", error);
                // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
            }
        } else {
            console.log("form invalid");
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible); // Toggle the modal visibility state
    };

    console.log(formError);

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(
            "https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/GET_LIST_SPEED"
        )
            .then((response) => response.json())
            .then((data) => {
                setData(data[0].public.input.jsondata);
                setFilteredData(data[0].public.input.jsondata);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };

    return (
        <div>
            <div className='title'>
                <i className='uil uil-tachometer-fast-alt'></i>
                <span className='text'>Speed</span>
            </div>
            <div className="Speed-input1">
                <div className="Speed-iput-container1">
                    <h1 className="">Desired Engine Speed</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="Speed" className="form-label1">
                                Enter Speed:
                            </label>
                            <input
                                id="Speed"
                                className="form-control"
                                type="number"
                                name="speed"
                                value={formValue.Speed}
                                onChange={handleChange}
                            />
                            {formError.Speed && (
                                <div className="error-feedback">{formError.Speed}</div>
                            )}
                        </div>
                        <div className="center-align11">
                            <button type="submit" className="button3">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <i class="uil uil-check-circle modalicon" style={{ width: "200px" }}></i>
                        <h2>Success</h2>
                        <p>Current Speed: {formValue.Speed}</p>
                        <button className="modal-close" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className='title'>
                <i className='uil uil-tachometer-fast-alt'></i>
                <span className='text'>Speed History</span>
            </div>
            <table style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Last Speed</th>
                        <th>Last Time </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(filteredData)
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
                        .slice(0, 10) // Get the top 10 accounts
                        .map((item) => {
                            const date = new Date(item.date);
                            const formattedDate = `${date.getFullYear()}-${(
                                date.getMonth() + 1
                            )
                                .toString()
                                .padStart(2, "0")}-${date.getDate()
                                    .toString()
                                    .padStart(2, "0")} ${date.getHours()
                                        .toString()
                                        .padStart(2, "0")}:${date.getMinutes()
                                            .toString()
                                            .padStart(2, "0")}:${date.getSeconds()
                                                .toString()
                                                .padStart(2, "0")}`;

                            return (
                                <tr key={item.id}>
                                    <td>Stepper Motor</td>
                                    <td>{item.speed}</td>
                                    <td>{formattedDate}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}