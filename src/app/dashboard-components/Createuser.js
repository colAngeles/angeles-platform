import React from "react";
import styles from "../css/createuser.module.css"
import { Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "./Input";
export default function Createuser() {
    let [open, setOpen] = useState(false)
    let [infoContent, setInfocontent] = useState("")
    
    let handleSave = () => {
        let $form = document.getElementById('createuser-form');
        let formData = new FormData($form);
        fetch('/add-user', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then( data => {
            console.log(data)
        }) 
    }
    return (
        <>
            <Toolbar />
            <div className={styles['form-container']}>
                <form id='createuser-form'>
                    <h4>Datos del estudiante:</h4>
                    <section>
                        <Input name='name' placeholder='Nombres' />
                        <Input name='surname' placeholder="Appellidos" />
                        <Input name='identification' variant='doc' type='number' placeholder="Identificación" defaultValue="T.I"/>
                        <Input name='grade' placeholder="Grado a Cursar" />
                    </section>
                    <h4>Datos de la madre:</h4>
                    <section>
                        <Input name='mothername' placeholder='Nombres' />
                        <Input name='mothersurname' placeholder="Appellidos" />
                        <Input name='motheridentification' variant="doc" type="number" placeholder="Identificación" />
                        <Input name='motheraddress' placeholder="Dirección" />
                        <Input name='mothercity' placeholder="Ciudad Residencia" />
                        <Input name='motheremail' type='email' placeholder="Correo Electrónico" />
                        <Input name='motherphone' type='number' placeholder="Teléfono" />
                    </section>
                    <h4>Datos del padre:</h4>
                    <section>
                        <Input name='fathersname' placeholder='Nombres' />
                        <Input name='fathersurname' placeholder="Appellidos" />
                        <Input name='fatheridentification' variant="doc" type="number" placeholder="Identificación" />
                        <Input name='fatheraddress' placeholder="Dirección" />
                        <Input name='fathercity' placeholder="Ciudad Residencia" />
                        <Input name='fatheremail' type='email' placeholder="Correo Electrónico" />
                        <Input name='fatherphone' type='number' placeholder="Teléfono" />
                    </section>
                    <h4>Datos del acudiente:</h4>
                    <section>
                        <Input name='relativename' placeholder='Nombres' />
                        <Input name='relativesurname' placeholder="Appellidos" />
                        <Input name='relativeidentification' variant="doc" type="number" placeholder="Identificación" />
                        <Input name='relativeaddress' placeholder="Dirección" />
                        <Input name='relativecity' placeholder="Ciudad Residencia" />
                        <Input name='relativeemail' type='email' placeholder="Correo Electrónico" />
                        <Input name='relativephone' type='number' placeholder="Teléfono" />
                    </section>
                    <h4>Datos de matricula:</h4>
                    <section>
                        <Input name='annualAmount' placeholder='Valor Anual' />
                        <Input name='annualAmountText' placeholder='Valor Anual En Texto' />
                        <Input name='enrollmentAmount' placeholder="Valor de Matricula" />
                        <Input name='enrollmentAmountText' placeholder="Valor de Matricula En Texto" />
                        <Input name='remainingAmount' placeholder="Valor Total de Pensión" />
                        <Input name='remainingAmountText' placeholder="Valor Total de Pensión En Texto" />
                        <Input name='pension' placeholder="Valor Mensual de Pensión" />
                        <Input name='pensionText' placeholder="Valor Mensual de Pensión En Texto" />
                        <Input name='anotherAmount' placeholder="Otros Costos" />
                        <Input name='anotherAmountText' placeholder="Otros Costos En Texto" />
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