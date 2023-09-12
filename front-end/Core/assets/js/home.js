const postDataToServer = async(url='',data={})=>{
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

const addToCart = async(elem,Atag)=>{
    try{
        // get the product name
        const atag = elem.querySelectorAll('a');
        const h4tag = atag[0].querySelectorAll('h4');
        const productName = ((h4tag[0].childNodes)[0]).data;

        // get the product price
        const h6tag = elem.querySelectorAll('h6');
        const price = h6tag[0].innerText;

        // get the image name 
        const  img = Atag.querySelectorAll('img');  
        const imageName = (img[0].alt);

        postDataToServer('/product/getProductId',{img:imageName})
        .then(async function(Data){
            if(Data.status=='success'){
                const result = await postDataToServer('/cart/addToCart',{productid:Data.data.result,quantity:1});
            }
        })
    }
    catch(err){
        console.log(`error while adding the product to the cart ${err}`);
    }
}
postDataToServer('/product/all',{num:1})
.then(function(Data){
    const arrayOfObjects = Object.values(Data.data).map(obj => obj);
    console.log(arrayOfObjects);
    // Create the outermost <div> element with classes "col-lg-4 col-md-4 all des"
    for( const x of arrayOfObjects){
      
        const outerDiv = document.createElement("div");

        outerDiv.classList.add('col-md-4');

        const productItemDiv = document.createElement("div");
        productItemDiv.classList.add("product-item");
        

        const linkElement = document.createElement("a");
        const imgElement = document.createElement("img");
        imgElement.src = `http://localhost:8000/images/productImages/${x.image}`;
        imgElement.alt = `${x.image}`;
        const iconDiv = document.createElement("div");
        iconDiv.classList.add("round");
        const icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-shopping-cart");
        icon.style.color='#fff';

        const iconCheck = document.createElement("i");
        iconCheck.classList.add("fa");
        iconCheck.classList.add("fa-check-circle");
        iconCheck.style.color='#fff';
        iconCheck.style.display='none';
        iconDiv.appendChild(icon);
        iconDiv.appendChild(iconCheck);
        linkElement.appendChild(imgElement);
        productItemDiv.appendChild(iconDiv);
        productItemDiv.appendChild(linkElement);
        // Create the <div> element with class "down-content"
        const downContentDiv = document.createElement("div");
        downContentDiv.classList.add("down-content");
        
        // Create <a> element with an <h4> element inside
        const titleLink = document.createElement("a");
        const titleHeading = document.createElement("h4");
        titleHeading.textContent = `${x.name}`;
        titleLink.appendChild(titleHeading);
        downContentDiv.appendChild(titleLink);
        
        // Create <h6> element for the price
        const priceHeading = document.createElement("h6");
        priceHeading.textContent = `${x.price}`;
        downContentDiv.appendChild(priceHeading);
        
        // Create <p> element for the description
        const descriptionParagraph = document.createElement("p");
        descriptionParagraph.textContent =`${x.description}`;
        downContentDiv.appendChild(descriptionParagraph);
        
        // Create <ul> element with <li> elements for stars
        const starsList = document.createElement("ul");
        starsList.classList.add("stars");
        for (let i = 0; i < 5; i++) {
              const starItem = document.createElement("li");
              const starIcon = document.createElement("i");
              starIcon.classList.add("fa", "fa-star");
              starItem.appendChild(starIcon);
              starsList.appendChild(starItem);
        }
            downContentDiv.appendChild(starsList);
        
            // Create <span> element for reviews
            const reviewsSpan = document.createElement("span");
            reviewsSpan.textContent = `${x.reviews}`;
            downContentDiv.appendChild(reviewsSpan);
            //const butt = document.createElement("button");
            // Append the inner elements to the appropriate parent elements
            productItemDiv.appendChild(downContentDiv);
            outerDiv.appendChild(productItemDiv);
        
            // Finally, append the outermost <div> element to the desired container in the DOM
            const container = document.querySelector("#tar"); // Replace with the appropriate selector
            container.appendChild(outerDiv);
    }  
})
.then(async function(){
    const icons = document.querySelectorAll(".round");

    icons.forEach(icon => {
        icon.addEventListener("click", async (e) => {
            e.preventDefault();
            await addToCart((icon.nextElementSibling).nextElementSibling, (icon.nextElementSibling));
            const dd = icon.querySelectorAll('i')
            dd[0].classList.add("cart-animate");
            setTimeout(() => {
                dd[0].style.display = "none";
            }, 1000);

            setTimeout(() => {
                dd[1].style.display = "";
                setTimeout(() => {
                    dd[0].style.display = ""; // Reappear the cart icon
                    dd[0].classList.remove("cart-animate");
                    dd[0].classList.add('cart-spin');
                    dd[1].style.display = "none";   // Hide the "done" icon
                    setTimeout(() => {
                        dd[0].classList.remove("cart-spin");
                    }, 1000); // Adjust the duration as needed
                }, 2000); // 2000ms (2 seconds) before reappearing the cart icon
                
            }, 1000); // 1000ms (1 second) before showing the "done" icon
        });
    });
})

