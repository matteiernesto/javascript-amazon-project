import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';

describe('Test suite: renderOrderSummary',()=>{
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
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

    // Cleanup code
    afterAll(()=>{
        document.querySelector('.js-test-container').innerHTML = '';
    });
});