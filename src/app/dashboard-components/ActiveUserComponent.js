import React, { useEffect, useState, useRef } from "react";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ListItemButton from '@mui/material/ListItemButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CircularProgress from '@mui/material/CircularProgress';
export default function Student({ value, index, labelId, setSnack }) {
    let [play, setPlay] = useState();
    let [audio, setAudio] = useState(null);
    let [loading, setLoading] = useState(false);
    let sound = useRef(null);
    let handleDisapprove = () => {
        setLoading(true);
        let person = value.parents.mother.identification.id == value.person ? value.parents.mother
        : value.parents.father.identification.id == value.person ? value.parents.father
        : value.relative.identification.id == value.person ? value.relative: null;
        let formData = new FormData();
        formData.set('person', JSON.stringify(person));
        formData.set('files', JSON.stringify(value.pathFiles));
        formData.set('identification', JSON.stringify(value.identification.id));
        fetch('/disapprove', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.status == 404 || res.status == 500) {
                alert('No se ha podido guardat los datos. Por favor, inténtelo más tarde.');
                return
            }
            return res.json()
        })
        .then( ({ success, emailerror, usererror, dberror, sendmail }) => {
            if (success) {
                let item = document.getElementById(value.identification.id);
                item.style.display = 'none';
                setSnack(true, {message: 'Estado actualizado con éxito!', severity: 'success'})
                setTimeout(() => {
                    setSnack(false)
                }, 6500);
            }
            if ( emailerror ) {
                setSnack(true, {message: 'No se ha podido enviar el correo electrónico. Por favor, inténtelo más tarde.', severity: 'error'})
                setTimeout(() => {
                    setSnack(false)
                }, 6500);
                return
            }
            if (usererror) {
                setSnack(true, {message: 'El usuario no ha sido encontrado', severity: 'error'})
                setTimeout(() => {
                    setSnack(false)
                }, 6500);
                return
            }
            if ( dberror ) {
                setSnack(true, {message: 'Ha ocurrido un error de conexion con base de datos. Por favor, inténtelo más tarde.', severity: 'error'})
                setTimeout(() => {
                    setSnack(false)
                }, 6500);
                return
            }
            if ( sendmail ) {
                alert(`El usuario ha sido desaprobado, pero no ha sido posible enviar el correo de notificación al usuario. Por favor, envíelo a: ${person.email} `);
            }
        })
        .catch( e => {
            setLoading(false);
            setSnack(true, {message: 'Error de comunicación. Por favor, inténtelos más tarde.', severity: 'error'});
            setTimeout(() => {
                setSnack(false)
            }, 6500);
        })
    }
    let downloadContract = () => {
        fetch (`/download-file?filename=${value.pathFiles.contract}`)
        .then(res => {
            if (res.status == 404 || res.status == 500) {
                alert('No se ha podido descargar el documento. Por favor, inténtelo más tarde.');
                return
            }
            return res.blob()
        })
        .then( file => {
            let link = document.createElement('a');
            link.download = `C_${value.surname.split(' ')[0]}_${value.name.split(' ')[0]}_${value.identification.id}.pdf`;
            link.href = URL.createObjectURL(file);
            link.click();
            URL.revokeObjectURL(link.href);
        })
    }
    let downloadPromissorynote = () => {
        fetch (`/download-file?filename=${value.pathFiles.promissorynote}`)
        .then(res => {
            if (res.status == 404 || res.status == 500) {
                alert('No se ha podido descargar el documento. Por favor, inténtelo más tarde.');
                return
            }
            return res.blob()
        })
        .then( file => {
            let link = document.createElement('a');
            link.download = `P_${value.surname.split(' ')[0]}_${value.name.split(' ')[0]}_${value.identification.id}.pdf`;
            link.href = URL.createObjectURL(file);
            link.click();
            URL.revokeObjectURL(link.href);
        })
    }
    let loadAudio = () => {
        console.log("loading Audio")
        if (!audio) {
            fetch (`/get-audio?name=${value.pathFiles.audio}`)
            .then(res => res.blob())
            .then(audio => {
                if (audio) {
                    setAudio(audio);
                    setPlay(true);
                    sound.current = new Audio(URL.createObjectURL(audio));
                    sound.current.onended = () => {
                        setPlay(false);
                    }
                    sound.current.play();
                    setPlay(true);
            }
            })
            .catch(err => {
                alert('Se ha producido un error al tratar de cargar el audio.');
            })
        }
    }
    let handlePlay = () => {
        console.log("handle Audio")
        !play ?  sound.current.play() : sound.current.pause();
        setPlay(prev => !prev)
    }
    useEffect(() => {

        return () => {
            try {
                sound.current.pause();
            }
            catch (e) {

            }
        }
    }, [])
    return (
        <>
            {
                loading ? <div style={{height: '100%', display: 'flex', justifyContent: 'center'}}><CircularProgress /></div> : (
                    <ListItem
                        sx={{borderTop: '0.5px solid rgba(45, 55, 72, 0.2)', borderBottom: '0.5px solid rgba(45, 55, 72, 0.2)', height: '80px' }}
                        key={index + 1}
                        disablePadding
                    >
                        <ListItemButton role={undefined}  sx={{display: 'grid', gridTemplateColumns: '50% 1fr auto', overflowX: 'scroll'}}>
                            <span>
                            <ListItemIcon>
                                <Checkbox
                                sx={{color: 'rgb(156, 163, 175)'}}
                                edge="start"
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                                    </ListItemIcon>
                                {value.name} {value.surname}  {value.grade}
                            </span>
                            <span style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                <ListItemIcon sx={{display: 'flex', alignItems: 'center', color: '#fff'}}>
                                    Audio
                                    <IconButton 
                                        sx={{color: 'rgb(156, 163, 175)'}}
                                        onClick={!sound.current ? loadAudio: handlePlay}
                                    >
                                        {
                                            !play ? <PlayCircleIcon sx={{fontSize:'2rem'}}/> : <PauseCircleIcon sx={{fontSize:'2.5rem'}} />
                                        }
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemIcon sx={{display: 'flex', alignItems: 'center', color: '#fff'}} >
                                    Contrato
                                    <IconButton 
                                        onClick={downloadContract}
                                        sx={{color: 'rgb(156, 163, 175)'}}
                                    >
                                        <PictureAsPdfIcon sx={{fontSize:'2rem'}}/>
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemIcon sx={{display: 'flex', alignItems: 'center', color: '#fff'}}>
                                    Pagare
                                    <IconButton 
                                        color='primary' 
                                        onClick={downloadPromissorynote}
                                        sx={{color: 'rgb(156, 163, 175)'}}
                                    >
                                        <PictureAsPdfIcon sx={{fontSize:'2rem'}}/>
                                    </IconButton>
                                </ListItemIcon>
                            </span>
                            <span>
                                <Button variant="outlined" sx={{ mr: 1}} color="error" onClick={handleDisapprove}>
                                    <ClearIcon />
                                </Button>
                            </span>
                            
                        </ListItemButton>
                    </ListItem>
                )
            }
            

        </>
)
}