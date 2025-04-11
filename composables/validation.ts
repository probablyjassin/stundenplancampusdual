/**
 * Check whether the response from the great campus-dual API is to be considered successful as it
 * always returns 200, no matter what.
 * @see {@link https://github.com/probablyjassin/campusdual-api-specification|campusdual-api-specification}
 */
export function isResponseSuccessful(response: any) {
    switch (typeof response) {
        // most endpoints return html on failure
        case "string":
            if (response.length > 6) {
                return false;
            } else return true; // the current semester is returned as a string of the number
            break;
        // timeline however returns json on failure
        case "object":
            if ("faultstring" in response) {
                return false;
            } else return true;
            break;
        default:
            return false;
            break;
    }
}
