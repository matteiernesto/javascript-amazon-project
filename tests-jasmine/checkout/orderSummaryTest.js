import renderOrderSummary from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart, getCartItem} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {loadProducts} from '../../data/products.js';



describe('Test suite: renderOrderSummary',()=>{
    // Products id
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // Obtain the products
    let product1;
    let product2;

    // Load the products before all the tests below
    // We use the "done" function provided by Jasmine that will
    // wait for a function to be loaded in case it's asynchronus
    beforeAll((done)=>{
        // Only then it'll go to the next step
        // Lets us control the next step
        loadProducts(() => {
            done();
            product1 = getProduct(productId1);
            product2 = getProduct(productId2);
        });
    });
    
    // Shares data between the tests
    beforeEach(()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    // Normalizing the data
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'  
                },{
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage();

        renderOrderSummary(); 

        // Get the current names and prices displayed on the page
        const productName1 = document.querySelector(`.js-product-name-${productId1}`).innerText;
        const productName2 = document.querySelector(`.js-product-name-${productId2}`).innerText;
        const productPrice1 = document.querySelector(`.js-product-price-${productId1}`).innerText;
        const productPrice2 = document.querySelector(`.js-product-price-${productId2}`).innerText;
        
        // Check if the products name are displayed correctly on the page
        expect(product1.name).toEqual(productName1); 
        expect(product2.name).toEqual(productName2);
        
        // Check if the products price are displayed on the page with a $ sign
        expect(productPrice1).toContain('$');
        expect(productPrice2).toContain('$');
    });

    it('Displays the cart',()=>{ 
        // Checks if we render the page correctly
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        // Checks if there's the text contained in the object
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        // Checks if there's the text contained in the object
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });

    it('Remove a product', ()=>{
        document.querySelector(`.js-delete-link-${productId1}`).click();

        // Checks if we render the page correctly
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);

        expect(cart[0].productId).toEqual(productId2);
    });
});

describe('Test suite: deliveryOption',()=>{
    // Products id
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // Obtain the products and the cart items
    const product1 = getProduct(productId1);
    const product2 = getProduct(productId2);
    const cartItem1 = getCartItem(productId1);

    // Before each loop, mook localStorage.set/getItem in order to not mess up the cart
    beforeEach(()=>{
        // Mock localStorage.set/getItem
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    // Normalizing the data
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'  
                },{
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    // Check if the input is now checked
    it('Test if the input is checked',()=>{
        // Check the cart length
        expect(cart.length).toEqual(2);
    });

    // Cleanup code
    afterAll(()=>{
        document.querySelector('.js-test-container').innerHTML = '';
    });
});