const cartDetails = document.querySelector('.cart-details');
const cartItemsHTML = document.querySelector('.cart-itemsHTML');

let totalItems = JSON.parse(localStorage.getItem('total'));
let cart = JSON.parse(localStorage.getItem('cart'));
let totalPrice = 0;
// let itemsInCart = [];

function getTotalValues() {
  cart.map((item) => {
    const { amountInCart, price, name, images } = item;
    // console.log(images[0].src);
    let totalPricePerItem = 0;
    // cartDetails.innerHTML = '';
    if (amountInCart > 0) {
      totalPricePerItem = amountInCart * price;
      totalPrice += totalPricePerItem;
      const pricePerItems = `
        <p>
        <img src='${images[0].src}' />;
        <strong>${name}</strong> Total price per item: <strong>
            ${totalPricePerItem}
        </strong>
      </p>
      `;

      cartDetails.innerHTML += pricePerItems;
    }
  });
  cartDetails.innerHTML += `
          
              <p>Total Items in Cart: <strong>${totalItems}</strong></p>
              <p>Total Price: <strong>${totalPrice}</strong></p>
      `;

  console.log(totalItems);
}

getTotalValues();
