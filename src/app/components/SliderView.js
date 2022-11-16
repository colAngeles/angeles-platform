import React, {useEffect, useState, useRef} from "react";
import styles from "../css/sliderview.module.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import useIntersect from "../hooks/useIntersect";
export default function SliderView(props) {
    const propsElement = useRef({
        xCoord: null,
        scrollLeft: null,
        conf: true
    })

    const {current: elements} = propsElement
    
    let [entry, setRoot, setNode] = useIntersect({threshold: 0.9})

    useEffect(()=>{
        elements.descriptionContainer = document.querySelector(`.${styles["description-container"]}`)
        elements.description = document.querySelectorAll(`.${styles["description"]}`)
        setRoot(elements.descriptionContainer)
        setNode(elements.description)
    }, [])

    let [page, setPage] = useState(1)

    useEffect(()=>{
        if(!entry || !elements.conf) return
        let num = entry.target.dataset.page
        elements.imageActive = document.querySelector(`.${styles["image-content"]}.${styles["active"]}`)
        elements.image = document.querySelector(`.${styles["image-content"]}.image${num}`)
        elements.imageActive.classList.remove(styles["active"])
        elements.image.classList.add(styles["active"])
        setPage(Number(num))
    }, [entry])
    
    let handleChange = (_, value) => {
        elements.conf = false
        elements.imageActive = document.querySelector(`.${styles["image-content"]}.${styles["active"]}`)
        elements.image = document.querySelector(`.${styles["image-content"]}.image${value}`)
        elements.xCoord = elements.descriptionContainer.scrollWidth / props.content.length * (value - 1)
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
    return (
        <section className={styles["slider-view-container"]}>
            <div className={styles["slider-main-description-container"]}>
                <div className={styles["main-description-container"]}>
                    <div className={`${styles["description-container"]} ${styles["center"]}`}>
                        {props.content.map((element, index) => {
                                return (
                                    <>
                                        <div className={styles["description"]} data-page={index + 1}>
                                            <h3>{element.title}</h3>
                                            <p>{element.description}</p>
                                            <Button variant="contained" component="label" sx={{marginTop: "10px"}}>Comenzar</Button>
                                        </div>
                                    </>
                                )
                        })}
                    </div>
                    <Stack spacing={2}>
                        <Pagination count={props.content.length}  page={page} variant="outlined" color="primary" onChange={handleChange}/>
                    </Stack>
                </div>
            </div>
            <div className={styles["slider-main-image-container"]}>
                    {props.content.map((element, index) => {
                    return (
                        <div className={styles["image-container"]}>
                            <div className={`${styles["image-content"]} ${index == 0 ? styles["active"] : ""} image${index + 1}`} style={{backgroundImage: `url(${element.image})`, color: "red"}}></div>
                        </div>
                    )
                    })}
            </div>
        </section>
    )
}