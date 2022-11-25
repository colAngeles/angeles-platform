import React, {useEffect} from "react"
import ReactDOM from "react-dom/client"
import SvgComponent from "./components/SvgComponent";
import styles from "./css/handleerrors.module.css"
import stylesLoader from "./css/loader.module.css"
function Handler() {
    let title = document.getElementById('title').value;
    let info = document.getElementById('info').value;
    return(
        <section>
            <div class={styles["background"]}></div>
            <div class={styles["description"]}>
                <h1>{title}</h1>
                <p>
                    {info}
                </p>
            </div>
            <div className={styles["image-container"]}>
                <SvgComponent />
            </div>
        </section>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Handler/>);