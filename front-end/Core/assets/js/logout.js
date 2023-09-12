const logout = document.getElementById('logout');

logout.addEventListener('click',()=>{
    
    PerformLogout('/user/logout')
    .then(function(Data){
        if(Data.data=="done"){
            getPage('/main/login')
        }
    })
})


const PerformLogout = async(url='')=>{
    const res= await fetch(url);
    try{
        const newData= await res.json();
        return newData;
    }
    catch(error){
        console.log(`getting data from API error: ${error}`);
    }
}

const getPage = async(url='',data={})=>{
    const res = await fetch(url);
    window.location.href =res.url;
}
 