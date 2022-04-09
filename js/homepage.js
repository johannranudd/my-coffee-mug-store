import { getData } from './utils.js';
const url =
  'https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0';
const productList = document.querySelector('.product-list');
const inCartIcon = document.querySelector('.navbar span');

let cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];
let total = localStorage.getItem('total')
  ? JSON.parse(localStorage.getItem('total'))
  : 0;

const displayData = async () => {
  const data = await getData(url);
  inCartIcon.innerHTML = total;
  productList.innerHTML = '';
  if (cart.length === 0) {
    cart = data;
  }
  data.map((item) => {
    item.amountInCart = 0;
    console.log(item);
    const { id, name, stock_status, regular_price, featured, permalink } = item;
    productList.innerHTML += `<li>
      <img src="${item.images[0].src}"/>
      <div class="product-info">
        <p>${name}</p>
        <p><strong>${regular_price}</strong> Nok</p>
      </div>
      <div class="add-to-cart">
        <button data-id="${id}">Add to cart</button>
      </div>
    </li>`;
  });
  const btns = productList.querySelectorAll('.add-to-cart button');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      cart.filter((item) => {
        if (item.id === parseFloat(e.target.dataset.id)) {
          item.amountInCart += 1;
          total += 1;
        }
      });
      localStorage.setItem('total', JSON.stringify(total));
      localStorage.setItem('cart', JSON.stringify(cart));
      inCartIcon.innerHTML = total;
    });
  });
};

displayData();
