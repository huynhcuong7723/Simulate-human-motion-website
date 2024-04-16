// ... (các import và hàm fetchGaugeData giữ nguyên)
import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import "./Gauge.css";
const GaugeExample = () => {
    const [gaugeData, setGaugeData] = useState({
        Roll_dui_trai_moi: 0,
        Roll_dui_phai_moi: 0,
        Roll_bap_chan_trai_moi: 0,
        Roll_bap_chan_phai_moi: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/GET_GAUGE');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setGaugeData({
                    Roll_dui_trai_moi: data?.Roll_dui_trai_moi || 0,
                    Roll_dui_phai_moi: data?.Roll_dui_phai_moi || 0,
                    Roll_bap_chan_trai_moi: data?.Roll_bap_chan_trai_moi || 0,
                    Roll_bap_chan_phai_moi: data?.Roll_bap_chan_phai_moi || 0,
                });
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        // Lặp lại gọi API mỗi 5 giây
        const intervalId = setInterval(fetchData, 5000);

        // Hủy interval khi component bị unmount
        return () => clearInterval(intervalId);
    }, []); // Chạy một lần khi component được mount

    const renderValueWithUnit = (value) => {
        return value.toFixed(2);
    };


    return (
        <div>
            {/* <div className='boxes'>
                <div className='box box1'>
                    <div style={{ textAlign: 'center' }}>
                        <GaugeChart
                            id="gauge-chart1"
                            percent={(gaugeData.Roll_dui_trai_moi + Math.PI) / (2 * Math.PI)}
                            needleColor="red"
                            textColor="black"
                        />
                        <h2>Roll Angle - Left Leg</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{renderValueWithUnit(gaugeData.Roll_dui_trai_moi)}</p>
                    </div>
                </div>
                <div className='box box2'>
                    <div style={{ textAlign: 'center' }}>
                        <GaugeChart
                            id="gauge-chart3"
                            percent={(gaugeData.Roll_bap_chan_trai_moi + Math.PI) / (2 * Math.PI)}
                            needleColor="green"
                            textColor="black"
                        />
                        <h2>Roll Angle - Left Leg Knee</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{renderValueWithUnit(gaugeData.Roll_bap_chan_trai_moi)}</p>
                    </div>
                </div>
            </div>
            <div className='boxes'>
                <div className='box box1'>
                    <div style={{ textAlign: 'center' }}>
                        <GaugeChart
                            id="gauge-chart2"
                            percent={(gaugeData.Roll_dui_phai_moi + Math.PI) / (2 * Math.PI)}
                            needleColor="red"
                            textColor="black"
                        />
                        <h2>Roll Angle - Right Leg</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{renderValueWithUnit(gaugeData.Roll_dui_phai_moi)}</p>
                    </div>
                </div>
                <div className='box box2'>
                    <div style={{ textAlign: 'center' }}>
                        <GaugeChart
                            id="gauge-chart4"
                            percent={(gaugeData.Roll_bap_chan_phai_moi + Math.PI) / (2 * Math.PI)}
                            needleColor="blue"
                            textColor="black"
                        />
                        <h2>Roll Angle - Right Leg Knee</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{renderValueWithUnit(gaugeData.Roll_bap_chan_phai_moi)}</p>
                    </div>
                </div>
            </div> */}

            <div className='boxes'>
                <div className='box box1' style={{ border: '10px solid #4D4C4C' }}>
                    <i class="uil uil-tachometer-fast-alt"></i>
                    <span className='text'>Roll Angle - Right Leg Knee</span>
                    <span className='number'>
                        <span className='rad-value'>{renderValueWithUnit(gaugeData.Roll_dui_trai_moi)} <sup style={{ fontSize: '20px' }}>rad</sup></span>
                        <span className='divider' style={{ margin: '0 5px' }}>/</span>
                        <span className='degree-value'>{renderValueWithUnit(gaugeData.Roll_dui_trai_moi * (180 / Math.PI))}<sup style={{ fontSize: '30px' }}>°</sup></span>
                    </span>
                </div>
                <div className='box box2' style={{ border: '10px solid #4D4C4C' }}>
                    <i class="uil uil-tachometer-fast-alt"></i>
                    <span className='text'>Roll Angle - Right Leg Knee</span>
                    <span className='number'>
                        <span className='rad-value'>{renderValueWithUnit(gaugeData.Roll_bap_chan_trai_moi)} <sup style={{ fontSize: '20px' }}>rad</sup></span>
                        <span className='divider' style={{ margin: '0 5px' }}>/</span>
                        <span className='degree-value'>{renderValueWithUnit(gaugeData.Roll_bap_chan_trai_moi * (180 / Math.PI))}<sup style={{ fontSize: '30px' }}>°</sup></span>
                    </span>
                </div>
            </div>
            <div className='boxes'>
                <div className='box box1' style={{ border: '10px solid #4D4C4C' }}>
                    <i class="uil uil-tachometer-fast-alt"></i>
                    <span className='text'>Roll Angle - Right Leg Knee</span>
                    <span className='number'>
                        <span className='rad-value'>{renderValueWithUnit(gaugeData.Roll_dui_phai_moi)} <sup style={{ fontSize: '20px' }}>rad</sup></span>
                        <span className='divider' style={{ margin: '0 5px' }}>/</span>
                        <span className='degree-value'>{renderValueWithUnit(gaugeData.Roll_dui_phai_moi * (180 / Math.PI))}<sup style={{ fontSize: '30px' }}>°</sup></span>
                    </span>
                </div>
                <div className='box box2' style={{ border: '10px solid #4D4C4C' }}>
                    <i class="uil uil-tachometer-fast-alt"></i>
                    <span className='text'>Roll Angle - Right Leg Knee</span>
                    <span className='number'>
                        <span className='rad-value'>{renderValueWithUnit(gaugeData.Roll_bap_chan_phai_moi)} <sup style={{ fontSize: '20px' }}>rad</sup></span>
                        <span className='divider' style={{ margin: '0 5px' }}>/</span>
                        <span className='degree-value'>{renderValueWithUnit(gaugeData.Roll_bap_chan_phai_moi * (180 / Math.PI))}<sup style={{ fontSize: '30px' }}>°</sup></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GaugeExample;

