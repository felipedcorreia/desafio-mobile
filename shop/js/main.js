let carts = document.querySelectorAll('.add-cart');

let books = [
    {
        cod: 0,
        name: 'Livro 1',
        tag: 'livro1',
        price: 40,
        inCart: 0
    },
    {
        cod: 1,
        name: 'Livro 2',
        tag: 'livro2',
        price: 40,
        inCart: 0
    },
    {
        cod: 2,
        name: 'Livro 3',
        tag: 'livro3',
        price: 40,
        inCart: 0
    },
    {
        cod: 3,
        name: 'Livro 4',
        tag: 'livro4',
        price: 40,
        inCart: 0
    },
    {
        cod: 4,
        name: 'Livro 5',
        tag: 'livro5',
        price: 40,
        inCart: 0
    }
]
    

for (let i=0; i< carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(books[i]);
        totalCost(books[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(books){
    let productNumber = localStorage.getItem('cartNumbers');
    
    productNumber = parseInt(productNumber);
    
    if(productNumber){
        localStorage.setItem('cartNumbers', productNumber + 1);
        document.querySelector('.cart span').textContent = productNumber + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(books)
    
}

function setItems(books){
    let cartItems = localStorage.getItem('bookInCart')
    carItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[books.tag] == undefined){
            cartItems = {
                ...JSON.parse(cartItems),
                [books.tag]: books
            }
        }
        cartItems[books.tag].inCart += 1;
    }else{   
        books.inCart = 1;
        cartItems = {
            [books.tag]: books
        }
    }


    localStorage.setItem("bookInCart", JSON.stringify(cartItems));
}

function totalCost(book){
    //console.log("Preço do produto: ", book.price);
    let cartCost = localStorage.getItem('totalCost');

    let cartItems = localStorage.getItem('bookInCart')
    carItems = JSON.parse(cartItems);

    var count = 0;
    for(var key in carItems){
        if(carItems.hasOwnProperty(key))
            count++;
    }
        


   var cartCostdiscound;

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        cartCostdiscound = parseInt(cartCostdiscound);
        if(count == 2){
            cartCost = (cartCost + book.price);
            cartCostdiscound = cartCost - cartCost*0.05;
            console.log("Valor com 2 :",cartCost);
            console.log("Valor do desconto com 2 :",cartCostdiscound);
        }else if(count == 3){
            cartCost = (cartCost + book.price);
            cartCostdiscound = cartCost - cartCost*0.1;
            console.log("Valor com 3 :",cartCost);
            console.log("Valor do desconto com 3 :",cartCostdiscound);
        }else if(count == 4){
            cartCost = (cartCost + book.price);
            cartCostdiscound = cartCost - cartCost*0.2;
            console.log("Valor com 4 :",cartCost);
            console.log("Valor do desconto com 4 :",cartCostdiscound);
        }else if(count == 5){
            cartCost = (cartCost + book.price);
            cartCostdiscound = cartCost - cartCost*0.25;
            console.log("Valor com 5 :",cartCost);
            console.log("Valor do desconto com 5 :",cartCostdiscound);
        }else{
            cartCost = (cartCost + book.price);
            console.log("Valor com 1 :",cartCost)
        }
        
        localStorage.setItem("totalCost", cartCost);
        localStorage.setItem("totalCostDiscound", cartCostdiscound);
    }else{
        localStorage.setItem("totalCost", book.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem('bookInCart');
    let cartCost = localStorage.getItem('totalCost');
    let cartCostDiscound = localStorage.getItem('totalCostDiscound');
    cartItems = JSON.parse(cartItems);
    let bookContainer = document.querySelector(".books-list");
    let totalContainer = document.querySelector(".totalContainer");
    let checkoutContainer = document.querySelector(".checkoutContainer");

    var count = 0;
    for(var key in cartItems){
        if(cartItems.hasOwnProperty(key))
            count++;
    }

    if(count > 1){
        cartCost = cartCostDiscound;
    }


    if(cartItems && bookContainer ){
        bookContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            bookContainer.innerHTML += `
            <div class="books">
                <div class="books-title-list">
                    <ion-icon name="close-circle" onclick="deleteItem(${item.cod})"></ion-icon>
                    <img src="./images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price-list">
                    ${item.price}
                </div>
                <div class="quantity-list">
                <input class="quantity-input" id="newqtd${item.cod}" type="number" min="1" name="quantity" value=${item.inCart}>
                <button class="refresh" onclick="newquantity(${item.cod})">Atualizar</button>
                </div>
                <div class="total-list">
                    R$ ${item.inCart*item.price},00
                </div>
            </div>
        </div>
            `;
        });

        totalContainer.innerHTML = `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Total: 
            </h4>
            <h4 class="basketTotal">
                R$ ${cartCost},00
            </h4>
        </div>
        `

        checkoutContainer.innerHTML = `
        <div>
            <button class="refresh" onclick="checkout()">Fechar</button>
        </div>
        `
    }
}


function newquantity(teste) {

    var newqtd = document.getElementById("newqtd"+teste).value;
    var livro = 'livro'+(parseInt(teste)+1);
    
    let cartItems = localStorage.getItem('bookInCart')
    cartItemsNovo = cartItems;
    
    cartItemsNovo = JSON.parse(cartItemsNovo);

    if(newqtd != null){
        cartItemsNovo[livro].inCart = newqtd;
    }


    localStorage.setItem("bookInCart", JSON.stringify(cartItemsNovo));

    var totalCost = 0;
    var cartNumbers = 0;
    Object.keys(cartItemsNovo).forEach(key => {
        console.log(key + ' - ' + cartItemsNovo[key].inCart) // key - value
        totalCost = totalCost + cartItemsNovo[key].inCart * cartItemsNovo[key].price;
        cartNumbers = cartNumbers + parseInt(cartItemsNovo[key].inCart);
    })

    var count = 0;
    for(var key in cartItemsNovo){
        if(cartItemsNovo.hasOwnProperty(key))
            count++;
    }
    var cartCostdiscound;

    cartCostdiscound = parseInt(cartCostdiscound);
        if(count == 2){
            cartCostdiscound = totalCost - totalCost*0.05;
        }else if(count == 3){
            cartCostdiscound = totalCost - totalCost*0.1;
        }else if(count == 4){
            cartCostdiscound = totalCost - totalCost*0.2;
        }else if(count == 5){
            cartCostdiscound = totalCost - totalCost*0.25;
        }else{
            cartCostdiscound = totalCost;
        }



    localStorage.setItem("totalCost", totalCost);
    localStorage.setItem("totalCostDiscound", cartCostdiscound);
    localStorage.setItem('cartNumbers', cartNumbers);

    window.location.reload();

  }

  function checkout(){
    let cartItems = localStorage.getItem('bookInCart')
    carItems = JSON.parse(cartItems);

    if(cartItems != null){
            cartItems = { }
    }


    localStorage.setItem("bookInCart", JSON.stringify(cartItems));
    localStorage.setItem("totalCost", 0);
    localStorage.setItem("totalCostDiscound", 0);
    localStorage.setItem('cartNumbers', 0);

    window.location.reload();
    
  }

  function deleteItem(item){
    var livro = 'livro'+(parseInt(item)+1);
    
    let cartItems = localStorage.getItem('bookInCart')
    cartItemsNovo = cartItems;
    
    cartItemsNovo = JSON.parse(cartItemsNovo);

    console.log(cartItemsNovo[livro]);

    delete cartItemsNovo[livro];

    localStorage.setItem("bookInCart", JSON.stringify(cartItemsNovo));

    var totalCost = 0;
    var cartNumbers = 0;
    Object.keys(cartItemsNovo).forEach(key => {
        console.log(key + ' - ' + cartItemsNovo[key].inCart) // key - value
        totalCost = totalCost + cartItemsNovo[key].inCart * cartItemsNovo[key].price;
        cartNumbers = cartNumbers + parseInt(cartItemsNovo[key].inCart);
    })

    var count = 0;
    for(var key in cartItemsNovo){
        if(cartItemsNovo.hasOwnProperty(key))
            count++;
    }
    var cartCostdiscound;

    cartCostdiscound = parseInt(cartCostdiscound);
        if(count == 2){
            cartCostdiscound = totalCost - totalCost*0.05;
        }else if(count == 3){
            cartCostdiscound = totalCost - totalCost*0.1;
        }else if(count == 4){
            cartCostdiscound = totalCost - totalCost*0.2;
        }else if(count == 5){
            cartCostdiscound = totalCost - totalCost*0.25;
        }else{
            cartCostdiscound = totalCost;
        }



    localStorage.setItem("totalCost", totalCost);
    localStorage.setItem("totalCostDiscound", cartCostdiscound);
    localStorage.setItem('cartNumbers', cartNumbers);

    window.location.reload();


  }




onLoadCartNumbers();
displayCart();