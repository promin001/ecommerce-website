{// JavaScript code
function search_animal() {
  let input = document.getElementById('searchbar').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('animals');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}

//banner slide

var counter = 1;
setInterval(function(){
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 3){
    counter = 1;
  }
}, 5000);

      var counter = 1;
      setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 3){
          counter = 1;
        }
      }, 5000);

      //products
      let http = new XMLHttpRequest();
http.open('get', 'products.json', true);
http.send();
http.onload = function(){
   if(this.readyState == 4 && this.status == 200){
      let products = JSON.parse(this.responseText);
      let output = "";
      for(let item of products){
         output += `
            <div class="product">
               <img src="${item.image}" alt="${item.description}">
               <p class="title">${item.title}</p>
               <p class="description">${item.description}</p>
               <p class="price">
                  <span>${item.price}</span>
                  <span>€</span>
               </p>
               <p class="cart">Add to cart <i class="bx bx-cart-alt"></i></p>
            </div>
         `;
      }
      document.querySelector(".products").innerHTML = output;
   }
}

}

//search
          // Define a function to search for a product by name
          function searchProductByName(productName) {
            // Get all elements with the class "pro"
            const products = document.querySelectorAll('.pro');

            // Loop through each product
            for (const product of products) {
                // Get the product name from the span element
                const productNameElement = product.querySelector('.des span');
                const productNameText = productNameElement.textContent.trim();

                // Check if the product name contains the search input
                if (productNameText.toLowerCase().includes(productName.toLowerCase())) {
                    // Show the product
                    product.style.display = 'block';
                } else {
                    // Hide the product
                    product.style.display = 'none';
                }
            }
        }

        // Get the search input element
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

                // Add an event listener to the search button
                searchButton.addEventListener('click', function () {
                  searchProductByName(searchInput.value);
              });

        // Add an event listener to the search input for real-time searching
        searchInput.addEventListener('input', function () {
            searchProductByName(searchInput.value);
        });
        
//add-to-cart
let cart = [];

function addToCart(name, price, image) {
    const existingpro = cart.find(item => item.name === name);

    if (existingpro) {
        existingpro.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><img style="height: 100px; width: 100px;" hight src="${item.image}" alt="" ></td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" class="quantity-input" min="1" onchange="updateQuantity('${item.name}', this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})" class="remove">
            <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button></td>
        `;
        cartItems.appendChild(row);

        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function openCart() {
    document.getElementById('cart-popup').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart-popup').style.display = 'none';
}

function updateQuantity(name, newQuantity) {
    const pro = cart.find(item => item.name === name);
    if (pro) {
        pro.quantity = parseInt(newQuantity);
        updateCart();
    }
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
function buyNow(name, price, image) {
  cart = [{ name, price, quantity: 1, image }];
  openCart();
  updateCart();
}

function checkout() {
    closeCart();
    alert(`Total Amount: $${document.getElementById('cart-total').textContent}`);
}

//big-and-small-photo
var MainImg = document.getElementById("MainImg");
var smallimg = document.getElementsByClassName("small-img")

smallimg[0].onclick = function(){
  MainImg.src = smallimg[0].src;
}
smallimg[1].onclick = function(){
  MainImg.src = smallimg[1].src;
}
smallimg[2].onclick = function(){
  MainImg.src = smallimg[2].src;
}
smallimg[3].onclick = function(){
  MainImg.src = smallimg[3].src;
}

//photo zoom
function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

//search
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const searchHistoryPopup = document.getElementById("search-history-popup");
  const searchHistoryList = document.getElementById("search-history-list");
  const clearHistoryButton = document.getElementById("clearHistory");
  
  // Retrieve search history from local storage
  const searchHistoryData = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
  function updateSearchHistory() {
    searchHistoryList.innerHTML = "";
    searchHistoryData.slice(0, 7).forEach(query => {
        const listItem = document.createElement("li");
        listItem.textContent = query;
        listItem.addEventListener("click", () => {
            searchInput.value = query;
            searchProducts(query);
            hideSearchHistory();
        });
        searchHistoryList.appendChild(listItem);
    });
  }
  
  function showSearchHistory() {
    searchHistoryPopup.style.display = "block";
    updateSearchHistory();
  }
  
  function hideSearchHistory() {
    searchHistoryPopup.style.display = "none";
  }
  
  clearHistoryButton.addEventListener("click", () => {
    searchHistoryData.length = 0;
    localStorage.removeItem("searchHistory");
    updateSearchHistory();
  });
  
  searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query === "") return;
  
    // Add the search query to the search history
    searchHistoryData.unshift(query);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryData));
    updateSearchHistory();
  
    searchshop(query);
  });
  
  searchInput.addEventListener("input", showSearchHistory);
  searchInput.addEventListener("blur", hideSearchHistory);
  
  function searchshop(query) {
    window.location.href = `shop.html?search=${query}`;
  }
  });

      document.addEventListener("DOMContentLoaded", function () {
        const productList = document.getElementById("pro-contariners");
        const searchParams = new URLSearchParams(window.location.search);
        const searchQuery = searchParams.get("search");
    
        const productElements = document.querySelectorAll('.pro');
    
        // Filter products based on the full search query
        const filteredProducts = Array.from(productElements).filter(productElement => {
            const productName = productElement.getAttribute("data-name");
            return productName.toLowerCase().includes(searchQuery.toLowerCase());
        });
    
        displayProducts(filteredProducts);
    
        function displayProducts(productArray) {
            productList.innerHTML = ""; // Clear the product list before displaying search results
            if (productArray.length === 0) {
                productList.innerHTML = "<p>No products found.</p>";
            } else {
                productArray.forEach(productElement => {
                    productList.appendChild(productElement.cloneNode(true));
                });
            }
        }
    });
    

    //search
    document.addEventListener("DOMContentLoaded", function () {
      const productList = document.getElementById("pro-contariners");
      const searchParams = new URLSearchParams(window.location.search);
      const searchQuery = searchParams.get("search");
  
      const productElements = document.querySelectorAll('.pro');
  
      // Filter products based on the full search query
      const filteredProducts = Array.from(productElements).filter(productElement => {
          const productName = productElement.getAttribute("data-name");
          return productName.toLowerCase().includes(searchQuery.toLowerCase());
      });
  
      displayProducts(filteredProducts);
  
      function displayProducts(productArray) {
          productList.innerHTML = ""; // Clear the product list before displaying search results
          if (productArray.length === 0) {
              productList.innerHTML = "<p>No products found.</p>";
          } else {
              productArray.forEach(productElement => {
                  productList.appendChild(productElement.cloneNode(true));
              });
          }
      }
  });
  