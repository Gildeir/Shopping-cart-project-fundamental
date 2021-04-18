// const { create } = require('eslint/lib/rules/*');
const cartItemsClass = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function cartItemClickListener(event) {
  const removeProduct = event.target;
  removeProduct.parentNode.removeChild(removeProduct);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;  
}

// let arrItem = [];

async function renderCart(objProduct) {
  const itemIdObj = { sku: objProduct.id, name: objProduct.title, salePrice: objProduct.price };
  const orderedList = document.querySelector(cartItemsClass);
  orderedList.appendChild(createCartItemElement(itemIdObj));
  localStorage.setItem('cart', orderedList.innerHTML);
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
    console.log('it\'s alive');
    const products = await getProducts();
    renderProducts(products); 
    emptyCart();
    getocalStorageData();
    // const objString = localStorage.getItem('cart');
    // arrItem = objString ? JSON.parse(objString) : [];
    // getocalStorageData();
    };
  }