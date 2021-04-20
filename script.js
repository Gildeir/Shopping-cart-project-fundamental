// const { create } = require('eslint/lib/rules/*');
const cartItemsClass = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function loadingFuntion() {
  const itemClass = document.querySelector('.items');
  const spanElement = document.createElement('span');
  spanElement.className = 'loading';
  spanElement.innerHTML = 'loading...';
  itemClass.appendChild(spanElement);
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
const priceAccumulator = [];
function cartItemClickListener(event) {
  const { target } = event;
  // const removeProduct = target;
  // removeProduct.parentNode.removeChild(removeProduct);
  const spanElement = document.querySelector('.total-price');
  const newObj = target.parentNode.children;
  const objRest = [...newObj];
  objRest.forEach((value, index) => {
    if (target === value) {
      target.parentNode.removeChild(target);
      priceAccumulator.splice(index, 1);  
      const totalPrice = priceAccumulator
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      spanElement.textContent = totalPrice;
    }
    });
  }
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;  
}

// let arrItem = [];
async function asyncSumPrice(itemIdObj) {
  // const elementPriceClass = document.querySelector('.total-price');
  if (priceAccumulator) priceAccumulator.push(itemIdObj.salePrice);
  const reducer = (accumulator, currenValue) => accumulator + currenValue;
  const totalPrice = await (priceAccumulator.reduce(reducer, 0));
    const spanElement = document.querySelector('.total-price');
  spanElement.textContent = totalPrice;  
}

async function renderCart(objProduct) {
  const itemIdObj = { sku: objProduct.id, name: objProduct.title, salePrice: objProduct.price };
  const orderedList = document.querySelector(cartItemsClass);
  orderedList.appendChild(createCartItemElement(itemIdObj));
  localStorage.setItem('cart', orderedList.innerHTML);
   asyncSumPrice(itemIdObj);
  // if (arrItem) arrItem.push(itemIdObj);
  // console.log(arrItem);
  // localStorage.setItem('cart', JSON.stringify(arrItem));
}
    
  function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
    const section = document.createElement('section');
    section.className = 'item';
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', async () => {
        const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
        const objProduct = await response.json();
        renderCart(objProduct);
    });
   return section;
  }

    function getocalStorageData() {
      const getLocalStorageData = localStorage.getItem('cart');
      document.querySelector(cartItemsClass).innerHTML = getLocalStorageData;
    // // const objString = localStorage.getItem('cart');
    // // arrItem = objString ? JSON.parse(objString) : [];
    }

const emptyCart = () => {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
  localStorage.clear('cart');
    const orderedList = document.querySelectorAll(cartItemsClass);
    orderedList.forEach((item) => item.parentNode.removeChild(item));
    document.location.reload(true);
  });
};

 function renderProducts(products) {
  document.querySelector('.loading').remove();
  const itemsClass = document.querySelector('.items');
  products.forEach((product) => { 
  itemsClass.appendChild(createProductItemElement(product));
});
}
async function getProducts() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador');
  const allproducts = await response.json();
  const products = allproducts.results;
  return products;  
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }
if (typeof window !== 'undefined') {
  window.onload = async function () {
    console.log('it\'s almost alive');
    loadingFuntion();
    const products = await getProducts();
    renderProducts(products);
    emptyCart();
    getocalStorageData();
    // asyncSumPrice();
    // const objString = localStorage.getItem('cart');
    // arrItem = objString ? JSON.parse(objString) : [];
    // getocalStorageData();
    };
  }