function Products(colors,_id,name,price,imageUrl,description,altTxt){
    this.colors = colors,
    this._id = _id,
    this.name = name,
    this.price = price,
    this.imageUrl = imageUrl,
    this.description = description, 
    this.altTxt = altTxt
}

const product1 = new Products(["Blue", "White", "Black"], "107fb5b75607497b96722bda5b504926", "Kanap Sinopé", 1849, "kanap01.jpeg", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Photo d'un canapé bleu, deux places");
const product2 = new Products(["Black/Yellow", "Black/Red"], "415b7cacb65d43b2b5c1ff70f3393ad1", "Kanap Cyllène", 4499, "kanap02.jpeg", "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.", "Photo d'un canapé jaune et noir, quattre places");
const product3 = new Products(["Green", "Red", "Orange"], "055743915a544fde83cfdfc904935ee7", "Kanap Calycé", 3199, "kanap03.jpeg", "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.", "Photo d'un canapé d'angle, vert, trois places");
const product4 = new Products(["Pink", "White"], "a557292fe5814ea2b15c6ef4bd73ed83", "Kanap Autonoé", 1499, "kanap04.jpeg", "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.", "Photo d'un canapé rose, une à deux place");
const product5 = new Products(["Grey", "Purple", "Blue"], "8906dfda133f4c20a9d0e34f18adcf06", "Kanap Eurydomé", 2249, "kanap05.jpeg", "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.", "gris, trois places");
const product6 = new Products(["Grey", "Navy"], "77711f0e466b4ddf953f677d30b0efc9", "Kanap Hélicé", 999, "kanap06.jpeg", "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.", "Photo d'un canapé gris, deux places");
const product7 = new Products(["Red", "Silver"], "034707184e8e4eefb46400b5a3774b5f", "Kanap Thyoné", 1999, "kanap07.jpeg", "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.", "Photo d'un canapé bleu, deux places");
const product8 = new Products(["Pink", "Brown", "Yellow", "White"], "a6ec5b49bd164d7fbe10f37b6363f9fb", "Kanap orthosie", 3999, "kanap08.jpeg", "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.", "Photo d'un canapé rose, trois places");

let products = [];
products.push(product1, product2, product3, product4, product5, product6, product7, product8);

console.log(product1, product2, product3, product4, product5, product6, product7, product8);
