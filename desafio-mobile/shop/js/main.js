let carts = document.querySelectorAll('.add-cart');

let books = [
    {
        cod: 0,
        name: 'Livro 1',
        tag: 'livro1',
        price: 10,
        inCart: 0
    },
    {
        cod: 1,
        name: 'Livro 2',
        tag: 'livro2',
        price: 20,
        inCart: 0
    },
    {
        cod: 2,
        name: 'Livro 3',
        tag: 'livro3',
        price: 30,
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
        price: 50,
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

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + book.price);
    }else{
        localStorage.setItem("totalCost", book.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem('bookInCart');
    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    let bookContainer = document.querySelector(".books-list");
    let totalContainer = document.querySelector(".totalContainer");


    if(cartItems && bookContainer ){
        bookContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            bookContainer.innerHTML += `
            <div class="books">
                <div class="books-title-list">
                    <ion-icon name="close-circle"></ion-icon>
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
    Object.keys(cartItemsNovo).forEach(key => {
        console.log(key + ' - ' + cartItemsNovo[key].inCart) // key - value
        totalCost = totalCost + cartItemsNovo[key].inCart * cartItemsNovo[key].price;
    })

    localStorage.setItem("totalCost", totalCost);

    window.location.reload();

  }




onLoadCartNumbers();
displayCart();