export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

// Get the delivery option - function
export function getDeliveryOption(deliveryOptionId){
    // Ret value
    let ret = 0;

    // Loop through the delivery options and find it
    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId) ret = option;
    });

    // Return the value
    return ret;
}