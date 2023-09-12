const updateUI = (Data)=>{
    try{
        let totalPrice=0;
        let numOfOrders=0;
        let i =0;
        for (const key in Data) {
            if (Data.hasOwnProperty(key)) {
              const item = Data[key];
              

              totalPrice+=(parseFloat(item.price) * parseFloat(item.quantity));
                numOfOrders+=item.quantity;
                // Create a <hr> element with the specified class
                const target  = document.getElementById('tar');
                const hrElement = document.createElement("hr");
                hrElement.classList.add("my-4");
                
                // Create the outer <div> element with the specified classes
                const outerDiv = document.createElement("div");
                outerDiv.classList.add("row", "mb-4", "d-flex", "justify-content-between", "align-items-center","items");

                // Create the first <div> element for the image
                const imgDiv = document.createElement("div");
                imgDiv.classList.add("col-md-2", "col-lg-2", "col-xl-2");

                // Create the <img> element for the image
                const imgElement = document.createElement("img");
                imgElement.src = `http://localhost:8000/images/productImages/${item.image}`;
                imgElement.classList.add("img-fluid", "rounded-3");
                imgElement.alt = `${item.image}`;

                // Append the image to the first <div>
                imgDiv.appendChild(imgElement);

                // Create the second <div> element for text
                const textDiv = document.createElement("div");
                textDiv.classList.add("col-md-3", "col-lg-3", "col-xl-3");

                // Create and append the first <h6> element
                // const h6Element1 = document.createElement("h6");
                // h6Element1.classList.add("text-muted");
                // h6Element1.textContent = "Shirt";
                // textDiv.appendChild(h6Element1);

                // Create and append the second <h6> element
                const h6Element2 = document.createElement("h6");
                h6Element2.classList.add("text-black", "mb-0");
                h6Element2.textContent = `${item.name}`;
                textDiv.appendChild(h6Element2);

                // Create the third <div> element for quantity control
                const quantityDiv = document.createElement("div");
                quantityDiv.classList.add("col-md-3", "col-lg-3", "col-xl-2", "d-flex");

                // Create and append the decrement button
                const decrementButton = document.createElement("button");
                decrementButton.classList.add("btn", "btn-link", "px-2","subtract");
                decrementButton.onclick = function () {
                const inputElement = this.parentNode.querySelector("input[type=number]");
                if (inputElement) {
                    inputElement.stepDown();
                }
                };
                decrementButton.innerHTML = '<i class="fa fa-minus"></i>';
                quantityDiv.appendChild(decrementButton);

                // Create and append the input element
                const inputElement = document.createElement("input");
                inputElement.readOnly = true;
                inputElement.id = "form1";
                inputElement.min = "0";
                inputElement.name = "quantity";
                inputElement.value = `${item.quantity}`;
                inputElement.type = "number";
                inputElement.classList.add("form-control", "form-control-sm");
                quantityDiv.appendChild(inputElement);

                // Create and append the increment button
                const incrementButton = document.createElement("button");
                incrementButton.classList.add("btn", "btn-link", "px-2","add");
                incrementButton.onclick = function () {
                const inputElement = this.parentNode.querySelector("input[type=number]");
                if (inputElement) {
                    inputElement.stepUp();
                }
                };
                incrementButton.innerHTML = '<i class="fa fa-plus"></i>';
                quantityDiv.appendChild(incrementButton);

                // Create the fourth <div> element for price
                const priceDiv = document.createElement("div");
                priceDiv.classList.add("col-md-3", "col-lg-2", "col-xl-2", "offset-lg-1");

                // Create and append the price <h6> element
                const priceH6 = document.createElement("h6");
                priceH6.classList.add("mb-0");
                priceH6.textContent = `${item.price}`;
                priceDiv.appendChild(priceH6);

                // Create the fifth <div> element for the remove link
                const removeDiv = document.createElement("div");
                removeDiv.classList.add("col-md-1", "col-lg-1", "col-xl-1", "text-end","cancle");
                // Create and append the remove link
                const removeLink = document.createElement("a");
                removeLink.classList.add("text-muted");
                removeLink.innerHTML = '<i class="fa fa-times"></i>';
                removeDiv.appendChild(removeLink);

                // Append all the elements to the outer <div>
                outerDiv.appendChild(imgDiv);
                outerDiv.appendChild(textDiv);
                outerDiv.appendChild(quantityDiv);
                outerDiv.appendChild(priceDiv);
                outerDiv.appendChild(removeDiv);

                // Finally, append the <hr> and the outer <div> to the document body
                const exisingDiv = document.getElementById('end');
                target.insertBefore(hrElement,exisingDiv);
                target.insertBefore(outerDiv,exisingDiv);
                //target.appendChild(outerDiv);
            }
        }
        
        updatePrice(numOfOrders,totalPrice );
        
    }
    catch(err){
        console.log(`error while inserting the product to the cart: ${err}`)
    }
}
const updatePrice = (numOfOrders, totalPrice)=>{
    try{
        if(numOfOrders!=0 && totalPrice!=0){
            document.getElementById('numOfOrders').innerText=`${numOfOrders} items`;
            document.getElementById('anotherNum').innerText=`items ${numOfOrders}`;
            document.getElementById('totalPrice').innerText=`€ ${totalPrice}`;
            document.getElementById('finalPrice').innerText=`€ ${totalPrice+5}`;
        }
        else{
            document.getElementById('numOfOrders').innerText=`${0} items`;
            document.getElementById('anotherNum').innerText=`items ${0}`;
            document.getElementById('totalPrice').innerText=`€ ${0}`;
            document.getElementById('finalPrice').innerText=`€ ${0}`;
        }
    }
    catch(err){
        console.log(`error while updating prices: ${err}`);
    }
}
const removePrices = (price)=>{
    try{
        const oldNumText = document.getElementById('numOfOrders').innerText;
        let oldNum = parseInt(oldNumText, 10);
        if (!isNaN(oldNum) && oldNum>=1) {
            let newVl = oldNum-1;
            const one = document.getElementById('numOfOrders');
            one.innerText = `${newVl} items`;
            document.getElementById('anotherNum').innerText = `items ${newVl}`;
            const oldpriceText = document.getElementById('totalPrice').innerText;
            const oldpriceTextt = document.getElementById('finalPrice').innerText;
            let oldPrice = parseFloat(oldpriceText.replace(/[^\d.]/g, ''));;
            let oldPricee = parseFloat(oldpriceTextt.replace(/[^\d.]/g, ''));
            document.getElementById('totalPrice').innerText=`€ ${oldPrice-price}`;
            document.getElementById('finalPrice').innerText=`€ ${oldPricee-price}`;
            if(document.getElementById('finalPrice').innerText == '€ 5'){
                document.getElementById('finalPrice').innerText='€ 0';
            }
        } 
    }
    catch(err){
        console.log(`error while removing from prices: ${err}`);
    }
}
const editCount = (counter)=>{
    try{
        const oldNumText = document.getElementById('numOfOrders').innerText;
        let oldNum = parseInt(oldNumText, 10);
        if (!isNaN(oldNum)) {
            oldNum -= (counter-1);
            document.getElementById('numOfOrders').innerText = `${oldNum} items`;
            document.getElementById('anotherNum').innerText = `items ${oldNum}`;
        } 
    }
    catch(err){
        console.log(`error while removing from prices: ${err}`);
    }
}
const addPrices = (price)=>{
    try{
        const oldNumText = document.getElementById('numOfOrders').innerText;
        let oldNum = parseInt(oldNumText, 10);
        if (!isNaN(oldNum)) {
            oldNum += 1;
            document.getElementById('numOfOrders').innerText = `${oldNum} items`;
            document.getElementById('anotherNum').innerText = `items ${oldNum}`;
            const oldpriceText = document.getElementById('totalPrice').innerText;
            const oldpriceTextt = document.getElementById('finalPrice').innerText;
            let oldPrice = parseFloat(oldpriceText.replace(/[^\d.]/g, ''));
            let oldPricee = parseFloat(oldpriceTextt.replace(/[^\d.]/g, ''));
            if(oldPricee==0){
                document.getElementById('finalPrice').innerText=`€ ${oldPricee+price+5}`;
            }
            else{
                document.getElementById('finalPrice').innerText=`€ ${oldPricee+price}`;
            }
            document.getElementById('totalPrice').innerText=`€ ${oldPrice+price}`;
        } 
    }
    catch(err){
        console.log(`error while adding to prices: ${err}`);
    }
}
const getData = async(url='')=>{
    const res= await fetch(url);
    try{
        const newData= await res.json();
        return newData;
    }
    catch(error){
        console.log(`getting data from API error: ${error}`);
    }
}
const sendData = async(url='',data={})=>{
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
getData('/cart/get')
.then(function(Data){
    updateUI(Data.data)
})
.then(function(){
    const cancleList = document.querySelectorAll('.cancle');
    const addList = document.querySelectorAll('.add');
    const subtractList = document.querySelectorAll('.subtract');
    cancleList.forEach(icon => {
        icon.addEventListener('click',()=>{
            try{
                const previous = icon.previousElementSibling;
                const previousOfPrevioud = previous.previousElementSibling;
                const input = previousOfPrevioud.querySelectorAll('input');
                let counter = parseInt(input[0].value);
                const h6tag = previous.querySelectorAll('h6');
                let price = parseFloat(h6tag[0].innerText);
                ((icon.parentNode)).remove();
                removePrices(price*counter);
                editCount(counter);
                const targ = ((previousOfPrevioud.previousElementSibling).previousElementSibling);
                const image = targ.querySelectorAll('img');
                const imageName = image[0].alt;
                sendData('/product/getProductId',{img:imageName})
                .then(async function(Data){
                    if(Data.status=='success'){
                        const result = await sendData('/cart/removeFromCart',{productid:Data.data.result});
                    }
                })
            }
            catch(err){
                console.log(`error while adding the event listenier on the cancle sign: ${err}`);
            }
        });
    });
    addList.forEach(icon =>{
        icon.addEventListener('click',()=>{
            try{
                const parent = (icon.parentNode).nextSibling;
                const h6tag = parent.querySelectorAll('h6');
                let price = parseFloat(h6tag[0].innerText);

                const target = ((icon.parentNode).previousSibling).previousSibling;
                const image = target.querySelectorAll('img');
                const imageName = image[0].alt;
                addPrices(price);
                sendData('/product/getProductId',{img:imageName})
                .then(async function(Data){
                    if(Data.status=='success'){
                        const result = await sendData('/cart/increment',{productid:Data.data.result});
                    }
                })
            }
            catch(err){
                console.log(`error while adding the event listenier on the cancle sign: ${err}`);
            }
        });
    })
    subtractList.forEach(icon =>{
        icon.addEventListener('click',()=>{
            try{
                const target = ((icon.parentNode).previousSibling).previousSibling;
                const image = target.querySelectorAll('img');
                const imageName = image[0].alt;
                const initialValue = icon.nextSibling.value;
                if(initialValue==0){
                    ((icon.parentNode).parentNode).remove();
                    const beg = (((icon.parentNode).nextSibling).querySelectorAll('h6'))[0].innerText 
                    removePrices(beg);
                    editCount(1);
                    sendData('/product/getProductId',{img:imageName})
                    .then(async function(Data){
                        if(Data.status=='success'){
                            const result = await sendData('/cart/removeFromCart',{productid:Data.data.result});
                        }
                    })
                }
                else{
                    const parent = (icon.parentNode).nextSibling;
                    const h6tag = parent.querySelectorAll('h6');
                    let price = parseFloat(h6tag[0].innerText);
                    removePrices(price);
                    
                    
                    sendData('/product/getProductId',{img:imageName})
                    .then(async function(Data){
                        if(Data.status=='success'){
                            const result = await sendData('/cart/decrement',{productid:Data.data.result});
                        }
                    })
                }
            }
            catch(err){
                console.log(`error while adding the event listenier on the cancle sign: ${err}`);
            }
        });
    })
})
const button = document.getElementById('sbmt');
button.addEventListener('click',async(e)=>{
    try{
        e.preventDefault();
        const result = document.querySelectorAll('.items');
        if (result.length === 0) {
            $("#err").text("Cart is empty");
            $("#err").css("color", "red");
            setTimeout(function() {      
                $("#err").empty();
            }, 3000);
        }
        else{
            const orderPrice = document.getElementById('finalPrice').innerText;
            let Price = parseFloat(orderPrice.replace(/[^\d.]/g, ''));
            const quantityBef = document.getElementById('anotherNum').innerText;
            var quantity = parseInt(quantityBef.match(/\d+/)[0]);
            let objArr = []
            for(const y of result){
                const firstBaby = y.firstChild;
                const imgTag = (firstBaby.querySelectorAll('img'))[0].alt;       
                const product = await sendData('/product/getProductId',{img:imgTag})
                const productID = product.data.result;
                const quantity = ((((y.firstChild).nextSibling).nextSibling).querySelectorAll('input'))[0].value
                let objec = {
                    "productId":productID,
                    "quantity":quantity
                }
                objArr.push(objec);
            }
            const res = await sendData('/order/create',{price:Price,obj:objArr});
            let objectArray = [];
            for(const x of result){
                const firstBaby = x.firstChild;
                const imgTag = (firstBaby.querySelectorAll('img'))[0].alt;       
                const product = await sendData('/product/getProductId',{img:imgTag})
                const productID = product.data.result;

                const quantity = ((((x.firstChild).nextSibling).nextSibling).querySelectorAll('input'))[0].value
                const price = (((((x.firstChild).nextSibling).nextSibling).nextSibling).querySelectorAll('h6'))[0].innerText;
                
                let obj = {
                    "productid":`${productID}`,
                    "quantity":`${quantity}`,
                    "price":`${price}`,
                    "orderid":`${res.data.result.id}`
                }
                objectArray.push(obj);
            }
            console.log(objectArray);
            const final = await sendData('/order/addOrderProducts',{obj:objectArray});
            if(final.status == 'success'){
                for(const z of objectArray){
                    await sendData('/cart/removeFromCart',{productid:z.productid});
                }
                const email = sendData('/email/order',{id:res.data.result.id,price:Price-5,Totalprice:Price,quantity:quantity})
                $("#err").text("Order is placed successfully");
                $("#err").css("color", "green");
                const hrItmes = document.querySelectorAll('.my-4');
                setTimeout(function() {      
                    $("#err").empty();
                    updatePrice(0,0);
                    result.forEach(function(element) {
                        element.remove();
                    });
                    hrItmes.forEach(function(element) {
                        element.remove();
                    });
                }, 3000);
            }
        }
    }
    catch(err){
        console.log(`error while purchasing the order: ${err}`);
    }
})