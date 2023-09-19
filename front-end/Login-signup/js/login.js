$(function(){
    $("#signup-form").on('submit',function(e){
        e.preventDefault();
        const username = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        postData('/user/login',{username:username,password:password})
        .then(function(Data){
            if(Data.status==200){
                if(Data.data.isadmin){
                    getPage('/admin/addproduct');
                }
                else{
                    getPage('/main/home');
                }
            }
            else{
                $("#status").text("login failed");
                setTimeout(function() {
                    $("#status").empty();
                }, 4000);
            }
        })
    });
});
const err = document.getElementById('err');
if(err != null){
    setTimeout(function() {
        err.remove()
    }, 4000);
}
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
const getPage = async(url='')=>{
    const res = await fetch(url);
    window.location.href =res.url;
}

