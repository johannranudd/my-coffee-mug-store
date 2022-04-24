const cartDetails = document.querySelector('.cart-details');
const payForm = document.querySelector('.pay-form');
const fakeCardNumber = document.querySelector('#fake-card-number');

let totalPrice = 0;
let newPrice = [];
const inCartIcon = document.querySelector('.navbar span');

let cart = sessionStorage.getItem('cart')
  ? JSON.parse(sessionStorage.getItem('cart'))
  : [];

let totalItems = sessionStorage.getItem('total')
  ? JSON.parse(sessionStorage.getItem('total'))
  : 0;

inCartIcon.innerHTML = totalItems;

function getTotalValues() {
  totalItems = sessionStorage.getItem('total')
    ? JSON.parse(sessionStorage.getItem('total'))
    : 0;

  cart = sessionStorage.getItem('cart')
    ? JSON.parse(sessionStorage.getItem('cart'))
    : [];
  newPrice = [];
  inCartIcon.innerHTML = totalItems;
  cartDetails.innerHTML = '';
  cart.map((item) => {
    const { id, amountInCart, price, name, images } = item;

    // console.log(images[0].src);
    let totalPricePerItem = 0;

    if (amountInCart > 0) {
      totalPricePerItem = amountInCart * Number(price);
      newPrice.push(totalPricePerItem);

      cartDetails.innerHTML += `
      <li>
            <img src='${images[0].src}' alt="${images[0].alt}" />
            <div class="item-btns-and-info-wrapper">
              <div class="incr-or-decr-btns">
                  <button data-id="${id}" class="incr-btn">
                      <i class="fa-solid fa-chevron-up"></i>
                  </button>
                  <button data-id="${id}" class="decr-btn">
                      <i class="fa-solid fa-chevron-down"></i>
                  </button>
                  <button data-id="${id}" id="remove-item-btn">Remove item</button>
              </div>
              <div class="single-item-info">

                  <p><strong>${name} </strong></p><br/>

                  <p>${
                    amountInCart > 1
                      ? 'Items: ' + amountInCart
                      : 'Item: ' + amountInCart
                  }</p> <br/>

                  <p>Price: ${price},-</p> <br/>

                  <p>Total: <strong class="values" data-id="${totalPricePerItem}">
                      ${totalPricePerItem},-
                  </strong></p>
              </div>
            </div>
      </li>
      `;
    }
  });
  const reduce = newPrice.reduce((total, value) => {
    total += value;
    return total;
  }, 0);
  cartDetails.innerHTML += `
  <div class="total-items-and-price">
              <p>Total Items in Cart: <strong>${totalItems}</strong></p>
              <p>Total Price: <strong>${reduce} kr</strong></p>
  </div>
      `;
  const incrDecrBtns = cartDetails.querySelectorAll('button');
  incrDecr(incrDecrBtns);
}
getTotalValues();

payForm.addEventListener('submit', (e) => {
  // console.log(totalItems);
  const alert = document.querySelector('.alert');
  e.preventDefault();
  const submittedCardNumber = Number(fakeCardNumber.value);

  if (!submittedCardNumber || fakeCardNumber.value.length !== 4) {
    alert.innerHTML = 'Credit card number must be 4 digits';
    alert.classList.add('show-alert');
  }

  if (totalItems === 0) {
    alert.innerHTML = 'There are no items in cart';
    alert.classList.add('show-alert');
  }

  if (
    submittedCardNumber &&
    fakeCardNumber.value.length === 4 &&
    totalItems > 0
  ) {
    location.href = 'success.html';
  }

  setTimeout(() => {
    alert.innerHTML = '';
    alert.classList.remove('show-alert');
  }, 3000);
});

function incrDecr(incrDecrBtns) {
  incrDecrBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const currentBtn = Number(e.currentTarget.dataset.id);
      if (btn.className === 'incr-btn') {
        cart.map((item) => {
          if (item.id === currentBtn) {
            item.amountInCart += 1;
            totalItems += 1;
          }
          return item;
        });

        sessionStorage.setItem('total', JSON.stringify(totalItems));
        sessionStorage.setItem('cart', JSON.stringify(cart));
        getTotalValues();
      }
      if (btn.className === 'decr-btn') {
        cart.map((item) => {
          if (item.id === currentBtn) {
            item.amountInCart -= 1;
            totalItems -= 1;
          }
          return item;
        });

        sessionStorage.setItem('total', JSON.stringify(totalItems));
        sessionStorage.setItem('cart', JSON.stringify(cart));
        getTotalValues();
      }
      if (btn.id === 'remove-item-btn') {
        cart.map((item) => {
          if (item.id === currentBtn) {
            totalItems -= item.amountInCart;
            item.amountInCart = 0;
          }
          return item;
        });
        sessionStorage.setItem('total', JSON.stringify(totalItems));
        sessionStorage.setItem('cart', JSON.stringify(cart));
        getTotalValues();
      }
    });
  });
}
