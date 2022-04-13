export const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e, 'an error occured, please check getData() function');
  } finally {
  }
};
