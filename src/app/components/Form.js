import React, {useEffect, useState} from "react";
import styles from "../css/form.module.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Loader from "./Loader";
export default function Form(props) {
    let [loading, setLoading] = useState(false);
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
    
    
    const getToken = () => {
        let $form = document.getElementById('contactform');
        let formData = new FormData($form);
        let relativeId = formData.get('relativeId');
        let studentId = formData.get('studentId');
        if (!relativeId || !studentId) {
                setInfocontent({infoType: 'warning', title: '', message: 'Por favor, complete todos los campos.'});
                setOpen(true);
                return
        }
        let tokenInput = document.getElementById(styles["token"]);
        setLoading(true);
        fetch('/get-token', {
            method: 'POST',
            body: formData,
        })
        .then( res => res.json())
        .then( data => {
            if (data.successful) {
                let relativeInput = document.getElementById('relative')
                let studentInput = document.getElementById('student')

                let relativeValue = relativeInput.value
                let studentValue = studentInput.value
                
                relativeInput.setAttribute('disabled', '')
                studentInput.setAttribute('disabled', '')
                
                relativeInput.onfocus = (e)=> {
                    relativeInput.setAttribute('disabled', '')
                    e.currentTarget.value = relativeValue
                }

                studentInput.onfocus = (e)=> {
                    studentInput.setAttribute('disabled', '')
                    e.currentTarget.value = studentValue
                }

                tokenInput.classList.remove(styles["hidden"])
                setLoading(false)
                setHandler(SignButton)
                setInfocontent({infoType: 'success', title: 'Token Activado', message: 'Por favor, revisa tu correo electrónico. En caso de no recibir el token, escribenos a matriculas@colegiolosangelestunja.com'})
                setOpen(true)
                return
            }
            else if (data.error) {
                console.error(data.error)
                setLoading(false)
                setInfocontent({infoType: 'error', title: 'Error', message: 'Por favor, inténtelo más tarde.'})
                setOpen(true)
                return
            }
            else if (data.emailerror) {
                console.log(data.emailerror)
                setLoading(false)
                setInfocontent({infoType: 'error', title: 'Email Error', message: 'Por favor, intentelo más tarde.'})
                setOpen(true)
                return
            }
            if (data.refused) {
                setLoading(false)
                setInfocontent({infoType: 'error', title: '', message: 'Acceso Inválido. Por favor, verifica tus datos.'})
                setOpen(true)
            }
        })
        .catch( e => {
            console.log(e)
            setLoading(false)
            setInfocontent({infoType: 'error', title: 'Error de comunicación', message: 'Por favor, comuníquese con soporte.'})
            setOpen(true)
            return
        })
        
    }
    const validateToken = () => {
        let relativeInput = document.getElementById('relative')
        let studentInput = document.getElementById('student')
        relativeInput.removeAttribute('disabled')
        studentInput.removeAttribute('disabled')
        let $form = document.getElementById('contactform');
        let formData = new FormData($form);
        let relativeId = formData.get('relativeId');
        let studentId = formData.get('studentId');
        let token = formData.get('token');
        
        if (!relativeId || !studentId || !token) {
                setInfocontent({infoType: 'warning', title: '', message: 'Por favor, complete todos los campos.'});
                setOpen(true);
                return
        };

        
        let tokenInput = document.getElementById(styles["token"]);
        setLoading(true)
        fetch('/validate-token', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(({token, number, refused}) => {
            console.log(token, number, refused)
            if (refused) {
                setLoading(false)
                setInfocontent({infoType: 'error', title: '', message: 'Acceso Inválido. Por favor, verifica tus datos.'})
                setOpen(true)
                return
            }
            if (token && number) {
                localStorage.setItem('data', JSON.stringify({...token, number}))
                window.location.href = `${window.origin}/signin?id=${token.token}`
                return
            }
        })
        .catch( e => {
            console.log(e)
            setLoading(false)
            setInfocontent({infoType: 'error', title: 'Error de comunicación', message: 'Por favor, comuníquese con soporte.'})
            setOpen(true)
            return
        })
    }
    const TokenButton = <SendButton variant="contained" component="label" sx={{marginTop: "10px"}} onClick={getToken}>Get Token</SendButton>
    const SignButton = <SendButton variant="contained" component="label"  sx={{marginTop: "10px"}} onClick={validateToken}>Sign In</SendButton>

    let [ButtonHandler, setHandler] = useState(TokenButton)
    let [open, setOpen] = useState(false)
    let [infoContent, setInfocontent] = useState("")
    
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
            {
                loading ? <Loader /> : null
            }
            <form className={styles["contact-form"]} id="contactform">
                    <span>
                        <img src="./media/whitelogo.png"/>
                    </span>
                    <span>
                        <label htmlFor="fullname">Documento de identidad (Acudiente)</label>
                        <input type="number" name="relativeId" id="relative" required/>
                    </span>
                    <span>
                        <label htmlFor="text">Documento de identidad (Estudiante)</label>
                        <input type="number" name="studentId" id="student"/>
                    </span>
                    <span className={styles["hidden"]} id={styles["token"]}>
                        <label htmlFor="text">Token</label>
                        <input type="text" name="token" id="token-input"/>
                    </span>
                    <span className={styles["alert-container"]}> 
                        <Collapse in={open}>
                            <Alert severity={infoContent.infoType} action={<IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 1 }}
                            >
                                <AlertTitle><strong>{infoContent.title}</strong> </AlertTitle>
                                {infoContent.message}
                            </Alert>
                        </Collapse>
                    </span>
                    <span>
                        {ButtonHandler}
                    </span>
                    
            </form>
        </div>
    )
}