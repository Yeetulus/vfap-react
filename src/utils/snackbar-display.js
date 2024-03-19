import {toast} from "react-toastify";

export const showSnackbar = (message, type = "default") => {
    toast(message, {
        type: type
    });
};

export const successType = 'success';
export const errorType = 'error';
