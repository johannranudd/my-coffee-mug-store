import { getData } from './utils.js';
let searchPar = '';
let url = `https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0&q=${searchPar}`;
const productList = document.querySelector('.product-list');
const inCartIcon = document.querySelector('.navbar span');
const categoriesContainer = document.querySelector('.categories div');

let cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];
let total = localStorage.getItem('total')
  ? JSON.parse(localStorage.getItem('total'))
  : 0;

const displayData = async (array, cartPar) => {
  const data = await array;
  inCartIcon.innerHTML = total;
  productList.innerHTML = '';
  if (cart.length === 0) {
    cart = data;
  }
  if (cartPar.length === 0) {
    cartPar = cart;
  }

  cartPar.map((item) => {
    if (!item.amountInCart) {
      item.amountInCart = 0;
    }
    const {
      id,
      name,
      stock_status,
      regular_price,
      featured,
      permalink,
      images,
    } = item;

    productList.innerHTML += `
    <li>
      <a href="details.html?id=${id}">
        <img src="${images[0].src}"/>
        <div class="img-backdrop">
          <p>View Product</p>
        </div>
      </a>
      <div class="product-info">
        <p>${name}</p>
        <p><strong>${regular_price}</strong> Nok</p>
      </div>
      <div class="add-to-cart">
        <button data-id="${id}">Add to cart</button>
      </div>
    </li>
    `;
  });
  const btns = productList.querySelectorAll('.add-to-cart button');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      cart.filter((item) => {
        if (item.id === parseFloat(e.target.dataset.id)) {
          // console.log(item.id);
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

displayData(getData(url), cart);

let categoryPar = '';

const urlCategories = `https://www.johann.one/wp-json/wc/v3/products/categories/?${categoryPar}&consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0`;

async function getCategories() {
  const categoryData = await getData(urlCategories);
  // const data = await getData(url);
  console.log(categoryData);
  const categories = categoryData.reduce(
    (total, value) => {
      if (value.slug !== 'uncategorized') {
        const categoryName = value.slug;
        if (!total.includes(categoryName)) {
          total.push(categoryName);
        }
        return total;
      } else {
        return total;
      }
    },
    ['all']
  );
  categories.map((category) => {
    categoriesContainer.innerHTML += `<button data-category="${category}">${category}</button>
    `;
  });
  const categoryBtns = categoriesContainer.querySelectorAll('button');
  categoryBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // console.log(e.target.dataset.category);
      categoryPar = e.target.dataset.category;
      const newCart = cart.filter((item) => {
        if (e.target.dataset.category === 'all') {
          return item;
        } else if (item.categories[0].slug === e.target.dataset.category)
          return item;
      });
      console.log(newCart);
      displayData(getData(url), newCart);
    });
  });
}

getCategories();

// function fetchCategories() {
//   fetch(urlCategories)
//     .then((res) => res.json())
//     .then((dat) => console.log(dat));
// }

// const url = `https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0&q=${searchPar}`;
