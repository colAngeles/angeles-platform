import React, { useEffect, useState } from "react";
import styles from "../css/banner.module.css";

export default function Banner({ images, sliderClassList, setLoader}) {
    let [laoderState, setLoaderState] = useState(false);
    useEffect(() => {
        if (laoderState) {
            setLoader(false);
        }
    }, [laoderState])
    
    useEffect(() => {
        let image = document.getElementById('trigger-load');
        image.onload = (event) => {
            console.log("Images loaded");
            setLoaderState(true);
        }
    }, [])
    return (
        <div className={`${styles['banner-container']} ${sliderClassList}`}>
            {
                images ? (
                    <>
                        <div className={styles["banner-image-container"]}>
                            <img src={images[0]} className={styles["banner-image"]} />
                        </div>
                        <div className={styles["banner-image-container"]}>
                            <img src={images[1]}  className={`${styles["banner-image"]} ${styles["mix-blend"]} ${styles["animated"]}`} />
                        </div>
                        <div className={styles["banner-image-container"]}>
                            <img src={images[2]}  className={styles["banner-image"]} />
                        </div>
                        <div className={styles["banner-image-container"]}>
                            <img src={images[3]}  className={`${styles["banner-image"]} ${styles["animated"]}`} />
                        </div> 
                        <div className={styles["banner-image-container"]}>
                            <img src={images[4]} className={styles["banner-image"]} id="trigger-load" />
                        </div>
                    </>
                ) : null
            }
        </div>
    )
}