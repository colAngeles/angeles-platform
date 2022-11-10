const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const displayRandomString = () =>{
   let randomStringContainer = document.getElementById('random_string'); 
    randomStringContainer.innerHTML =  generateRandomString(8);    
}

console.log(generateRandomString(6));