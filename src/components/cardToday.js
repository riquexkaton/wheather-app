import React from 'react'
import "../styles/cardtoday.css"

const CardToday = (props) => {
    return (
        <div className="card-today">
            <img src={props.img} alt=""></img>
            <div className="card-today-info">
                <p>{props.title}</p>
                <h3>{props.value}</h3>
            </div>
        </div>
    )
}

export default CardToday
