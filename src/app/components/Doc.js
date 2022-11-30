import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import DocText from "./DocText";
export default function Doc({signURL}){
        let data = localStorage.getItem('data');
        let objData = JSON.parse(data);
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'column',
                position: 'relative',
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingTop: 35,
                paddingBottom: 100,
                paddingHorizontal: 50,
            },
            title: {
                fontSize: 10,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#000',
                fontFamily: 'Helvetica-Bold'
            },
            text: {
                marginVertical: 12,
                fontSize: 11,
                textAlign: 'left',
                fontFamily: 'Helvetica'
            },
            bold: {
                display: 'inline',
                fontFamily: 'Helvetica-Bold',
                margin: 12,
                fontSize: 11,
                textAlign: 'justify',
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1,
                width: '100%',
                minHeight: '100%',
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
                width: '100%',
            },
            headerImage: {
                width: '100%',
                objectFit: 'cover',
            },
            textSign: {
                marginVertical: 12,
                fontSize: 10,
                textAlign: 'left',
                fontFamily: 'Helvetica'
            },
            boldSign: {
                display: 'inline',
                fontFamily: 'Helvetica-Bold',
                fontSize: 10,
                textAlign: 'left',
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
                textAlign: 'center',
            },
            footerContent: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            },
            textFooter: {
                fontFamily: 'Helvetica',
                fontSize: 10,
                textAlign: 'left',
                color: '#001E46',
            },
            footerImage: {
                height: '15px'
            },
            mainSignContainer: {
                width: '100%',
                paddingHorizontal: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: 10,
            },
            signs: {
                marginVertical: 10,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #000',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
            },
            view: {
                marginVertical: 10,
                paddingHorizontal: 10,
                borderBottom: '1px solid #000',
                display: 'flex',
                width: '100%',
                height: '70px'
            },
            sign: {
                height: '95%',
                objectFit: 'scale-down',
            }
        });
        return (
            <Document>
                <Page size="LETTER" style={styles.page}>
                    <View style={styles.backgroundContainer} fixed>
                        <Image src='/media/logo.png' style={styles.backgroundImage}/>
                    </View>
                    <View style={styles.header} fixed>
                        <Image src='/media/header.jpg' style={styles.headerImage}/>
                    </View>
                    <Text style={styles.title}>CONTRATO DE PRESTACIÓN DE SERVICIOS EDUCATIVOS</Text>
                    <Text style={styles.title}>GRADO {objData.student.grade} AÑO ESCOLAR 2023</Text>
                    <DocText data={objData} />
                    {
                        signURL ? (
                            <> 
                            <View style={styles.mainSignContainer}>
                                <View style={styles.signs} wrap={false}>
                                    <Text style={styles.boldSign}>LA RECTORA</Text>
                                    <View style={styles.view}>
                                        <Image src='/media/3c7ecba91f021f3fd4e9301307f13adf' style={styles.sign}/>
                                    </View>
                                    <Text style={styles.boldSign}>DERLLY ROSMERY GOMEZ AMARILLO</Text>
                                    <Text style={styles.boldSign}>C.C. 40.034.729 de Tunja</Text>
                                </View>
                                <View style={styles.signs} wrap={false}>
                                    <Text style={styles.boldSign}>Representante legal y/o acudiente</Text>
                                    <Text style={styles.textSign}>Nombre: {objData.person.name} {objData.person.surname}</Text>
                                    <Text style={styles.textSign}>{objData.person.identification.type ? objData.person.identification.type : <Text>Documento: </Text>}{objData.person.identification.id}</Text>
                                    <Text style={styles.textSign}>Dirección: {objData.person.location.address}</Text>
                                    <Text style={styles.textSign}>E-mail: {objData.person.email}</Text>
                                    <View style={styles.view}>
                                        <Image src={signURL} style={styles.sign}/>
                                    </View>
                                    <Text style={styles.boldSign}>Firma</Text>
                                </View>
                            </View>
                            </>
                        ): null
                    }
                    <View style={styles.footer} fixed>
                        <View style={styles.footerContent}>
                            <Text style={styles.textFooter}>Nit. 901349673-4</Text>
                            <Text style={styles.textFooter}>Lic. Funcionamiento Res. 0234 de noviembre de 2003</Text>
                            <Text style={styles.textFooter}>Res. 01189 de diciembre 17 de 2019</Text>
                            <Text style={styles.textFooter}>Res. 000363 de agosto 06 de 2021</Text>
                        </View>
                        <View style={styles.footerContent}>
                            <Text style={styles.textFooter}>Calle 73A No. 2-02 Este</Text>
                            <Text style={styles.textFooter}>Tel: 3016589075 - 3043808353</Text>
                            <Text style={styles.textFooter}>admin@colegiolosangelestunja.com</Text>
                            <Image src='/media/icons.png' style={styles.footerImage}/>
                        </View>
                    </View>
                </Page>
            </Document>
          )
}