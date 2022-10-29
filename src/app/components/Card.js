import React, {useEffect, useRef} from "react";
import styles from "../css/cards.module.css";

export default function Card(){
    let count = useRef(1)
    useEffect(()=>{
        let $cardsContainer = document.querySelector(`.${styles["cards-container"]}`)
        let childrenSize = $cardsContainer.children.length
        let timerHandle = ()=> {
            let scrollWidth = $cardsContainer.scrollWidth
            let thumb = scrollWidth / childrenSize
            let endScroll = scrollWidth / childrenSize * (childrenSize - 1)
            let nextPosition = thumb * count.current
            $cardsContainer.classList.remove(styles["active"])
            let timer = setInterval(()=> {
                if($cardsContainer.scrollLeft >= nextPosition) {
                    $cardsContainer.classList.add(styles["active"])
                    if($cardsContainer.scrollLeft >= endScroll) {
                        count.current = 1 
                        $cardsContainer.scrollLeft = 0
                        clearInterval(timer)
                        setTimeout(timerHandle, 20000)
                        return 
                    }
                    clearInterval(timer)
                    count.current += 1
                    setTimeout(timerHandle, 20000)
                    return
                }
                $cardsContainer.scrollLeft += 8
            }, 0)
        }
        setTimeout(timerHandle, 5000)

    }, [])
    return(
        <section className={styles["section-cards-container"]}>
            <div className={`${styles["fixed"]}`}>
                <h1>Matriculas 2023</h1>
                <h2>Colegio Los Ángeles</h2>
            </div>
            <div className={`${styles["cards-container"]} ${styles["active"]}`}>
                <div className={`${styles["item"]} ${styles["image1"]}`} style={{backgroundImage: `url(./media/LAB01.jpg)`}}>
                </div>
                <div className={`${styles["item"]} ${styles["image2"]}`} style={{backgroundImage: `url(./media/LAB02.jpg)`}}>   
                </div>
                <div className={`${styles["item"]} ${styles["image3"]}`} style={{backgroundImage: `url(./media/LAB03.jpg)`}}> 
                </div>
                <div className={`${styles["item"]} ${styles["image1"]}`} style={{backgroundImage: `url(./media/LAB01.jpg)`}}>
                </div>
            </div>
        </section>
    )
}
