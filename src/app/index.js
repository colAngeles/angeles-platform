import React from "react"
import {render} from "react-dom"
import Card from "./components/Card"
import Form from "./components/Form"
import styles from "./css/index.module.css"
function Index() {
    return(
        <>
            <main>
                <Card/>
                <Form/>
            </main>
        </>

        
    )
}
render(<Index/>, document.querySelector('body'))