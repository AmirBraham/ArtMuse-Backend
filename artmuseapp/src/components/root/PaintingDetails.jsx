import React from 'react'


const PaintingDetails = ({ artistDisplayName,
    objectEndDate,
    objectBeginDate,
    title,
    collection }) => {
    return <div>
        <h1>
            {title}
        </h1>
        <h4>
            {artistDisplayName}
        </h4>
        <h4>
            {objectBeginDate + "-"+ objectEndDate}
        </h4>
    </div>
}

export default PaintingDetails