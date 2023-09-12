const getDataaa = async(url='')=>{
    try{
        const res= await fetch(url);
        const newData= await res.json();
        return newData;
    }
    catch(error){
        console.log(`getting data from API error: ${error}`);
    }
  }
document.getElementById('curr').addEventListener('click',()=>{

    getDataaa('/order/show/current')
      .then(function(Data){
            var divElement = document.getElementById("tar");
            divElement.innerHTML = "";
          const arrayOfObjects = Object.values(Data.data).map(obj => obj);
          console.log(arrayOfObjects);
          // Create the outermost <div> element with classes "col-lg-4 col-md-4 all des"
          for( const x of arrayOfObjects){
            const outerDiv = document.createElement("div");
            // outerDiv.classList.add("col-lg-4", "col-md-4","all","des");
            outerDiv.classList.add('col-lg-4');
            outerDiv.classList.add('col-md-4');
            outerDiv.classList.add('dev');
            //outerDiv.className = outerDiv.className.split(' ').concat("col-lg-4", "col-md-4", "des").join(' ');
            // Create the <div> element with class "product-item"
            const productItemDiv = document.createElement("div");
            productItemDiv.classList.add("product-item");
        
            // Create the <a> element with an <img> element inside
            const linkElement = document.createElement("a");
            const imgElement = document.createElement("img");
            imgElement.src = `http://localhost:8000/images/productImages/${x.image}`;
            imgElement.alt = "";
            linkElement.appendChild(imgElement);
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
            const orderNumber = document.createElement("p");
            orderNumber.textContent =`Order id: ${x.id}`;
            downContentDiv.appendChild(descriptionParagraph);
            downContentDiv.appendChild(orderNumber);

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
            reviewsSpan.textContent = "current";
            downContentDiv.appendChild(reviewsSpan);
        
            // Append the inner elements to the appropriate parent elements
            productItemDiv.appendChild(downContentDiv);
            outerDiv.appendChild(productItemDiv);
        
            // Finally, append the outermost <div> element to the desired container in the DOM
            const container = document.querySelector("#tar"); // Replace with the appropriate selector
            container.appendChild(outerDiv);
          }
      
      })
      
})