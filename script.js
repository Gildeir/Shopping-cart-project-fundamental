// const { create } = require('eslint/lib/rules/*');
// let getSku;

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
      const itemIdObj = { sku: objProduct.id, name: objProduct.title, salePrice: objProduct.price };
      const orderedList = document.querySelector('.cart__items');
      orderedList.appendChild(createCartItemElement(itemIdObj));
    });
    return section;
  }

const emptyCart = () => {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
   const orderedList = document.querySelectorAll('.cart__items');
    orderedList.forEach((item) => item.parentNode.removeChild(item));
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
    };
  }