const inCartIcon = document.querySelector('.navbar span');
console.log(inCartIcon);
let cart = [];

let total = 0;
localStorage.setItem('cart', JSON.stringify(cart));
localStorage.setItem('total', JSON.stringify(total));
