import Snackbar from "../components/snackbar";


export function showSnackbar(message, type, duration){
    return(
        <Snackbar message={message} type={type} duration={duration} />
    );
}