//URL RECOVERY
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//EXTRACT ID
const leId = queryString_url_id.slice(1);
console.log(leId);

//PRODUCT DISPLAY with find()
console.log(items);
const idProduct = items.find((element) => element._id === id);
console.log(idProduct);

//