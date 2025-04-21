import formatCurrency from "../scripts/utils/money.js";
// The Product object
class Product {
  // Fields
  id; // Unique id for each object
  image; // Path to the image that has to be rendered on the page
  name; // Name of the product
  priceCents; // Price of the product in cents in order to facilitate operations
  keywords; // Useful when searching this product on the search bar
  rating; // Rating object

  // Basic constructor
  constructor(producDetails) {
    this.id = producDetails.id;
    this.image = producDetails.image;
    this.name = producDetails.name;
    this.priceCents = producDetails.priceCents;
    this.keywords = producDetails.keywords;
    this.rating = producDetails.rating;
  }

  // Returns the image url to be displayed - function
  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`;
  }

  // Gets the correct price format to be displayed - function
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML(){
    return '';
  }
}

class Clothing extends Product {
  #sizeChartLink;

  constructor(producDetails){
    super(producDetails);
    this.#sizeChartLink = producDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `<a href=${this.#sizeChartLink} target="_blank">Size chart</a>`;
  }
}

class Appliance extends Product {
  // Fields
  instructionsLink;
  warrantyLink; 

  // Basis constructor
  constructor(producDetails){
    super(producDetails);
    this.instructionsLink = producDetails.instructionsLink;
    this.warrantyLink = producDetails.warrantyLink;
  }

  extraInfoHTML(){
    return `<div>
      <a href=${this.instructionsLink}>Instructions</a><br>
      <a href=${this.warrantyLink}>Warranty</a>
    </div>`
  }
}

// Get the product
export function getProduct(productId){
  // Ret value
  let ret;

  // Loop through the cart and find the product
  products.forEach((product)=>{
    if(product.id === productId) ret = product;
  });

  // Return the value
  return ret;
}

export let products = [];

// Maps the products depending on the type of each of those
function mapProducts(mapping){
  products = mapping.map((product)=> {{
    if(product.type === "clothing") {
      return new Clothing(product);
    } else if(product.keywords.includes("appliances")) {
      // Adds the new properties
      product.instructionsLink = "images/appliance-instructions.png";
      product.warrantyLink = "images/appliance-warranty.png";
      return new Appliance(product)
    } else {
      return new Product(product)
    }
  }});
}

// Load products from backend (XMLHttpRequest)
export function loadProducts(fun){
  const request = new XMLHttpRequest();


  request.addEventListener('load',()=>{
    console.log('load products')
    products = JSON.parse(request.responseText).map((product)=> {{
      if(product.type === "clothing") {
        return new Clothing(product);
      } else if(product.keywords.includes("appliances")) {
        // Adds the new properties
        product.instructionsLink = "images/appliance-instructions.png";
        product.warrantyLink = "images/appliance-warranty.png";
        return new Appliance(product)
      } else {
        return new Product(product)
      }
    }});
    fun();
  })

  // Error handling, unexpected errors across the internet
  // error parameter containing information about it
  request.addEventListener('error', (error) => {
    console.error('Unexcepted error. Please try again later.')
    console.error(error)
  });

  request.open('GET','https://supersimplebackend.dev/products');
  request.send();
}

// Load products from the backend using fetch() function
// which basically works with promises
export function loadProdutsFetch(){
  const promise = fetch('https://supersimplebackend.dev/products')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    mapProducts(data);
  })
  .catch((err) => {
    console.error('Request failed! ' + err);
  })
  return promise;
}