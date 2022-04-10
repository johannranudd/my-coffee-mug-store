// import { getData } from './utils.js';

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const id = mySearchParams.get('id');
const newID = id.toString();

console.log(newID);

// const url = `https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0&q=${id}`;
// const url = `https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0&id=${id}`;

const getSingleData = () => {
  fetch(
    `https://www.johann.one/wp-json/wc/v3/products?consumer_key=ck_665f152a7ef7923e561fd71862902f11f72672c9&consumer_secret=cs_bce68a8f771bf9355c3c48d304d3e50e530e2ae0&id=${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayOneObject(data);
    })
    .catch((e) =>
      console.error(e, 'An error has occured, please check getSingleData()')
    );
};
getSingleData();
const displayOneObject = (data) => {
  console.log(data);
};
