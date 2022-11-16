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

export default function Speech({ getAudio, close, openSnack}) {
    let [audio, isRecording, startRecording, stopRecording] = useRecorder();

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
            // mic.onend = () => {
            //     console.log('end');
            // }
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
            mic.onerror = event => {
                setInfocontent({infoType: 'error', title: '', message:'El micrófono no responde. Por favor, vuelva a intentarlo.'});
                setAlertModal(true);
            }
        }
    }
    const saveAudio = () => {
        if(audio && note) {
            let upperNote = note.toUpperCase();
            let list = upperNote.split(' ');
            let throwAlert = list.reduce((acumulator, word) => {
                                        if (acumulator) return acumulator; 
                                        let conf = ['NO', 'RECHAZO', 'NIEGO', 'DESAUTORIZO'].includes(word);
                                        return conf
                                    }, false)
            if (throwAlert) {
                setInfocontent({infoType: 'warning', title: '', message:'Verificación de audio fallida. Por favor, leea el texto de verificación.'});
                setAlertModal(true);
                return
            }
            getAudio(audio);
            close();
            openSnack(true, 'success', '', 'Audio guardado exitosamente!', true);
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
                    <div className={styles["box"]}>
                        <h2>Tolo Current Note</h2>
                        <p>{note}</p>
                    </div>
                    {
                        audio ? (
                            <div className={styles['play-button']}>
                                <IconButton color='primary' onClick={() => {
                                    !play ? sound.current.play() : sound.current.pause()
                                    setPlay(prevState => !prevState);
                                    }}>
                                    {
                                        !play ? <PlayCircleIcon sx={{fontSize:'3.5rem'}}/> : <PauseCircleIcon sx={{fontSize:'3.5rem'}} />
                                    }
                                </IconButton>
                            </div>
                        ): null
                    }
                    <div className={styles["box"]}>
                        <h2>Texto de Verificación</h2>
                        <p>{note}</p>
                    </div>
                </div>
                <div className={stylesCanvas["alert-container"]}>
                        <Collapse in={alertModal}>
                            <Alert severity={infoContent.infoType}action={<IconButton
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