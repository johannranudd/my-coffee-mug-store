import { getData } from './utils.js';
const detailsItem = document.querySelector('.details-item');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const inCartIcon = document.querySelector('.navbar span');

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const id = mySearchParams.get('id');

let cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

let total = localStorage.getItem('total')
  ? JSON.parse(localStorage.getItem('total'))
  : 0;

inCartIcon.innerHTML = total;

const url = `https://www.johann.one/wp-json/wc/v3/products/${id}?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0`;

const displayOneObject = async () => {
  const data = await getData(url);
  detailsItem.innerHTML = `
  <img src="${data.images[0].src}" alt="${data.images[0].alt}"/>
  <p>${data.name}</p>
  
  `;

  addToCartBtn.addEventListener('click', () => {
    cart.filter((item) => {
      if (item.id === data.id) {
        item.amountInCart += 1;
        total += 1;
      }
    });
    localStorage.setItem('total', JSON.stringify(total));
    localStorage.setItem('cart', JSON.stringify(cart));
    inCartIcon.innerHTML = total;
  });
};
displayOneObject();

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
