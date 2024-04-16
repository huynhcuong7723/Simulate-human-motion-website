import React from "react";
import "./Dashboard.css";

export default function ChartMongo() {

    return (
        <div >
            <link rel='stylesheet' href='https://unicons.iconscout.com/release/v4.0.0/css/line.css' />
            <div className='title'>
                <i className='uil uil-tachometer-fast-alt'></i>
                <span className='text'>Chart MongoDB</span>
            </div>
            <iframe
                style={{
                    paddingTop: '10px',
                    background: '#242526',
                    border: 'none',
                    width: '100vw',
                    height: '100vh'
                }}
                src="https://charts.mongodb.com/charts-test-mongodb-qllsz/embed/dashboards?id=65d75620-7648-4b77-8ba9-617ba2fd0576&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
            ></iframe>
        </div>
    );
}