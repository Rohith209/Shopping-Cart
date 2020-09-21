let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name:'Poco Mobile',
        tag:'poco',
        price:'416.98',
        inCart:0
    },
    {
        name:'MI Note 10 Lite',
        tag:'minote',
        price:'314.50',
        inCart:0
    },
    {
        name:'Redmi Note 9S',
        tag:'redmi9s',
        price:'214.00',
        inCart:0
    },
    {
        name:'MI Note 10',
        tag:'minote10',
        price:'429.99',
        inCart:0
    },
    {
        name:'Samsung Galaxy A71',
        tag:'samsung',
        price:'499.99',
        inCart:0
    }
];
function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(Product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartItems',productNumbers+1);
        document.querySelector('.cart span').textContent = productNumbers+1;
    } 
    else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
    setItems(Product);
}
for(let i=0;i<carts.length;i++) {
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function setItems () {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My Cart Items are :  ",cartItems);
    if(cartItems[product.tag]==undefined){
        cartItems = {
            ...cartItems,
            [product.tag]:product
        }
        cartItems[product.tag].inCart+=1;
    }
    else {
        cartItems = {
            [product.tag]:product
        }
        localStorage.setItem("productsInCart",JSON.stringify(cartItems));
    }
} 
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost!=null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);
    }
    else {
        localStorage.setItem("totalCost",product.price);
    }
}
function displayCart (){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer) {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "product">
            <i class="fas fa-times-circle"></i>
                <img src = "./images/${item.tag}.jpg"
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <i class="fas fa-plus-circle"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-minus-circle"></i>
            </div>
            <div class="total">
                $ ${item.inCart * item.price}
            </div>
        `;
        });
    }
    productContainer.innerHTML += `
        <div class = "basketTotalContainer">
            <h4 class= "basketTotalTitle">
                Basket Total
            </h4>
        <h4 class="basketTotal">
            $ ${cartCost},00
        </h4>
        </div>
    `;
}









onLoadCartNumbers();
displayCart();
