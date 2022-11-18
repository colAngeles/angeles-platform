import React, {useEffect} from "react"
import {render} from "react-dom"
import Card from "./components/Card"
import Form from "./components/Form"
import Loader from "./components/Loader"
import styles from "./css/index.module.css"
import stylesLoader from "./css/loader.module.css"
function Index() {
    let images = ["./media/cardimg1.jpg", "./media/cardimg2.jpg", "./media/cardimg3.jpg", "./media/cardimg4.jpg", "./media/cardimg5.jpg"]
    useEffect(()=>{
        localStorage.clear()
        const loader = document.querySelector(`.${stylesLoader["background-load"]}`)
        loader.classList.add(stylesLoader["hidden"])
    }, [])
    return(
        <>
            <Loader />
            <main>
                <Card title="" images={images}/>
                <Form loaderHiddenClass={stylesLoader["hidden"]} loaderClass={stylesLoader["background-load"]}/>
            </main>
        </>

        
    )
}
render(<Index/>, document.querySelector('body'))