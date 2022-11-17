import React, { useEffect, useRef, useState } from "react";
import 'reactjs-popup/dist/index.css';
import '../css/modal.css'
import styles from '../css/sign.module.css';
import Popup from 'reactjs-popup';
import SignatureCanvas from 'react-signature-canvas';
import IconButton from '@mui/material/IconButton';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import stylesCanvas from '../css/signcanvas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import Snackbar from '@mui/material/Snackbar';
import Speech from "./Speech";
export default function Sign(props) {
    const MyButton = styled(Button)({
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
    const MyIconButton = styled(IconButton)({
        backgroundColor: 'rgb(66, 165, 245)',
        color: '#fff',
        width: '58px', 
        height: '58px',
        "&:hover": {
            backgroundColor: 'rgb(50, 138, 210)',
        },
        "&:disabled": {
            backgroundColor: 'rgb(45 44 44 / 12%)',
        }
    });
    const [mic, setMic] = useState(false);
    const [alertCanvas, setAlertCanvas] = useState(false);
    const [showSignButton, setShowSignButton] = useState(true);
    const [showAudioButton, setShowAudioButton] = useState(true);
    const [openSnack, setOpenSnack] = useState(false);
    const [infoContent, setInfocontent] = useState("");
    const [audio, setAudio] = useState('')
    const canvas = useRef({});
    useEffect(() => {
        if (!audio) return
        props.setAudio(audio);
    }, [audio])
    useEffect(() => {
        if (!showAudioButton) props.showButton(true);
    }, [showAudioButton])
    const tryAgain = () => {
            canvas.current.clear()
    }
    const saveSign = (close) => {
        let isEmpty = canvas.current.isEmpty();
        if (isEmpty) {
            setAlertCanvas(true);
            return
        }
        const url = canvas.current.getTrimmedCanvas().toDataURL('image/png');
        setShowSignButton(false);
        setMic(true);
        props.setSign(url);
        close();
        setInfocontent({infoType: 'success', title: '', message: 'Firma guardada exitosamente! Por favor, continue con el siguiente paso.'});
        setOpenSnack(true);
        setTimeout(() => {
            setOpenSnack(false)
        }, 6000);
    }
    return (
        <div className={styles['main-container']}>
                {
                    showSignButton ? (
                        <Popup modal nested closeOnDocumentClick={false} trigger={<MyIconButton color="primary" aria-label="sign"><FontAwesomeIcon icon={faPenToSquare} size='xs' /></MyIconButton>} position="right center">
                            { close => (
                                <>
                                    <SignatureCanvas ref={canvas}  minDistance={1} throttle={10} canvasProps={{className: stylesCanvas['sign-canvas']}} />
                                    <div className={stylesCanvas["alert-container"]}>
                                        <Collapse in={alertCanvas}>
                                            <Alert severity="warning" action={<IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setAlertCanvas(false);
                                                    }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 1 }}
                                            >
                                                <AlertTitle><strong>Campo vacio</strong> </AlertTitle>
                                                No se ha detectado una firma. Por favor, intentelo de nuevo.
                                            </Alert>
                                        </Collapse>
                                    </div>
                                    <div className={stylesCanvas["options-container"]}>
                                        <MyButton variant="contained" component="label" sx={{marginTop: "10px"}} onClick={tryAgain}>
                                            <FontAwesomeIcon icon={faRotateRight} size='xs' />&nbsp;Firmar de nuevo
                                        </MyButton>
                                        <MyButton variant="contained" component="label" sx={{marginTop: "10px"}} onClick={saveSign.bind(null, close)}>
                                            <SaveIcon /> Guardar
                                        </MyButton>
                                        <MyButton variant="contained" component="label" sx={{marginTop: "10px"}} onClick={close}>
                                            Cerrar <CloseIcon />
                                        </MyButton>
                                    </div>
                                </>
                            )
                            }
                        </Popup>
                    ): null
                }
                
                {
                   showAudioButton ? (
                    <Popup modal={mic} contentStyle={{width: '80%'}} closeOnDocumentClick={false}  trigger={<MyIconButton color="primary" disabled={mic ? false: true} aria-label="edit"><RecordVoiceOverIcon /></MyIconButton>} position="right center">
                        { close => (
                            !mic ? <div>Por favor, diligencie la firma para habilitar esta opción.</div>
                            : (
                                <Speech getAudio={(blob) => {
                                    setAudio(blob);
                                }} close={close} openSnack={(value, infoType, title, message, hideButtom) => {
                                    setInfocontent({infoType, title, message});
                                    setOpenSnack(value);
                                    if (hideButtom) setShowAudioButton(false);
                                }}/>
                            )
                        )
                        }
                    </Popup>) : null
                }
                <Snackbar open={openSnack} >
                    <Alert severity={infoContent.infoType} sx={{ width: '100%' }}>
                        {infoContent.message}
                    </Alert>
                </Snackbar>
        </div>
    )
}