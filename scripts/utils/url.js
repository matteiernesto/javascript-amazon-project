/**
 * This method will return the value of a parameter
 * within the URL.
 * 
 * @param {string} parameterName
 * @return {string} paramater value
 */
export function getQueryParam(parameterName){
    // Get the URL of the page
    const url = new URL(window.location.href);

    // Return the value
    return url.searchParams.get(parameterName);
}