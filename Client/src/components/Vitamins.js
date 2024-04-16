import React from 'react';
import styles from '../static/Vitamins.module.css';
//import '../styles/tailwind.css';
function Vitamins(props) {
    const imagePath = `/assets/images/${props.vitamin.replace(/\s/g, '')}.jpg`;

    return (
        <div className={styles.container}>
            <img className={styles.img} src={imagePath} />
            <section className={styles.info}>
                <h2>{props.vitamin}</h2>
                <p>{props.data}</p>
                <p>{props.description}</p>
            </section>
        </div>
    );
} 

export default Vitamins
