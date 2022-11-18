import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { BlobProvider } from '@react-pdf/renderer';
import SliderView from './components/SliderView';
import RenderDocuments from './components/RenderDocuments.js';
import Sign from './components/Sign';
import Doc from './components/Doc';
import Promissorynote from './components/Promissorynote';
import Button from '@mui/material/Button';
import styles from './css/contract.module.css'
function Contract() {
    const [signURL, setSignURL] = useState(null);
    const [contractLoaded, setContractLoaded] = useState(false);
    const [promissoryLoaded, setPromissoryLoaded ] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [showMainButton, setShowMainButton] = useState(false);
    const [contractBlob, setContractBlob] = useState(null);
    const [promisePayBlob, setPromiseBlob] = useState(null);
    let formData = new FormData()
    let saveData = () => {
        formData.set("contract", contractBlob, "contract.pdf");
        formData.set("promissorynote", promisePayBlob, "promissorynote.pdf");
        let pdf = formData.get('contract');
        let audio = formData.get('audio');
        if (!pdf || !audio) {
            console.error('Pdf or Audio empty');
            return
        }
        fetch('/save-data', {
            method: 'POST',
            body: formData,
        })
        .then( res => res.json())
        .then( data => {
            if (data.successful) {
                console.log(data);
                return
            }
            else if (data.error) {
                console.log(data.error);
                return
            }
        })
        .catch( e => {
            console.log(e);
            return
        })
    }
    let sliderviewContent = [
        {
            title: 'Matriculas 2023', 
            description: 'En éste panel podrá encontrar las instrucciones que debera seguir para realizar el proceso de matricula de manera exitosa. Para ver cada una de ellas por favor utilice los botenes de paginación, ubicados el parte inferior.\nEn cualquier moneto puede puede dar clic en COMENZAR para diligenciar los documentos.', 
            image: './media/01.jpg'
        },
        {
            title: 'Instalación y Monitoreo de Alarmas',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem quas, aut nisi distinctio minus adipisci cumque nesciunt doloribus laboriosam eveniet, maiores inventore assumenda nihil. Quaerat reprehenderit modi consectetur iste animi!', 
            image: './media/02.jpg'
        },
        {
            title: 'Venta e instalación de cámaras',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem quas, aut nisi distinctio minus adipisci cumque nesciunt doloribus laboriosam eveniet, maiores inventore assumenda nihil. Quaerat reprehenderit modi consectetur iste animi!', 
            image: './media/03.jpg'
        },
        {
            title: 'Video Vigilancia',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem quas, aut nisi distinctio minus adipisci cumque nesciunt doloribus laboriosam eveniet, maiores inventore assumenda nihil. Quaerat reprehenderit modi consectetur iste animi!', 
            image: './media/04.jpg'
        },
    ]
    
    useEffect(() => {
        if(audioURL) {
            formData.set('audio', audioURL, 'audio.weba');
            console.log("The job is done!");
        }
    }, [audioURL])
    return (
        <>  
            <div style={{backgroundColor: '#162F54'}}>
                <SliderView content={sliderviewContent}/>
            </div>
            <div className={styles["files-container"]} id="documents">
                <RenderDocuments/>
                <Sign setSign={(url)=>{
                    setSignURL(url);
                }} setAudio={(blob) => {
                    setAudioURL(blob);
                }} showButton={(value) => setShowMainButton(value)}/>
                {
                    signURL  && !contractLoaded ? (
                    <>
                        <BlobProvider document={<Doc signURL={signURL}/>}>
                            {({ blob }) => {
                                if (blob) {
                                    setContractBlob(blob);
                                    setContractLoaded(true);
                                }
                            }}
                        </BlobProvider>
                    </>
                    
                    ): null
                }
                {
                    signURL  && !promissoryLoaded ? (
                    <>
                        <BlobProvider document={<Promissorynote signURL={signURL}/>}>
                            {({ blob }) => {
                                if (blob) {
                                    setPromiseBlob(blob);
                                    setPromissoryLoaded(true);
                                }
                            }}
                        </BlobProvider>
                    </>
                    
                    ): null
                }
                {
                    showMainButton ? (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "10px"}}>
                            <Button variant="contained" component="label" onClick={saveData}>ENVIAR DATOS</Button>
                        </div>
                    ) : null
                }
            </div>
            
           
            
        </>
    )
}
render(<Contract/>, document.querySelector('body'))