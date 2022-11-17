import React from "react";
import { Page, Document, StyleSheet} from '@react-pdf/renderer';
import PromissorynoteText from "./PromissorynoteText";

export default function Promissorynote({signURL}) {
    let data = localStorage.getItem('data');
    let objData = JSON.parse(data);
    // Font.register({
    //     family: 'Arialbd',
    //     src: '/fonts/arialbd.ttf'
    // });
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            position: 'relative',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingTop: 35,
            paddingBottom: 35,
            paddingHorizontal: 50
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            width: '100%',
            minHeight: '100%'
        },
        backgroundContainer: {
            position: 'absolute',
            top: 35,
            left: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        },
        backgroundImage: {
            width: '70%',
            objectFit: 'scale-down',
            opacity: '0.1'
        },
        header: {
            marginBottom: 10,
            paddingHorizontal: 10,
            display: 'flex',
            width: '100%'
        },
        text: {
            marginVertical: 12,
            fontSize: 12,
            textAlign: 'left',
            fontFamily: 'Arial'
        },
        textSign: {
            marginVertical: 12,
            fontSize: 10,
            textAlign: 'left',
            fontFamily: 'Arial'
        },
        bold: {
            display: 'inline',
            fontFamily: 'Arialbd',
            margin: 12,
            fontSize: 12,
            textAlign: 'justify'
        },
        boldSign: {
            display: 'inline',
            fontFamily: 'Arialbd',
            fontSize: 10,
            textAlign: 'left'
        },
        footer: {
            width: "100%",
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection:  'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 30,
            left: 50,
            right: 50,
            textAlign: 'center'
        },
        footerContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        
        textFooter: {
            fontFamily: 'Arial',
            fontSize: 10,
            textAlign: 'left',
            color: '#001E46'
        },
        footerImage: {
            height: '15px'
        },
        signs: {
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #000',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10
        },
        sign: {
            height: '95%',
            objectFit: 'scale-down'
        }
    });
    return ( 
        <Document>
            <Page size="LETTER" style={styles.page}>
                <PromissorynoteText data={objData} signURL={signURL}/>
            </Page>
        </Document>
      )
}