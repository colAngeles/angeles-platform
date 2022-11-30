import React, {useState, useEffect, useRef, use} from 'react';
import useRecorder from '../hooks/useRecorder';
import styles from '../css/speech.module.css';
import stylesCanvas from '../css/signcanvas.module.css';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Fab from '@mui/material/Fab';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SaveIcon from '@mui/icons-material/Save'; 
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.SpeechRecognitionAlternative;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = false;
mic.lang = 'es-ES';

export default function Speech({ getAudio, close, hideButton}) {
    let data = localStorage.getItem('data');
    let objData = JSON.parse(data);
    const dateObj = new Date(objData.createdAt);
    const date = dateObj.getDate();
    const monthNum = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const month = monthNum == 0  ? 'Enero' : monthNum == 1 ? 'Febrero' : monthNum == 2 ? 'Marzo': monthNum == 3 ? 'Abril': monthNum == 4 ? 'Mayo': monthNum == 5 ? 'Junio': monthNum == 6 ? 'Julio': monthNum == 7 ? 'Agosto': monthNum == 8 ? 'Septiembre': monthNum == 9 ? 'Octubre': monthNum == 10 ? 'Noviembre': monthNum == 11 ? 'Diciembre': ''
    let [audio, _, startRecording, stopRecording] = useRecorder();
    const voices = speechSynthesis.getVoices();
    const [isListening, setIsListening] = useState(false);
    const [play, setPlay] = useState(false);
    const [note, setNote] = useState(null);
    const [alertModal, setAlertModal] = useState(false);
    const [infoContent, setInfocontent] = useState("");
    let sound = useRef('');

    useEffect(() => {
        handleListen();
    }, [isListening])

    useEffect(() => {
        if (audio)  {
            sound.current = new Audio(URL.createObjectURL(audio));
            sound.current.onended = () => {
                setPlay(false);
            }
        }
    }, [audio])

    const handleListen = () => {
        if (isListening) {
            startRecording();
            mic.start();
            mic.onend = () => { //Coment
                console.log('end');
            }
            setAlertModal(false)
        }
        else {
            mic.stop();
        }
        mic.onstart = () => {
            console.log('Mics on');
        }
        mic.onresult = event => {
            stopRecording();
            isListening ? setIsListening(false) : null;
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript).join('');
            let speech = new SpeechSynthesisUtterance();
            speech.text = 'El audio ha sido grabado con éxito!';
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            speech.voice = voices[1];
            speechSynthesis.speak(speech);
            setNote(transcript)
            mic.onerror = _ => {
                setInfocontent({infoType: 'error', title: '', message:'El micrófono no responde. Por favor, vuelva a intentarlo.'});
                setAlertModal(true);
            }
        }
    }
    const saveAudio = () => {
        if(audio && note) {
            let re = new RegExp(`HOY${date}\\D*${month.toUpperCase()}...?...${year}\\D*(ACEPT){1}.?LOSTERMINOSCONDICIONESY?CLAUSULASDEL?CONTRATODEPRESTACIONDEL?SERVICIOS?EDUCATIVOS?SUSCRITO..?.?ELCOLEGIOLOSANGELESY?...?PAGAREANEXO.?A?DICHODOCUMENTOAUTORIZ.(AL)|(EL)COLEGIOLOSANGELES..?TRATAMIENTODEMISDATOSPERSONALESDEACUERDOCON(LAS)|(LOS)DISPOSICIONESLEGAL(ES)?`)
            let upperNote = note.toUpperCase();
            let list = upperNote.split(' ');
            let throwAlert = list.reduce((acumulator, word) => {
                                        if (acumulator) return acumulator; 
                                        let conf = ['NO', 'RECHAZO', 'NIEGO', 'DESAUTORIZO'].includes(word);
                                        return conf
                                    }, false)
            if (throwAlert) {
                setInfocontent({infoType: 'warning', title: '', message:'Para continuar se deben aceptar los terminos y condiciones. Por favor, vuelva a leer el texto de verificación.'});
                setAlertModal(true);
                return
            }
            upperNote = upperNote.replaceAll('Á', 'A')
                .replaceAll('É', 'E')
                .replaceAll('Í', 'I')
                .replaceAll('Ó', 'O')
                .replaceAll('Ú', 'U')
                .replaceAll('Ü', 'U')
                .replaceAll(',', ',')
                .replaceAll(' ', '');
                
            if (re.test(upperNote)) {
                getAudio(audio);
                close();
                hideButton(true);
                return
            }
            setInfocontent({infoType: 'warning', title: '', message:'Se han detectado inconcistencias en audio. Por favor, vuelva a leer el texto de verificación.'});
            setAlertModal(true);
            return
        }
        setInfocontent({infoType: 'error', title: '', message:'No se ha detectado ningún dato. Por favor, intentelo de nuevo.'});
        setAlertModal(true);
    }
    return (
            <div className={styles["main-container"]}>
                <div style={{position: 'absolute', right: 0, top: 0}}>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="large"
                            onClick={() => {
                                close();
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                </div>
                <div className={styles["container"]}>
                    <div className={`${styles["box"]} ${styles["instructions"]}`}>
                        <h2>Instrucciones:</h2>
                        <p className={styles["text-content"]}><b>Para que éste proceso sea exitoso por favor tenga en cuenta las siguientes recomendaciónes:</b></p>
                        <p className={styles["text-content"]}>
                            <b>1.</b> Asegúrese de estar en un lugar aislado, libre de ruidos exteriores.<br />
                            <b>2.</b> Para comenzar de clic en ícono del micrófono y lea el texto de verificación en voz alta y clara. La inteligencia artificial detectará cualquier inconsistencia.<br />
                            <b>3.</b> Puede detener la grabación dando en clic en el mismo ícono del micrófono. Si lo desea, puede volver a grabar.<br />
                            <b>4.</b> Podrá escuchar la grabación dando clic en ícono de reproducción, éste estará visible una vez haya grabado el audio.<br />
                        </p>
                    </div>
                    {
                        audio ? (
                            <div className={styles['play-button']}>
                                <IconButton 
                                    color='primary' 
                                    onClick={() => {
                                        !play ? sound.current.play() : sound.current.pause()
                                        setPlay(prevState => !prevState);
                                    }}
                                >
                                    {
                                        !play ? <PlayCircleIcon sx={{fontSize:'3.5rem'}}/> : <PauseCircleIcon sx={{fontSize:'3.5rem'}} />
                                    }
                                </IconButton>
                            </div>
                        ): null
                    }
                    <div className={styles["box"]}>
                        <h2 style={{textAlign: 'center'}}>Texto de Verificación</h2>
                        <p className={styles["text-content"]}>
                            Hoy {date} de {month} del año {year} acepto los términos, condiciones y cláusulas del contrato de prestación del servicio educativo suscrito con el Colegio Los Ángeles, y del pagaré anexo a dicho documento. Autorizo al Colegio Los Ángeles al tratamiento de mis datos personales, de acuerdo con las disposiciones legales.
                        </p>
                    </div>
                </div>
                <div className={stylesCanvas["alert-container"]}>
                        <Collapse in={alertModal}>
                            <Alert severity={infoContent.infoType}action={<IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setAlertModal(false);
                                    }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 1 }}
                            >
                                <AlertTitle><strong>{infoContent.title}</strong></AlertTitle>
                                {infoContent.message}
                            </Alert>
                        </Collapse>
                </div>
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1 } , display:'flex', justifyContent: 'center'}}>
                        <Fab color="primary" sx={{backgroundColor: "#1B3764", color: '#fff', "&:hover": "28559A"}} aria-label="add" onClick={() => setIsListening(prevState => !prevState)}>
                                {isListening ? <MicIcon sx={{animation: 'mic 1s infinite linear'}} /> : <MicOffIcon />} 
                        </Fab>
                        <Fab color="primary" sx={{backgroundColor: "#1B3764", color: '#fff', "&:hover": "28559A"}} aria-label="add" onClick={saveAudio}>
                            <SaveIcon />
                        </Fab>
                    </Box>
                </div>
                
            </div>
    )
}