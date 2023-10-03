import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HTMLReactParser from "html-react-parser";

const CardItem = ({data}) => {
    const getDate = new Date(data.createdAt);
    const date = getDate.getDate();
    const getDay = getDate.getDay();
    const getMonth = getDate.getMonth();
    const year = getDate.getFullYear();
    const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = dayName[getDay];
    const month = monthName[getMonth]
    return(
        <Link to={`/note/${data.id}`}  style={{ textDecoration: 'none' }}>
        <div className="card">
            <div className="container">
                <div className="card-header">
                <h4 className="card-title">{data.title}</h4>
                <p className="card-date">{day}, {date} {month} {year}</p>
                </div>
                <div className="card-body">
                <p className="card-desc">{HTMLReactParser(data.body)}</p>
                </div>
            </div>
        </div>
        </Link>
    )
}

CardItem.propTypes = {
    data : PropTypes.object.isRequired
}

export default CardItem;