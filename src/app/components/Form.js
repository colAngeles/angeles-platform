import React, {useEffect} from "react"
import styles from "../css/form.module.css"
import stylesLoader from "../css/loader.module.css"
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button"
export default function Form(props) {
    const SendButton = styled(Button)({
        boxShadow: "none",
        textTransform: "none",
        fontSize: 16,
        padding: "6px 12px",
        color: "rgb(178, 186, 194)",
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
    const handleForm = ()=>{
        const loader = document.querySelector(`.${props["loaderClass"]}`)
        loader.classList.remove(props["loaderHiddenClass"])
        let $form = document.getElementById('contactform')
        let formData = new FormData($form)
        console.log(formData.get('parentId'))
        fetch('/token', {
            method: 'POST',
            body: formData,
        })
        .then( res => res.json())
        .then( data => {
            if(data.conf) {
                console.log(data)
                loader.classList.add(props["loaderHiddenClass"])
                alert(data.conf)
                return
            }
            if(data.refused) {
                loader.classList.add(props["loaderHiddenClass"])
                alert("There was an error")
            }
        })
        
    }
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
            <form className={styles["contact-form"]} id="contactform">
                    <span>
                        <img src="./media/whitelogo.png"/>
                    </span>
                    <span>
                        <label htmlFor="fullname">Documento de identidad (Acudiente)</label>
                        <input type="number" name="parentId" id="fullname" required/>
                    </span>
                    <span>
                        <label htmlFor="text">Documento de identidad (Estudiante)</label>
                        <input type="number" name="studentId" id="email"/>
                    </span>
                    <span className={styles["hidden"]} id={styles["token"]}>
                        <label htmlFor="text">Token</label>
                        <input type="text" name="token" id="token-input"/>
                    </span>
                    <span>
                        <SendButton variant="contained" component="label"  sx={{marginTop: "10px"}} onClick={handleForm}>Get Token</SendButton>
                    </span>
            </form>
        </div>
    )
}