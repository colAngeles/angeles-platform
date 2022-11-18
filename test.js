// const  generateRandomString = (num) => {
//     const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result= '';
//     const charactersLength = characters.length;
//     for ( let i = 0; i < num; i++ ) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
// const displayRandomString = () =>{
//    let randomStringContainer = document.getElementById('random_string'); 
//     randomStringContainer.innerHTML =  generateRandomString(8);    
// }

// console.log(generateRandomString(6));

// let arr = [1, 2, 3, 4]
// console.log(arr.length)
// <BlobProvider document={<Doc/>}>
          //   {({ blob, url, loading, error }) => {
          //     if (url) {
          //       let link = document.createElement('a');
          //       link.download = 'contract.pdf';
          //       link.href = url;
          //       link.click();
          //     }
          //     // Do whatever you need with blob here
          //     return <div>There's something going on on the fly</div>;
          //   }}
          // </BlobProvider>


    //       <>
    //     <BlobProvider document={<prevDoc/>}>
    //       {({ blob, url, loading, error }) => {
    //         if (url) {
    //           return (
    //             <div className={styles['pdf-container']}>
    //               <Worker workerUrl="https:unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
    //                 <Viewer fileUrl="./files/contract.pdf"/>
    //               </Worker>
    //             </div>
    //           )
    //         }
    //       }}
    //     </BlobProvider>
    //   </>

// Repeat Function -> Form componet
//     const repeat = ()=> {
//       let $form = document.getElementById('contactform')
//       let formData = new FormData($form);
//       const loader = document.querySelector(`.${props["loaderClass"]}`);
//       let tokenInput = document.getElementById(styles["token"]);
//       repeatSize += 1;
//       console.log('repeatSize: ', repeatSize);
//       if (repeatSize > 3) {
//           loader.classList.add(props["loaderHiddenClass"]);
//           setInfocontent({infoType: 'info', title: 'Solicitud No Procesada', message: 'Por favor, inténtelo más tarde.'});
//           setOpen(true);
//           return
//       }
//       fetch('/get-token', {
//           method: 'POST',
//           body: formData,
//       })
//       .then( res => res.json())
//       .then( data => {
//           if (data.successful) {
//               let relativeInput = document.getElementById('relative')
//               let studentInput = document.getElementById('student')

//               let relativeValue = relativeInput.value
//               let studentValue = studentInput.value
              
//               relativeInput.setAttribute('disabled', '')
//               studentInput.setAttribute('disabled', '')
              
//               relativeInput.onfocus = (e)=> {
//                   relativeInput.setAttribute('disabled', '')
//                   e.currentTarget.value = relativeValue
//               }

//               studentInput.onfocus = (e)=> {
//                   studentInput.setAttribute('disabled', '')
//                   e.currentTarget.value = studentValue
//               }

//               tokenInput.classList.remove(styles["hidden"])
//               loader.classList.add(props["loaderHiddenClass"])
//               setHandler(SignButton)
//               setInfocontent({infoType: 'success', title: 'Token Activado', message: 'Por favor, revisa tu correo electrónico.'})
//               setOpen(true)
//               return
//           }
//           else if (data.error) {
//               console.log(data);
//               console.log(data.error);
//               loader.classList.add(props["loaderHiddenClass"]);
//               setInfocontent({infoType: 'error', title: 'Error', message: 'Por favor, comuníquese con soporte.'});
//               setOpen(true);
//               return
//           }
//           else if (data.stderr) {
//               console.log(data.stderr);
//               loader.classList.add(props["loaderHiddenClass"]);
//               setInfocontent({infoType: 'error', title: 'Stderr', message: 'Por favor, comuníquese con soporte.'});
//               setOpen(true);
//               return
//           }
//           else if (data.emailerror) {
//               console.log(data.emailerror);
//               loader.classList.add(props["loaderHiddenClass"]);
//               setInfocontent({infoType: 'error', title: 'Email Error', message: 'Por favor, comuníquese con soporte.'});
//               setOpen(true);
//               return
//           }
//           else if (data.repeat) {
//               setTimeout(repeat, 10000);
//           }
//           if (data.refused) {
//               console.log(data);
//               loader.classList.add(props["loaderHiddenClass"]);
//               setInfocontent({infoType: 'error', title: '', message: 'Acceso Inválido. Por favor, verifica tus datos.'});
//               setOpen(true);
//           }
//       })
//       .catch( e => {
//           console.log(e);
//           loader.classList.add(props["loaderHiddenClass"]);
//           setInfocontent({infoType: 'error', title: 'Error de comunicación', message: 'Por favor, comuníquese con soporte.'});
//           setOpen(true);
//           return
//       })
//   }
// let obj = {_name: "Duvan"}
// obj.tolo = "This is a test"
// console.log(obj)
// //jkahsflahsjfszz
let date = 19
let month = 'Noviembre'
let year = 2022
let re = new RegExp(`ALOS${date}\\D*${month.toUpperCase()}\\D*${year}\\D*(ACEPT){1}.?LOSTERMINOSCONDICIONESY?CLAUSULASDELCONTRATODEPRESTACION(ES)?DELSERVICIOEDUCATIVOSUSCRITOCONELCOLEGIOLOSANGELESYDEL?PAGAREANEXOANEXOADICHODOCUMENTODEIGUALMANERAAUTORIZOALCOLEGIOLOSANGELESALTRATAMIENTODEMISDATOSPERSONALESDEACUERDOCONLASDISPOSICIONESLEGALES`)
let text = 'ALOS19DIASDELMESDENOVIEMBREDELAÑO2022HELEIDOYACEPTOLOSTERMINOSCONDICIONESCLAUSULASDELCONTRATODEPRESTACIONDELSERVICIOEDUCATIVOSUSCRITOCONELCOLEGIOLOSANGELESYDELPAGAREANEXOANEXOADICHODOCUMENTODEIGUALMANERAAUTORIZOALCOLEGIOLOSANGELESALTRATAMIENTODEMISDATOSPERSONALESDEACUERDOCONLASDISPOSICIONESLEGALES'
console.log(re.test(text))