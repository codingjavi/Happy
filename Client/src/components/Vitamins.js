import React from 'react'

function Vitamins(props) {
    //load picture
    //maybe use section insetad of div
    const imagePath = `/assets/images/${props.vitamin.replace(/\s/g, '')}.jpg`
    //const imagePath = "/assets/images/ReGenerZyme%20Heart.jpg"
    return (
        <div>
            <img src={imagePath} />
            <section>
                {props.vitamin}
                {props.data}
                {props.description}
            </section>
        </div>
    )
}

export default Vitamins
