import { getData } from './utils.js';

const detailsItem = document.querySelector('.details-item');

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const id = mySearchParams.get('id');

const inCartIcon = document.querySelector('.navbar span');

let cart = sessionStorage.getItem('cart')
  ? JSON.parse(sessionStorage.getItem('cart'))
  : [];

let total = sessionStorage.getItem('total')
  ? JSON.parse(sessionStorage.getItem('total'))
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
    sessionStorage.setItem('cart', JSON.stringify(finalCart));
    sessionStorage.setItem('total', JSON.stringify(0));
  }

  cart = sessionStorage.getItem('cart')
    ? JSON.parse(sessionStorage.getItem('cart'))
    : [];
  total = sessionStorage.getItem('total')
    ? JSON.parse(sessionStorage.getItem('total'))
    : 0;
}
window.addEventListener('DOMContentLoaded', getCartData());
let loading = true;

const displayOneObject = async () => {
  try {
    if (loading) {
      detailsItem.innerHTML = `<div class="lds-dual-ring"></div>`;
    }
    const data = await getData(url);
    loading = false;
    cart = sessionStorage.getItem('cart')
      ? JSON.parse(sessionStorage.getItem('cart'))
      : [];
    total = sessionStorage.getItem('total')
      ? JSON.parse(sessionStorage.getItem('total'))
      : 0;

    const { id, name, images, dimensions, weight, categories, price } = data;

    const radiusNum = Number(dimensions.width / 2);
    const heightNum = Number(dimensions.height);
    const volumeCalc = Math.PI * radiusNum * radiusNum * heightNum;
    const volume = parseFloat(volumeCalc.toFixed());
    const dl = volume / 100;
    detailsItem.innerHTML = `
  <img src="${images[0].src}" alt="${images[0].alt}"/>
  <h3>Product info</h3>
  <div class="name-and-price">
    <h4><strong>${name}</strong></h4>
    <h4 class="price"><strong>kr ${price}</strong></h4>
  </div>
  <div class="horizontal-line"></div>
  
  <div class="object-info">
    <div class="dimensions">
      <p>Length: <strong>${dimensions.length}cm</strong></p>
      <p>Width: <strong>${dimensions.width}cm</strong></p>
      <p>Height: <strong>${dimensions.height}cm</strong></p>
    </div>
    <div class="other">
      <p>Weight: <strong>${weight} kg</strong></p>
      <p>Material: <strong>${categories[0].name}</strong></p>
      <p>Volume: <strong>${dl} dl</strong></p>
    </div>
  </div>
  <div class="add-to-cart-btn">
    <button>Add to cart</button>
  </div>
  `;
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
      // console.log(cart);
      cart.map((item) => {
        console.log(item.id);
        if (item.id === data.id) {
          item.amountInCart += 1;
          total += 1;
          return item;
        }
        return item;
      });
      sessionStorage.setItem('total', JSON.stringify(total));
      sessionStorage.setItem('cart', JSON.stringify(cart));
      inCartIcon.innerHTML = total;
    });
  } catch (e) {
    console.error(e, 'error in displayOneObject() function');
  }
};
displayOneObject();

// <p><strong>Dimensions:</strong></p>

// cm3
// &#13220;
