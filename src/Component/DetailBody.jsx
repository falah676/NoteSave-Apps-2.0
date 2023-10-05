import React from "react";
import PropTypes from "prop-types";
import Parser from 'html-react-parser';


const DetailBody = ({data}) => {
    const getDate = new Date(data.createdAt);
    const date = getDate.getDate();
    const getDay = getDate.getDay();
    const getMonth = getDate.getMonth();
    const year = getDate.getFullYear();
    const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = dayName[getDay];
    const month = monthName[getMonth];
    return(
        <div className="container">
            <h1 className="title-detail">{data.title}</h1>
            <p className="date-detail">{day}, {date} {month} {year}</p>
            <p className="desc-detail">{Parser(data.body)}</p>
        </div>
    )
    console.log(data);
}
DetailBody.propTypes = {
    data: PropTypes.object.isRequired
}
export default DetailBody;