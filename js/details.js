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

const displayOneObject = async () => {
  const data = await getData(url);

  cart = sessionStorage.getItem('cart')
    ? JSON.parse(sessionStorage.getItem('cart'))
    : [];
  total = sessionStorage.getItem('total')
    ? JSON.parse(sessionStorage.getItem('total'))
    : 0;

  const {
    id,
    name,
    stock_status,
    regular_price,
    featured,
    permalink,
    images,
    dimensions,
    weight,
    categories,
    price,
  } = data;
  console.log(data);
  console.log(dimensions);
  console.log(weight);
  console.log(categories[0].name);
  detailsItem.innerHTML = `
  <img src="${images[0].src}" alt="${images[0].alt}"/>
  <h3>Product info</h3>
  <div class="name-and-price">
    <h4><strong>${name}</strong></h4>
    <h4 class="price"><strong>kr ${price}</strong></h4>
  </div>
  <div class="horizontal-line"></div>
  <p><strong>Dimensions:</strong></p>
  <div class="dimensions">
    <p>Length: <strong>${dimensions.length}</strong></p>
    <p>Width: <strong>${dimensions.width}</strong></p>
    <p>Height: <strong>${dimensions.height}</strong></p>
  </div>
  <div>
    <p>Weight: <strong>${weight}</strong></p>
  
  </div>
  <button class="add-to-cart-btn">Add to cart</button>
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
};
displayOneObject();
