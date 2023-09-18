function updateProductCountInStorage(productId, newQuantity) {
    let currentProducts = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    const productIndex = currentProducts.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        currentProducts[productIndex].count = newQuantity;
        localStorage.setItem('basket', JSON.stringify(currentProducts));
    }
}


const discounts = {
    xiaomi: {
        discount: 40,
        initialPrice: 929
    },
    samsung: {
        discount: 150,
        initialPrice: 2099
    },
    dyson: {
        discount: 140,
        initialPrice: 1490
    },
    supersonic: {
        discount: 100,
        initialPrice: 1099
    }
};



function updateTotalCount() {
    let currentProducts = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    const totalCount = currentProducts.reduce((total, product) => total + product.count, 0);
    const productsInBasketCount = document.querySelector('.products-in-basket-count');
    productsInBasketCount.textContent = totalCount.toString();
}


function updateTotalPrice() {
    let currentProducts = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];


    let discountTotal = 0;
    let initialPriceTotal = 0;

    currentProducts.forEach(product => {
        if (discounts.hasOwnProperty(product.name)) {
            const {
                discount,
                initialPrice
            } = discounts[product.name];
            discountTotal += discount * product.count;
            initialPriceTotal += initialPrice * product.count;
        } else {
            initialPriceTotal += product.price * product.count;
        }
    });

    const totalText = document.querySelector('.total-price-text');
    const discountText = document.querySelector('.discount-price-text');
    const amountText = document.querySelector('.amount-text b');

    totalText.textContent = initialPriceTotal.toFixed(2);
    discountText.textContent = discountTotal.toFixed(2);


    const amountTotal = initialPriceTotal - discountTotal;
    amountText.textContent = amountTotal.toFixed(2);
}



function handleButtonClick(e) {
    const id = e.target.getAttribute('data-id');
    const name = e.target.getAttribute('data-name');
    const price = parseFloat(e.target.getAttribute('data-price'));


    const {
        discount,
        initialPrice
    } = discounts[name];


    const discountedPrice = initialPrice - discount;

    const product = {
        id,
        name,
        price: discountedPrice,
        count: 1
    };



    let currentProducts = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    const existingProductIndex = currentProducts.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        currentProducts[existingProductIndex].count++;
    } else {
        currentProducts.push(product);
    }

    const convertedProduct = JSON.stringify(currentProducts);
    localStorage.setItem('basket', convertedProduct);


    updateTotalCount();
    updateTotalPrice();
}


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


updateTotalCount();
updateTotalPrice();