$(function(){
    $("#signup-form").on('submit',function(e){
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const password = document.getElementById('password').value;
        const re_password = document.getElementById('re_password').value;
        
        if(password !=re_password){
            $("#status").text("password retype is not correct");
            $("#status").css("color", "red");
            setTimeout(function() {
                $("#status").empty();
            }, 4000);
        }
        else{
            postData('/user/signUp',{username:username,email:email, firstname:firstname, lastname:lastname, password:password})
            .then(async function(Data){
                if(Data.status=='success'){
                    $("#status").text("Account created successfully");
                    $("#status").css("color", "green");
                    await sendEmail('/email/signup',{username:username,email:email});
                    await postData('/cart/create',{username:username});
                    setTimeout(function() {
                        $("#status").empty();
                        getPage('/main/login');
                    }, 4000);
                }
            })
        }
    });
});

const postData = async(url='',data={})=>{
    const res = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
        },        
        body: JSON.stringify(data), 
    });
    
    try{
        const newData = await res.json();
        return newData;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
}
const sendEmail = async(url='',data={})=>{
    const res = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
        },        
        body: JSON.stringify(data), 
    });
}
const getPage = async(url='')=>{
    const res = await fetch(url);
    window.location.href =res.url;
}
const getdata = async(url='')=>{
    const res = await fetch(url);
    try{
        const newData= await res.json();
        return newData;
    }
    catch(err){
        console.log(`error while adding cart in front-end: ${err}`);
    }
}
 