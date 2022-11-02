import React from "react"
import styles from '../css/loader.module.css'
export default function Loader(){
    return(
        <div className={styles['background-load']}>
            <div class={styles['content-load']}>
                <div class={`${styles['circule']} ${styles['circule-one']}`}>
                    Loading
                    <b>.</b>
                    <b>.</b> 
                    <b>.</b>
                </div>
                <div class={`${styles['circule']} ${styles['circule-two']}`}> 
                </div>
            </div>
        </div>
    )
}