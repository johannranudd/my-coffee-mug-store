let totalItems = JSON.parse(localStorage.getItem('total'));
let cart = JSON.parse(localStorage.getItem('cart'));

let totalPricePerItem = 0;
let totalPrice = 0;
cart.map((item) => {
  if (item.amountInCart > 0) {
    totalPricePerItem = item.amountInCart * item.price;
    console.log(totalPricePerItem);
    totalPrice += totalPricePerItem;
  }
});

console.log(totalPrice);
