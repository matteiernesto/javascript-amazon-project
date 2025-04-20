// Check first if the user has just placed a new order from the checkout page
// by checking the URL
checkQueryParams();

/**
 * This method will check for an order id to be present within the URL
 * in order to add to the orders object.
 */
function checkQueryParams(){
    // Get the url of the page
    const url = new URL(window.location.href);

    // Try to extract the value of order id
    return url.searchParams.get("order-id") != null;
}