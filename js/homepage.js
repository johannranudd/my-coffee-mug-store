import { getData } from './utils.js';
let searchPar = '';
let url = `https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0&q=${searchPar}`;
const productList = document.querySelector('.product-list');
const inCartIcon = document.querySelector('.navbar span');
const categoriesContainer = document.querySelector('.categories div');

let cart = sessionStorage.getItem('cart')
  ? JSON.parse(sessionStorage.getItem('cart'))
  : [];
let total = sessionStorage.getItem('total')
  ? JSON.parse(sessionStorage.getItem('total'))
  : 0;

let loading = true;

const displayData = async (array, cartPar) => {
  // let data = null;

  if (loading) {
    productList.innerHTML = `
      <div class="lds-dual-ring"></div>
    `;
  }
  const data = await array;
  loading = false;
  inCartIcon.innerHTML = total;
  if (productList != null) {
    productList.innerHTML = '';
  }
  if (cart.length === 0) {
    cart = data;
  }
  if (cartPar.length === 0) {
    cartPar = cart;
  }
  cartPar.sort((a, b) => {
    const first = Number(a.id);
    const second = Number(b.id);
    if (first > second) {
      return 1;
    } else {
      return -1;
    }
  });

  cartPar.map((item) => {
    if (!item.amountInCart) {
      item.amountInCart = 0;
    }
    const { id, name, regular_price, images } = item;
    if (productList != null) {
      productList.innerHTML += `
    <li>
      <a href="details.html?id=${id}">
        <img src="${images[0].src}" alt="${images[0].alt}"/>
        <div class="img-backdrop">
          <p>View Product</p>
        </div>
      </a>
      <div class="product-info">
        <p>${name}</p>
        <p class="price"><strong>${regular_price}</strong> Nok</p>
      </div>
      <div class="add-to-cart">
        <button data-id="${id}">Add to cart</button>
      </div>
    </li>
    `;
    }
  });
  const btns = productList.querySelectorAll('.add-to-cart button');
  addToCart(btns);
};

function addToCart(btns) {
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      cart.map((item) => {
        if (item.id === parseFloat(e.target.dataset.id)) {
          item.amountInCart += 1;
          total += 1;
        }
        return item;
      });
      sessionStorage.setItem('total', JSON.stringify(total));
      sessionStorage.setItem('cart', JSON.stringify(cart));
      inCartIcon.innerHTML = total;
    });
  });
}

displayData(getData(url), cart);

let categoryPar = '';

const urlCategories = `https://www.johann.one/wp-json/wc/v3/products/categories/?${categoryPar}&consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0`;

async function getCategories() {
  const categoryData = await getData(urlCategories);
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
    const categoriesBtn = `<button data-category="${category}">${category}</button>
    `;
    categoriesContainer.innerHTML += categoriesBtn;
  });
  const categoryBtns = categoriesContainer.querySelectorAll('button');
  categoryBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      categoryPar = e.target.dataset.category;
      const newCart = cart.filter((item) => {
        if (e.target.dataset.category === 'all') {
          return item;
        } else if (item.categories[0].slug === e.target.dataset.category)
          return item;
      });
      displayData(getData(url), newCart);
    });
  });
}

getCategories();
