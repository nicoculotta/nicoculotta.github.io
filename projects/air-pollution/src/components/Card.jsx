import React from 'react'

const Card = (props) => {
    return (
        <div className="card__item">
            <p className="card__tag">{props.tag}</p>
            <h4 className="card__number">{props.number}</h4>
            <p className="card__name">{props.name}</p>
        </div>
    )
}

export default Card;
