import React from 'react';
import styles from '../css/footer.module.css';
export default function Footer() {
        return (
            <footer>
                <div className={styles['logo-container']}>
                    <img src='./media/logo.png'/>
                </div>
                <div className={styles['address-container']}>
                    <h3>Sede Principal</h3>
                    <p>Calle 73A No. 2-02 E Altos de la Arboleda Tunja, Boyacá – Colombia</p>
                </div>
                <div className={styles['numbers-container']}>
                    <h3>Teléfonos:</h3>
                    <p>304 3808353</p>
                    <p>301 3641078</p>
                    <p>313 8515734</p>
                </div>
                <div className={styles['logos-container']}>
                    <img src='./media/ib.png'/>
                    <img src='./media/efqm.png'/>
                </div>
            </footer>
        )
}