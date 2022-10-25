import React from "react"
import {render} from "react-dom"
import Card from "./components/Card"

function Index(params) {
    return(
        <Card/>
    )
}
render(<Index/>, document.querySelector('body'))