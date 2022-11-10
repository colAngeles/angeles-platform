import React, {useEffect, useState} from "react";
import styles from "../css/form.module.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Form(props) {
    let repeatSize = 0
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
    const repeat = ()=> {
        let $form = document.getElementById('contactform')
        let formData = new FormData($form)
        const loader = document.querySelector(`.${props["loaderClass"]}`)
        let tokenInput = document.getElementById(styles["token"])
        repeatSize += 1
        console.log('repeatSize: ', repeatSize)
        if (repeatSize > 3) {
            loader.classList.add(props["loaderHiddenClass"])
            setInfocontent({infoType: 'info', title: 'Solicitud No Procesada', message: 'Por favor, inténtelo más tarde.'})
            setOpen(true)
            return
        }
        fetch('/get-token', {
            method: 'POST',
            body: formData,
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
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
                loader.classList.add(props["loaderHiddenClass"])
                setHandler(SignButton)
                setInfocontent({infoType: 'success', title: 'Token Activado', message: 'Por favor, revisa tu correo electrónico.'})
                setOpen(true)
                return
            }
            else if (data.error) {
                console.log(data.error)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Error', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.stderr) {
                console.log(data.stderr)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Stderr', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.emailerror) {
                console.log(data.emailerror)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Email Error', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.repeat) {
                setTimeout(repeat, 10000)
            }
            if (data.refused) {
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: '', message: 'Acceso Inválido. Por favor, verifica tus datos.'})
                setOpen(true)
            }
        })
        .catch( e => {
            console.log(e)
            loader.classList.add(props["loaderHiddenClass"])
            setInfocontent({infoType: 'error', title: 'Error de comunicación', message: 'Por favor, comuníquese con soporte.'})
            setOpen(true)
            return
        })
    }
    
    const handleToken = () => {
        let $form = document.getElementById('contactform')
        let formData = new FormData($form)
        let relativeId = formData.get('relativeId')
        let studentId = formData.get('studentId')
        if (!relativeId || !studentId) {
                setInfocontent({infoType: 'warning', title: '', message: 'Por favor, complete todos los campos.'})
                setOpen(true)
                return
        }
        const loader = document.querySelector(`.${props["loaderClass"]}`)
        let tokenInput = document.getElementById(styles["token"])
        loader.classList.remove(props["loaderHiddenClass"])
        
        fetch('/get-token', {
            method: 'POST',
            body: formData,
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
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
                loader.classList.add(props["loaderHiddenClass"])
                setHandler(SignButton)
                setInfocontent({infoType: 'success', title: 'Token Activado', message: 'Por favor, revisa tu correo electrónico.'})
                setOpen(true)
                return
            }
            else if (data.error) {
                console.log(data.error)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Error', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.stderr) {
                console.log(data.stderr)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Stderr', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.emailerror) {
                console.log(data.emailerror)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Email Error', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.repeat) {
                setTimeout(repeat, 10000)
            }
            if (data.refused) {
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: '', message: 'Acceso Inválido. Por favor, verifica tus datos.'})
                setOpen(true)
            }
        })
        .catch( e => {
            console.log(e)
            loader.classList.add(props["loaderHiddenClass"])
            setInfocontent({infoType: 'error', title: 'Error de comunicación', message: 'Por favor, comuníquese con soporte.'})
            setOpen(true)
            return
        })
        
    }
    const handleSignin = () => {
        let $form = document.getElementById('contactform')
        let formData = new FormData($form)
        let relativeId = formData.get('relativeId')
        let studentId = formData.get('studentId')
        if (!relativeId || !studentId) {
                setInfocontent({infoType: 'warning', title: '', message: 'Por favor, complete todos los campos.'})
                setOpen(true)
                return
        }
        const loader = document.querySelector(`.${props["loaderClass"]}`)
        let tokenInput = document.getElementById(styles["token"])
        loader.classList.remove(props["loaderHiddenClass"])
        
        fetch('/signin', {
            method: 'POST',
            body: formData,
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
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
                loader.classList.add(props["loaderHiddenClass"])
                setHandler(SignButton)
                setInfocontent({infoType: 'success', title: 'Token Activado', message: 'Por favor, revisa tu correo electrónico.'})
                setOpen(true)
                return
            }
            else if (data.error) {
                console.log(data.error)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Error', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.stderr) {
                console.log(data.stderr)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Stderr', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.emailerror) {
                console.log(data.emailerror)
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: 'Email Error', message: 'Por favor, comuníquese con soporte.'})
                setOpen(true)
                return
            }
            else if (data.repeat) {
                setTimeout(repeat, 10000)
            }
            if (data.refused) {
                loader.classList.add(props["loaderHiddenClass"])
                setInfocontent({infoType: 'error', title: '', message: 'Acceso Inválido. Por favor, verifica tus datos.'})
                setOpen(true)
            }
        })
        .catch( e => {
            console.log(e)
            loader.classList.add(props["loaderHiddenClass"])
            setInfocontent({infoType: 'error', title: 'Error de comunicación', message: 'Por favor, comuníquese con soporte.'})
            setOpen(true)
            return
        })
    }
    const TokenButton = <SendButton variant="contained" component="label" sx={{marginTop: "10px"}} onClick={handleToken}>Get Token</SendButton>
    const SignButton = <SendButton variant="contained" component="label"  sx={{marginTop: "10px"}} onClick={handleSignin}>Sign In</SendButton>

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