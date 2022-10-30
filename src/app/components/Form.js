import React, {useEffect} from "react"
import styles from "../css/form.module.css"
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button"
export default function Form() {
    const SendButton = styled(Button)({
        boxShadow: "none",
        textTransform: "none",
        fontSize: 16,
        padding: "6px 12px",
        lineHeight: 1.5,
        backgroundColor: "#1B3764",
        borderColor: "#0063cc",
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(","),
        "&:hover": {
          backgroundColor: "#162F54",
          borderColor: "#ffffff70",
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none",
          backgroundColor: "#ffffff70",
          borderColor: "#ffffff70",
          color: "#fff"
        },
        "&:focus": {
          boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 0.438)"
        }
      });
    const handleResize = ()=> {
        let $form = document.querySelector(`.${styles['contact-form']}`)
        let minHeight = $form.getBoundingClientRect().width
        $form.style.minHeight = `${minHeight}px`
    }
    window.addEventListener('resize', handleResize)
    useEffect(()=>{
        let $form = document.querySelector(`.${styles['contact-form']}`)
        let minHeight = $form.getBoundingClientRect().width
        $form.style.minHeight = `${minHeight}px`
        return ()=> {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <div className={styles["form-container"]}>
            <form className={styles["contact-form"]} name="contact" id="contact-form">
                    <span>
                        <img src="./media/whitelogo.png"/>
                    </span>
                    <span>
                        <label htmlFor="fullname">Documento de identidad (Acudiente)</label>
                        <input type="number" name="fullname" id="fullname"/>
                    </span>
                    <span>
                        <label htmlFor="text">Documento de identidad (Estudiante)</label>
                        <input type="number" name="email" id="email"/>
                    </span>
                    <span>
                        <SendButton variant="contained" component="label"  sx={{marginTop: "10px"}} onClick={()=>{
                            console.log("This is a test")
                        }}>Get Token</SendButton>
                    </span>
            </form>
        </div>
    )
}