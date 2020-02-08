export const fetchAPI = reqUrl =>
  fetch(reqUrl)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
      throw err;
    });
