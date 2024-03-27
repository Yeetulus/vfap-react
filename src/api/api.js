
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

const handleResponse = async (response, successCallback) => {
    if (response.ok) {
        try {
            const data = await response.json();
            successCallback(data);
        } catch (error) {
            successCallback(response);
            console.log(response);
        }

    }
};

const apiRequest = async (method, url, params, body, requiresAuth, successCallback, errorCallback, redirectToLogin) => {
    const options = {
        method: method,
        headers: getHeaders(requiresAuth),
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    const queryString = new URLSearchParams(params).toString();
    const _url = `/api/${url}`;
    const apiUrl = queryString ? `${_url}?${queryString}` : _url;

    await fetch(apiUrl, options)
        .then((response) => {
            if(!response.ok){
                throw response;
            }
            handleResponse(response, successCallback);
        }).catch((errorResponse) => {
            if(errorCallback !== undefined){
                errorCallback(errorResponse);
            }
            else console.error(errorResponse);
            if(errorResponse.status === 403 && redirectToLogin !== undefined){
                redirectToLogin();
            }
        });

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
