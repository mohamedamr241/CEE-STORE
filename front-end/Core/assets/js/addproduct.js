$(function(){
    $("#product-form").on('submit',async function(e){
        e.preventDefault();
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const productname = formData.get('name');
        const price = formData.get('price');
        const quantity = formData.get('quantity');
        const description = formData.get('description');
        const category = formData.get('cars');
        const image = formData.get('image');
        console.log(image);
        console.log(formData);
        const result = await postData('/product/create',{name:productname, price:price, quantity:quantity, description:description, category:category})
        const result2 = await saveImage('/product/upload',formData);
        await updateUI(result2,form);

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

const saveImage = async(url='',data={})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: data,
    });
    
    try{
        const result = await res.text();
        return result;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
}

const updateUI = async(res,form)=>{
    if(res == 'File uploaded successfully.'){
        $("#status").text("item added successfully");
        $("#status").css("color", "green");
        setTimeout(function() {
            $("#status").empty();
            form.reset();
        }, 4000);
    }
    else{
        $("#status").text("error while adding item");
        $("#status").css("color", "red");
        setTimeout(function() {
            $("#status").empty();
        }, 4000);
    }
}