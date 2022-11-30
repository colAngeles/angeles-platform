import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import { BlobProvider } from '@react-pdf/renderer';
import SliderView from './components/SliderView';
import RenderDocuments from './components/RenderDocuments.js';
import Loader from './components/Loader';
import Sign from './components/Sign';
import Doc from './components/Doc';
import Promissorynote from './components/Promissorynote';
import Button from '@mui/material/Button';
import styles from './css/contract.module.css';
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import { ReactQueryDevtools } from 'react-query/devtools';
import Footer from './components/Footer';
const queryClient = new QueryClient();

function Contract() {
    const [signURL, setSignURL] = useState(null);
    const [contractLoaded, setContractLoaded] = useState(false);
    const [promissoryLoaded, setPromissoryLoaded ] = useState(false);
    const [audio, setAudio] = useState(null);
    const [showMainButton, setShowMainButton] = useState(false);
    const [contractBlob, setContractBlob] = useState(null);
    const [promisePayBlob, setPromiseBlob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(true);
    const sources = useRef([]);
    let formData = new FormData();
    let saveData = () => {
        let data =  JSON.parse(localStorage.getItem('data'));
        formData.set('audio', audio, 'audio.weba');
        formData.set("contract", contractBlob, "contract.pdf");
        formData.set("promissorynote", promisePayBlob, "promissorynote.pdf");
        formData.set("signedAt", data.createdAt);
        formData.set("studentid", data.studentid);
        formData.set("token", data.token);
        formData.set("person", data.person.identification.id);
        let pdf = formData.get('contract');
        let promissorynote = formData.get('promissorynote');
        let audioConf = formData.get('audio');
        if (!pdf || !promissorynote || !audioConf) {
            console.log(pdf, promissorynote, audioConf);
            console.error('Pdf or Audio empty');
            return
        }
        fetch('/save-data', {
            method: 'POST',
            body: formData,
        })
        .then( res => {
            if (res.status == 500) {
                window.location.href = `${window.origin}/error-handler`;
                return
            }
            if (res.status == 200) {
                window.location.href = `${window.origin}/success`
                return
            }
        })
        .catch( e => {
            console.log(e);
            setOpen(true);
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
        if (showMainButton) {
            setTimeout(() => {
                setOpenSnack(false);
            }, 6500)
        }
    }, [showMainButton])
    useEffect(() => {
        if(audio) {
            console.log("The job is done!");
        }
    }, [audio])

    let bannerImages = async () => {
        let [data1, data2, data3, data4, data5] = await Promise.all([fetch('media/slider1.png', {
            method: 'GET'
        }), fetch('media/sphere.png', {
            method: 'GET'
        }),fetch('media/slider2.png', {
            method: 'GET'
        }),fetch('media/slider3.png', {
            method: 'GET'
        }), fetch('media/slider4.png', {
            method: 'GET'
        })])
        let [image1, image2, image3, image4, image5] = await Promise.all([data1.blob(), data2.blob(), data3.blob(), data4.blob(), data5.blob()])

        return [image1, image2, image3, image4, image5]
    }
    let {data: bannerData, error, isLoading} = useQuery('bannerimages', bannerImages);

    if ( bannerData || !isLoading ) {
        let image1Url = URL.createObjectURL(bannerData[0]);
        let image2Url = URL.createObjectURL(bannerData[1]);
        let image3Url = URL.createObjectURL(bannerData[2]);
        let image4Url = URL.createObjectURL(bannerData[3]);
        let image5Url = URL.createObjectURL(bannerData[4]);
        sources.current = [image1Url, image2Url, image3Url, image4Url, image5Url] 
    }
    
    return (
        <>  
            {
                loading ? <Loader /> : null
            }
            <div style={{backgroundColor: '#162F54'}}>
                <SliderView content={sliderviewContent} images={sources.current} setLoading={(value) => {
                    setLoading(value);
                }} />
            </div>
            <div className={styles["files-container"]} id="documents">
                <RenderDocuments/> 
                {
                    !showMainButton ? (
                        <Sign
                            setSign={(url)=>{
                                setSignURL(url);
                            }} 
                            setAudio={(blob) => {
                                setAudio(blob);
                            }} 
                            showSendButton={(value) => setShowMainButton(value)}
                        />
                    ): null
                }
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
                        <>
                            <div className={styles["alert-container"]}>
                                <Collapse in={open}>
                                    <Alert severity="error" action={<IconButton
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
                                        <AlertTitle><strong>Error</strong> </AlertTitle>
                                        No se ha podido contactar con el servidor. Por favor, inténtelo más tarde.
                                    </Alert>
                                </Collapse>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "10px"}}>
                                <Button variant="contained" component="label" onClick={saveData}>ENVIAR DATOS</Button>
                            </div>
                            <Snackbar open={openSnack} >
                                <Alert severity='success' sx={{ width: '100%' }}>
                                    El audio ha sido guardado con éxito!
                                </Alert>
                            </Snackbar>
                        </>
                        
                    ) : null
                }
                <Footer />
            </div>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <Contract />
        <ReactQueryDevtools />
    </QueryClientProvider>
);