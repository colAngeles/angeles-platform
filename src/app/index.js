import React from "react"
import {render} from "react-dom"
import Card from "./components/Card"
import Button from "@mui/material/Button"
import styles from "./css/index.module.css"
function Index(params) {
    return(
        <>
            <main>
                <Card/>
                <div className={styles["grid-item"]}>
                    <form className={styles["contact-form"]} name="contact" id="contact-form">
                            <span>
                                <label htmlFor="fullname">Nombre Completo</label>
                                <input type="text" name="fullname" id="fullname"/>
                            </span>
                            <span>
                                <label htmlFor="email">Correo Electrónico</label>
                                <input type="email" name="email" id="email"/>
                            </span>
                            <span>
                                <label htmlFor="phone">Teléfono</label>
                                <input type="tel" name="phone" id="phone"/>
                            </span>
                            <span>
                                <label>Mensaje</label>
                                <textarea className='input-item'  cols="1" rows="1"  spellCheck="true"></textarea>
                            </span>
                            <span>
                                <Button variant="contained" component="label" sx={{marginTop: "10px"}}>Enviar</Button>
                            </span>
                    </form>
                </div>
            </main>

        </>

        
    )
}
render(<Index/>, document.querySelector('body'))