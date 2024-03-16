
function getHeaders(requiresAuth){
    let headers = {
        'Content-Type': 'application/json',
    };
    if(requiresAuth && requiresAuth === true){
        const token = localStorage.getItem("access_token");
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

const handleResponse = async (response, successCallback, errorCallback, redirectToLogin) => {
    if (response.ok) {
        const data = await response.json();
        successCallback(data);
    } else {
        const errorData = await response.json();
        errorCallback(errorData);
        if(response.status === 403 && redirectToLogin){
            // TODO redirect to logout
        }
    }
};

const apiRequest = async (method, url, params, body, requiresAuth, successCallback, errorCallback, redirectToLogin) => {
    const options = {
        method: method,
        headers: getHeaders(requiresAuth),
    };

    if (body) {
        options.data = body;
    }

    const queryString = new URLSearchParams(params).toString();
    const _url = `/api/${url}`;
    const apiUrl = queryString ? `${_url}?${queryString}` : _url;

    try {
        const response = await fetch(apiUrl, options);
        await handleResponse(response, successCallback, errorCallback, redirectToLogin);
    } catch (error) {
        if(errorCallback !== undefined){
            errorCallback();
        } else{
            console.error(error);
        }
    }
};
export const get = (url, params, requiresAuth, successCallback, errorCallback, redirectToLogin) => {
    apiRequest('GET', url, params, null, requiresAuth, successCallback, errorCallback, redirectToLogin);
};

export const post = (url, params, body, requiresAuth, successCallback, errorCallback, redirectToLogin) => {
    apiRequest('POST', url, params, body, requiresAuth, successCallback, errorCallback, redirectToLogin);
};

export const put = (url, params, body, requiresAuth, successCallback, errorCallback, redirectToLogin) => {
    apiRequest('PUT', url, params, body, requiresAuth, successCallback, errorCallback, redirectToLogin);
};

export const del = (url, params, requiresAuth, successCallback, errorCallback, redirectToLogin) => {
    apiRequest('DELETE', url, params, null, requiresAuth, successCallback, errorCallback, redirectToLogin);
};
