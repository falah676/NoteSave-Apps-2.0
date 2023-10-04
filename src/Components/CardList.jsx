import React from "react";
import CardItem from "./CardItem";
import PropTypes from 'prop-types';

const CardList = ({notes}) => {
    return(
    <section className="card-list">
        <div className="container-card">
            {
                notes.map((note, index) =>{
                    return (
                        <CardItem key={note.id} data={note}/>
                    )
                })
            }
        </div>
    </section>
    )
}

CardList.propTypes = {
    notes: PropTypes.array.isRequired
}
export default CardList;