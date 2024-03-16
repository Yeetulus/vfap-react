import {Link} from "react-router-dom";

export function NotFoundPage() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div>
                <h1 style={{ marginTop: "10px", marginLeft: "10px", textAlign: "center" }}>Page not found</h1>
                <p style={{ textAlign: "center", marginTop: "15px" }}>Sorry, the page you are looking for does not exist.</p>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}