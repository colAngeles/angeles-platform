import React, { useState } from "react";
import styles from "../css/createuser.module.css"
import { Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from "./Input";
export default function Createuser() {
    let [open, setOpen] = useState(false)
    let [infoContent, setInfocontent] = useState("")
    let handleChecked = e => {
        if (e.target.checked) {
            let relativename = document.getElementById('relativename');
            let relativesurname = document.getElementById('relativesurname');
            let relativeidentification = document.getElementById('relativeidentification');
            let relativeidentificationtype = document.getElementById('relativeidentificationtype');
            let relativeaddress = document.getElementById('relativeaddress');
            let relativecity = document.getElementById('relativecity');
            let relativeemail = document.getElementById('relativeemail');
            let relativephone = document.getElementById('relativephone');
            switch ( e.target.value ) {
                case 'mother': 
                    let mothername = document.getElementById(`${e.target.value}name`);
                    let mothersurname = document.getElementById(`${e.target.value}surname`);
                    let motheridentification = document.getElementById(`${e.target.value}identification`);
                    let motheridentificationtype = document.getElementById(`${e.target.value}identificationtype`);
                    let motheraddress = document.getElementById(`${e.target.value}address`);
                    let mothercity = document.getElementById(`${e.target.value}city`);
                    let motheremail = document.getElementById(`${e.target.value}email`);
                    let motherphone = document.getElementById(`${e.target.value}phone`);
                    relativename.value = mothername.value;
                    relativesurname.value = mothersurname.value;
                    relativeidentification.value = motheridentification.value;
                    relativeidentificationtype.value = motheridentificationtype.value;
                    relativeaddress.value = motheraddress.value;
                    relativecity.value = mothercity.value;
                    relativeemail.value = motheremail.value;
                    relativephone.value = motherphone.value;
                    break
                case 'father':
                    console.log(e.target.value)
                    let fathername = document.getElementById(`${e.target.value}name`);
                    let fathersurname = document.getElementById(`${e.target.value}surname`);
                    let fatheridentification = document.getElementById(`${e.target.value}identification`);
                    let fatheridentificationtype = document.getElementById(`${e.target.value}identificationtype`);
                    let fatheraddress = document.getElementById(`${e.target.value}address`);
                    let fathercity = document.getElementById(`${e.target.value}city`);
                    let fatheremail = document.getElementById(`${e.target.value}email`);
                    let fatherphone = document.getElementById(`${e.target.value}phone`);
                    relativename.value = fathername.value;
                    relativesurname.value = fathersurname.value;
                    relativeidentification.value = fatheridentification.value;
                    relativeidentificationtype.value = fatheridentificationtype.value;
                    relativeaddress.value = fatheraddress.value;
                    relativecity.value = fathercity.value;
                    relativeemail.value = fatheremail.value;
                    relativephone.value = fatherphone.value;
                    break
                case 'any':
                    relativename.value = "";
                    relativesurname.value = "";
                    relativeidentification.value = "";
                    relativeidentificationtype.value = "";
                    relativeaddress.value = "";
                    relativecity.value = "";
                    relativeemail.value = "";
                    relativephone.value = "";
                    break
            }  
        }
    }
    let handleSave = () => {
        let $form = document.getElementById('createuser-form');
        let formData = new FormData($form);
        formData.delete('internal');
        for ( let pair of formData.entries()) {
            if (!pair[1]) {
                if (pair[0] == 'anotherAmount' || pair[0] == 'anotherAmountText') {
                    formData.delete('anotherAmount');
                    formData.delete('anotherAmountText');
                    continue
                }
                if (pair[0].includes('mother') || pair[0].includes('father')) continue
                setInfocontent({infoType: 'warning', title: '', message: 'Hay campos requeridos sin diligenciar.'});
                setOpen(true);
                return
            }
            
        }
        fetch('/add-user', {
            method: 'PUT',
            body: formData
        })
        .then(res => res.json())
        .then( ( data ) => {
            console.log(data)
            if (data.success) {
                setInfocontent({infoType: 'success', title: '', message: 'Usuario creado exitosamente!.'});
                setOpen(true);
                document.getElementById('name').value = '';
                document.getElementById('surname').value = '';
                document.getElementById('identification').value = '';
                document.getElementById('grade').value = '';
                document.getElementById('relativesurname').value = '';
                document.getElementById('relativeidentification').value = '';
                document.getElementById('relativeidentificationtype').value = '';
                document.getElementById('relativeaddress').value = '';
                document.getElementById('relativecity').value = '';
                document.getElementById('relativeemail').value = '';
                document.getElementById('relativephone').value = '';
                document.getElementById('mothername').value = '';
                document.getElementById('mothersurname').value = '';
                document.getElementById('motheridentification').value = '';
                document.getElementById('motheridentificationtype').value = '';
                document.getElementById('motheraddress').value = '';
                document.getElementById('mothercity').value = '';
                document.getElementById('motheremail').value = '';
                document.getElementById('motherphone').value = '';
                document.getElementById('fathername').value = '';
                document.getElementById('fathersurname').value = '';
                document.getElementById('fatheridentification').value = '';
                document.getElementById('fatheridentificationtype').value = '';
                document.getElementById('fatheraddress').value = '';
                document.getElementById('fathercity').value = '';
                document.getElementById('fatheremail').value = '';
                document.getElementById('fatherphone').value = '';
                document.getElementById('annualAmount').value = '';
                document.getElementById('annualAmountText').value = '';
                document.getElementById('enrollmentAmount').value = '';
                document.getElementById('enrollmentAmountText').value = '';
                document.getElementById('remainingAmount').value = '';
                document.getElementById('remainingAmountText').value = '';
                document.getElementById('pension').value = '';
                document.getElementById('pensionText').value = '';
                document.getElementById('anotherAmount').value = '';
                document.getElementById('anotherAmountText').value = '';
                return
            }
            setInfocontent({infoType: 'error', title: '', message: 'Ha ocurrido un error inesperado. Por favor, inténtalo más tarde.'});
            setOpen(true);
        })
        .catch( err => {
            setInfocontent({infoType: 'error', title: '', message: 'Error de comunicación. Por favor, inténtelo más tarde.'});
            setOpen(true);
        })
    }
    return (
        <>
            <Toolbar />
            <div className={styles['form-container']}>
                <form id='createuser-form'>
                    <h4>Datos del estudiante:</h4>
                    <section>
                        <Input sx={{color: "#fff"}} name='name' placeholder='Nombres' />
                        <Input sx={{color: "#fff"}} name='surname' placeholder="Appellidos" />
                        <Input sx={{color: "#fff"}} name='identification' variant='doc' type='number' placeholder="Identificación" defaultValue="T.I."/>
                        <Input sx={{color: "#fff"}} name='grade' placeholder="Grado a Cursar" />
                    </section>
                    <h4>Datos de la madre:</h4>
                    <section>
                        <Input sx={{color: "#fff"}} name='mothername' placeholder='Nombres' />
                        <Input sx={{color: "#fff"}} name='mothersurname' placeholder="Appellidos" />
                        <Input sx={{color: "#fff"}} name='motheridentification' variant="doc" type="number" placeholder="Identificación" />
                        <Input sx={{color: "#fff"}} name='motheraddress' placeholder="Dirección" />
                        <Input sx={{color: "#fff"}} name='mothercity' placeholder="Ciudad Residencia" />
                        <Input sx={{color: "#fff"}} name='motheremail' type='email' placeholder="Correo Electrónico" />
                        <Input sx={{color: "#fff"}} name='motherphone' type='number' placeholder="Teléfono" />
                    </section>
                    <h4>Datos del padre:</h4>
                    <section>
                        <Input sx={{color: "#fff"}} name='fathername' placeholder='Nombres' />
                        <Input sx={{color: "#fff"}} name='fathersurname' placeholder="Appellidos" />
                        <Input sx={{color: "#fff"}} name='fatheridentification' variant="doc" type="number" placeholder="Identificación" />
                        <Input sx={{color: "#fff"}} name='fatheraddress' placeholder="Dirección" />
                        <Input sx={{color: "#fff"}} name='fathercity' placeholder="Ciudad Residencia" />
                        <Input sx={{color: "#fff"}} name='fatheremail' type='email' placeholder="Correo Electrónico" />
                        <Input sx={{color: "#fff"}} name='fatherphone' type='number' placeholder="Teléfono" />
                    </section>
                    <h4>Datos del acudiente:</h4>
                    <div className={styles['radio-button-container']}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="internal"
                        >
                            <FormControlLabel value="mother" control={<Radio sx={{color: '#9e9e9e'}} onChange={handleChecked} />} label="Madre" />
                            <FormControlLabel value="father" control={<Radio sx={{color: '#9e9e9e'}} onChange={handleChecked} />} label="Padre" />
                            <FormControlLabel value="any" control={<Radio sx={{color: '#9e9e9e'}} onChange={handleChecked} />} label="Ninguno" />
                        </RadioGroup>
                    </div>
                    <section>
                        <Input sx={{color: "#fff"}} name='relativename' placeholder='Nombres' />
                        <Input sx={{color: "#fff"}} name='relativesurname' placeholder="Appellidos" />
                        <Input sx={{color: "#fff"}} name='relativeidentification' variant="doc" type="number" placeholder="Identificación" />
                        <Input sx={{color: "#fff"}} name='relativeaddress' placeholder="Dirección" />
                        <Input sx={{color: "#fff"}} name='relativecity' placeholder="Ciudad Residencia" />
                        <Input sx={{color: "#fff"}} name='relativeemail' type='email' placeholder="Correo Electrónico" />
                        <Input sx={{color: "#fff"}} name='relativephone' type='number' placeholder="Teléfono" />
                    </section>
                    <h4>Datos de matricula:</h4>
                    <section>
                        <Input sx={{color: "#fff"}} name='annualAmount' placeholder='Valor Anual' />
                        <Input sx={{color: "#fff"}} name='annualAmountText' placeholder='Valor Anual En Texto' />
                        <Input sx={{color: "#fff"}} name='enrollmentAmount' placeholder="Valor de Matricula" />
                        <Input sx={{color: "#fff"}} name='enrollmentAmountText' placeholder="Valor de Matricula En Texto" />
                        <Input sx={{color: "#fff"}} name='remainingAmount' placeholder="Valor Total de Pensión" />
                        <Input sx={{color: "#fff"}} name='remainingAmountText' placeholder="Valor Total de Pensión En Texto" />
                        <Input sx={{color: "#fff"}} name='pension' placeholder="Valor Mensual de Pensión" />
                        <Input sx={{color: "#fff"}} name='pensionText' placeholder="Valor Mensual de Pensión En Texto" />
                        <Input sx={{color: "#fff"}} name='anotherAmount' placeholder="Otros Costos" />
                        <Input sx={{color: "#fff"}} name='anotherAmountText' placeholder="Otros Costos En Texto" />
                    </section>
                </form>
                <div className={styles["alert-container"]} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                </div>
                <div className={styles['button-container']}>
                        <Button variant="contained" onClick={handleSave}>Guardar</Button>
                </div>
            </div>
    
        </>
    )    
}