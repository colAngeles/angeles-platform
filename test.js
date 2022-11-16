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

let arr = [1, 2, 3, 4]
console.log(arr.length)
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