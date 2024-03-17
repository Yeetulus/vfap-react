import {useState} from "react";
import {Toast} from "react-bootstrap";

const Snackbar = ({ message, duration = 3000, type = 'default' }) => {
    const [show, setShow] = useState(true);
    const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#343a40';

    setTimeout(() => setShow(false), duration);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 9999,
            }}
        >
            <Toast show={show} onClose={() => setShow(false)} delay={duration} autohide style={{ backgroundColor: bgColor }}>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Snackbar;