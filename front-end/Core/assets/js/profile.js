const getUserInfo = async(url='')=>{
    const res= await fetch(url);
    try{
        const newData= await res.json();
        return newData;
    }
    catch(error){
        console.log(`getting data from API error: ${error}`);
    }
}
const saveImage = async(url='',data={})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: data,
    });
    
    try{
        const result = await res.json();
        return result;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
}
const showImage = (name)=>{
    try{
        const imageTag = document.getElementById('userImage');
        imageTag.src = `http://localhost:8000/userImages/${name}`;
    }
    catch(err){
        console.log(`error while uploafing the image of user: ${err}`)
    }
}
getUserInfo('/user/userInfo')
.then(function(Data){
    document.getElementById('email').innerText=Data.data.result.email;
    document.getElementById('username').innerText=Data.data.result.username; 
    showImage(Data.data.result.image)
})

var fileInput = document.getElementById('file-input');

// Add an event listener to listen for changes in the input field
fileInput.addEventListener('change', async function(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const result2 = await saveImage('/user/uploadImage',formData);
    console.log(result2.data.uploadedFilename);
    showImage(result2.data.uploadedFilename);
});