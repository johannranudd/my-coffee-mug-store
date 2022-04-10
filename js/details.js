import { getData } from './utils.js';
const detailsItem = document.querySelector('.details-item');

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const id = mySearchParams.get('id');

const inCartIcon = document.querySelector('.navbar span');

let cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

let total = localStorage.getItem('total')
  ? JSON.parse(localStorage.getItem('total'))
  : 0;

inCartIcon.innerHTML = total;

const url = `https://www.johann.one/wp-json/wc/v3/products/${id}?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0`;

let urlOriginal = `https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0`;

async function getCartData() {
  if (cart.length === 0) {
    const initCart = await getData(urlOriginal);
    const finalCart = await initCart.map((item) => {
      if (!item.amountInCart) {
        item.amountInCart = 0;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(finalCart));
    localStorage.setItem('total', JSON.stringify(0));
  }

  cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  total = localStorage.getItem('total')
    ? JSON.parse(localStorage.getItem('total'))
    : 0;
}
window.addEventListener('DOMContentLoaded', getCartData());

const displayOneObject = async () => {
  const data = await getData(url);

  cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  total = localStorage.getItem('total')
    ? JSON.parse(localStorage.getItem('total'))
    : 0;

  detailsItem.innerHTML = `
  <img src="${data.images[0].src}" alt="${data.images[0].alt}"/>
  <p>${data.name}</p>
  <button class="add-to-cart-btn">Add to cart</button>
  `;
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', (e) => {
    // console.log(cart);
    cart.map((item) => {
      console.log(data.id);
      console.log(item.id);
      if (item.id === data.id) {
        item.amountInCart += 1;
        total += 1;
        return item;
      }
      return item;
    });
    // console.log(cart);
    // console.log(total);
    localStorage.setItem('total', JSON.stringify(total));
    localStorage.setItem('cart', JSON.stringify(cart));
    inCartIcon.innerHTML = total;
    // displayOneObject();
  });
};
displayOneObject();

// function addToCartFn(addToCartBtn) {

// }
// addToCartFn(addToCartBtn);

// !mal
//
//
//
//
//
//
//
//
//
//
//
//

// const url = `https://www.johann.one/wp-json/wc/v3/products/${id}?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0`;

// const getSingleData = () => {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       displayOneObject(data);
//     })
//     .catch((e) =>
//       console.error(e, 'An error has occured, please check getSingleData()')
//     );
// };
// getSingleData();
