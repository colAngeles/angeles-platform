import React, {useEffect, useRef} from "react";
import styles from "../css/cards.module.css";
export default function Card({ images, setLoaderState }){
    let count = useRef(1)
    useEffect(()=>{
        let $cardsContainer = document.getElementById('trigger-load');
        let childrenSize = $cardsContainer.children.length;
        let image = document.querySelector(`.${styles['image1']}`);
        image.onload = (event) => {
            setLoaderState(false);
        }
        let timerHandle = ()=> {
            let scrollWidth = $cardsContainer.scrollWidth
            let thumb = scrollWidth / childrenSize
            let endScroll = thumb * (childrenSize - 1)
            let nextPosition = thumb * count.current
            $cardsContainer.classList.remove(styles["active"])
            let timer = setInterval(()=> {
                if($cardsContainer.scrollLeft >= nextPosition) {
                    $cardsContainer.classList.add(styles["active"])
                    if($cardsContainer.scrollLeft >= endScroll) {
                        count.current = 1;
                        $cardsContainer.scrollLeft = 0;
                        clearInterval(timer);
                        setTimeout(timerHandle, 20000);
                        return 
                    }
                    clearInterval(timer)
                    count.current += 1
                    setTimeout(timerHandle, 20000)
                    return
                }
                $cardsContainer.scrollLeft += 10
            }, 0)
        }
        setTimeout(timerHandle, 5000)
    }, [])
    return(
        <section className={styles["section-cards-container"]}>
            <div className={`${styles["fixed"]}`}>
                <h1>Matriculas <b>2023</b></h1>
            </div>
            <div className={`${styles["cards-container"]} ${styles["active"]}`}>
                {
                    images.map((img, index)=>{
                        return (
                                <div className={`${styles["item"]} ${styles["image" + (index + 1)]}`}>
                                    <img src={img} />
                                </div>
                        )
                    })
                }
                <div className={`${styles["item"]} ${styles["image1"]}`}>
                    <img src={images[0]} id='trigger-load'/>
                </div>
            </div>
        </section>
    )
}
