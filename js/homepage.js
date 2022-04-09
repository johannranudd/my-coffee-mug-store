const url =
  'https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0';

const getData = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data[0]));
};

getData();

const displayData = (data) => {
  console.log(data.images[0]);
  const img = document.querySelector('img');
  img.src = data.images[0].src;
};
