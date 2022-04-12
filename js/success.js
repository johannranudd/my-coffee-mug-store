const inCartIcon = document.querySelector('.navbar span');
let cart = [];

let total = 0;
sessionStorage.setItem('cart', JSON.stringify(cart));
sessionStorage.setItem('total', JSON.stringify(total));
