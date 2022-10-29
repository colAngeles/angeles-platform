import React from "react"
import styles from "../css/form.module.css"
import Button from "@mui/material/Button"
export default function Form() {

    return (
        <div className={styles["form-container"]}>
            <form className={styles["contact-form"]} name="contact" id="contact-form">
                    <span>
                        <label htmlFor="fullname">Documento de identidad (Acudiente)</label>
                        <input type="text" name="fullname" id="fullname"/>
                    </span>
                    <span>
                        <label htmlFor="text">Documento de identidad (Estudiante)</label>
                        <input type="email" name="email" id="email"/>
                    </span>
                    <span>
                        <label htmlFor="phone">Teléfono</label>
                        <input type="tel" name="phone" id="phone"/>
                    </span>
                    <span>
                        <label htmlFor="phone">Teléfono</label>
                        <input type="tel" name="phone" id="phone"/>
                    </span>
                    <span>
                        <Button variant="contained" component="label" sx={{marginTop: "10px"}}>Enviar</Button>
                    </span>
            </form>
        </div>
    )
}