import React from "react";
import styles from "../css/input.module.css";

export default function Input({ type='text', variant='', name='text', placeholder, color="#fff", defaultValue='C.C' }) {
    if (variant == 'doc') {
        return (
            <span className={`${styles["input-container"]} ${styles["identification"]}`} style={{color: color}}>
                <input id={name} type={type} name={name}  required />
                <select name={`${name}type`} defaultValue={defaultValue}>
                    <option value="C.C.">C.C.</option>
                    <option value="C.E.">C.E.</option>
                    <option value="NUIP">NUIP</option>
                    <option value="PASAPORTE">PASAPORTE</option>
                    <option value="R.C.">R.C.</option>
                    <option value="T.I.">T.I.</option>
                </select>
                <label  htmlFor={name}>{placeholder}</label>
            </span>
        )
    }
    
    return (
        <span className={styles["input-container"]} style={{color: color}}>
            <input id={name} type={type} name={name}  required />
            <label  htmlFor={name}>{placeholder}</label>
        </span>
    )
}