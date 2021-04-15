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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}
// createProductItemElement();

/* A lista de produtos que devem ser exibidos é o array results no JSON acima.
Você deve utilizar a função createProductItemElement(product) para criar os componentes HTML referentes a um produto.
Adicione o elemento retornado da função createProductItemElement(product) como filho do elemento < section class = "items" >
  Obs: as variáveis sku, no código fornecido, se referem aos campos id retornados pela API. */

function renderProducts(products) {
  console.log(products);
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
// getSkuFromProductItem();
// function cartItemClickListener(event) {

//   // coloque seu código aqui
// }
// function createCartItemElement({
//   sku,
//   name,
//   salePrice,
// }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   // li.addEventListener('click', cartItemClickListener);
//   return li;
// }

if (typeof window !== 'undefined') {
  window.onload = async function () {
    console.log('it\'s alive');
    const products = await getProducts();
    renderProducts(products);
    // createProductItemElement();
};
  }