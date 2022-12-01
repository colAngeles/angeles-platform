import React, {useEffect, useState, useRef} from "react";
import styles from "../css/sliderview.module.css";
import contractStyles from "../css/contract.module.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import useIntersect from "../hooks/useIntersect";
import Banner from "./Banner"
export default function SliderView(props) {
    const propsElement = useRef({
        xCoord: null,
        scrollLeft: null,
        conf: true
    })

    const {current: elements} = propsElement
    
    let [entry, setRoot, setNode] = useIntersect({threshold: 0.9})

    useEffect(()=>{
        elements.descriptionContainer = document.querySelector(`.${styles["description-container"]}`);
        elements.description = document.querySelectorAll(`.${styles["description"]}`);
        setRoot(elements.descriptionContainer);
        setNode(elements.description);
    }, [])

    let [page, setPage] = useState(1);

    useEffect(()=>{
        if(!entry || !elements.conf) return
        let num = entry.target.dataset.page;
        elements.imageActive = document.querySelector(`.${styles["image-container"]}.${styles["active"]}`);
        elements.image = document.querySelector(`.${styles["image-container"]}.image${num}`);
        elements.imageActive.classList.remove(styles["active"]);
        elements.image.classList.add(styles["active"]);
        setPage(Number(num));
    }, [entry])
    
    let handleChange = (_, value) => {
        elements.conf = false
        elements.imageActive = document.querySelector(`.${styles["image-container"]}.${styles["active"]}`)
        elements.image = document.querySelector(`.${styles["image-container"]}.image${value}`)
        elements.xCoord = elements.descriptionContainer.scrollWidth / (props.content.length + 1) * (value - 1)
        elements.scroollLeft = elements.descriptionContainer.scrollLeft
        elements.descriptionContainer.classList.remove(styles["center"])
        if(elements.scroollLeft >= elements.xCoord){
            let timer = setInterval(()=> {
                            elements.scroollLeft -= 8
                            if(elements.scroollLeft <= elements.xCoord){
                                clearInterval(timer) 
                                elements.descriptionContainer.classList.add(styles["center"])
                                elements.imageActive.classList.remove(styles["active"])
                                elements.image.classList.add(styles["active"])
                                elements.conf = true
                                return
                            }
                            elements.descriptionContainer.scrollTo(elements.scroollLeft, 0)
                        }, 0)
        }
        if(elements.scroollLeft <= elements.xCoord){
            let timer = setInterval(()=> {
                elements.scroollLeft += 8
                if(elements.scroollLeft >= elements.xCoord){
                        clearInterval(timer)
                        elements.descriptionContainer.classList.add(styles["center"])
                        elements.imageActive.classList.remove(styles["active"]) 
                        elements.image.classList.add(styles["active"])
                        elements.conf = true
                        return
                }
                elements.descriptionContainer.scrollTo(elements.scroollLeft, 0)
            }, 0)
        }
        setPage(value)
    }
    let activefiles = () => {
        let files = document.querySelector(`.${contractStyles['files-container']}`);
        files.classList.add(contractStyles['active']);
    }
    return (
        <section className={styles["slider-view-container"]}>
            <div className={styles["slider-main-description-container"]}>
                <div className={styles["main-description-container"]}>
                    <div className={`${styles["description-container"]} ${styles["center"]}`}>
                        <div className={styles["description"]} data-page={1}>
                            <h3>Matriculas 2023</h3>
                            <p>
                                En éste panel podrá encontrar las instrucciones que deberá seguir para realizar el proceso de matricula de manera exitosa. Para ver cada una de ellas por favor utilice los botenes de paginación, ubicados el parte inferior. En cualquier momento puede puede dar clic en COMENZAR para diligenciar los documentos.
                            </p>
                            <a href="#documents" style={{textDecoration: 'none'}}>
                                <Button variant="contained" component="label" sx={{marginTop: "10px"}} onClick={activefiles}>Comenzar</Button>
                            </a>
                        </div>
                        {props.content.map((element, index) => {
                                return (
                                    <div key={index} className={styles["description"]} data-page={index + 2}>
                                        <h3>{element.title}</h3>
                                        <p>{element.description}</p>
                                        <a href="#documents" style={{textDecoration: 'none'}}>
                                            <Button variant="contained" component="label" sx={{marginTop: "10px"}} onClick={activefiles}>Comenzar</Button>
                                        </a>
                                    </div>
                                )
                        })}
                    </div>
                    <Stack spacing={2} sx={{padding: '15px 0'}}>
                        <Pagination count={props.content.length + 1}  page={page} variant="outlined" color="primary" onChange={handleChange}/>
                    </Stack>
                </div>
            </div>
            <div className={styles["slider-main-image-container"]}>
                    {props.content.map((element, index) => {
                        return (
                            <div key={index} className={`${styles["image-container"]} image${index + 2}`}>
                                <img src={element.image} className={`${styles["image"]}`} />
                            </div>
                        )
                    })}
                    <Banner images={props.images} sliderClassList={`${styles["image-container"]} ${styles["active"]} image${1}`} setLoader={(val) => props.setLoading(val)}/>
            </div>
        </section>
    )
}