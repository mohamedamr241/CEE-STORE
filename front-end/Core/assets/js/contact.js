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
        return res;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
}

$(function(){
    $("#contact").on('submit',function(e){
        e.preventDefault();
        const fullname = document.getElementById('name').value
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        postData('/email/send',{fullname:fullname,email:email,subject:subject,message:message})
        .then(function(Data){
            console.log(Data.status);
            if(Data.status == 200){
                $("#err").text("Email is sent successfully");
                $("#err").css("color", "green");
                setTimeout(function() {
                    $("#err ").empty();
                    const form = document.getElementById('contact');
                    form.reset();
                }, 4000);

            }
        })
    });
});

