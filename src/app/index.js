import React, {useEffect, useState} from "react"
import {render} from "react-dom"
import Card from "./components/Card"
import Form from "./components/Form"
import Loader from "./components/Loader"
import styles from "./css/index.module.css"
import stylesLoader from "./css/loader.module.css"
function Index() {
    let images = ["./media/cardimg1.jpg", "./media/cardimg2.jpg", "./media/cardimg3.jpg", "./media/cardimg4.jpg", "./media/cardimg5.jpg"];
    let [loading, setLoading] = useState(true);
    useEffect(()=>{
        localStorage.clear();
    }, [])
    return(
        <>  
            {
                loading ? <Loader /> : null
            }
            <main>
                <Card title="" images={images} setLoaderState={(val) => setLoading(val)}/>
                <Form loaderHiddenClass={stylesLoader["hidden"]} loaderClass={stylesLoader["background-load"]}/>
            </main>
        </>

        
    )
}
render(<Index/>, document.querySelector('body'))