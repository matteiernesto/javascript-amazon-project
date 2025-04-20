/**
 * This method will check for some parameters to be present
 * within the current URL of the page.
 * 
 * @param parameters
 *  
 * @returns boolean
 */
export default function checkQueryParams(parameters){
    // Value to be returned
    let ret = true;

    // Get the url of the page
    const url = new URL(window.location.href);

    // Loop through the array and check for the params
    // to be within the URL
    parameters.forEach(param => {
        if(url.searchParams.get(param) == null) ret = false;
    });

    // Return the value
    return ret;
}

/**
 * This method will get a parameter from the URL.
 * 
 * @param parameterName
 * @return paramater value
 */
export function getQueryParam(parameterName){
    // Get the URL of the page
    const url = new URL(window.location.href);

    // Return the value
    return url.searchParams.get(parameterName);
}