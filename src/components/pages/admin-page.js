import {Button, Form, OverlayTrigger, Tab, Tabs, Tooltip} from "react-bootstrap";
import {useState} from "react";
import {errorType, showSnackbar, successType} from "../../utils/snackbar-display";
import {post, put} from "../../api/api";
import {useNavigate} from "react-router-dom";
import {PersonFill} from "react-bootstrap-icons";
import {useAuthContext} from "../../context/auth-context";

export function AdminPage() {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailLibrarian, setEmailLibrarian] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswordLibrarian, setConfirmPasswordLibrarian] = useState("");

    const navigate = useNavigate();
    const { logout } = useAuthContext();

    const redirect = () => {
        navigate("/login");
    }

    const handleChangePassword = () => {

        if(newPassword !== confirmPassword) {
            showSnackbar("Passwords need to match", errorType);
            return;
        }
        const url = "admin/change-password";
        const body = {
            email: email,
            newPassword: newPassword
        };
        const response = () => {
            showSnackbar("Password changed", successType);
            setEmail("");
            setConfirmPassword("");
            setNewPassword("");
        };
        const error = () => {
            showSnackbar("Cannot change password", errorType);
        };
        put(url, {}, body, true, response, error, redirect);
    };

    const handleRegisterLibrarian = () => {
        if(password !== confirmPasswordLibrarian) {
            showSnackbar("Passwords need to match", errorType);
            return;
        }

        const url = "admin/register-librarian";
        const body = {
            firstname: firstName,
            lastname: lastName,
            email: emailLibrarian,
            password: password
        };
        const response = () => {
            showSnackbar("Created librarian account", successType);
            setFirstName("");
            setLastName("");
            setEmailLibrarian("");
            setPassword("");
            setConfirmPasswordLibrarian("");
        };
        const error = () => {
            showSnackbar("Cannot create librarian", errorType);
        };
        post(url, {}, body, true, response, error, redirect);
    }

    return <div>
        <Tabs defaultActiveKey="1">
            
            <Tab eventKey={"1"} title={"Change Password"}>
                <Form className={"mt-4 ms-4"}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleChangePassword}>
                        Confirm
                    </Button>
                </Form>
            </Tab>
            <Tab eventKey={"2"} title={"Librarian Account"}>
                <Form className={"mt-4 ms-4"}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="emailLibrarian">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={emailLibrarian}
                            onChange={(e) => setEmailLibrarian(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPasswordLibrarian">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPasswordLibrarian}
                            onChange={(e) => setConfirmPasswordLibrarian(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleRegisterLibrarian}>
                        Register
                    </Button>
                </Form>
            </Tab>
        </Tabs>
        <div className={"position-absolute top-0 end-0 me-2 mt-2"}>
            <OverlayTrigger placement={"bottom-start"} overlay={ <Tooltip>Logout</Tooltip>} >
                <PersonFill onClick={() => logout()} size={24} className={"text-primary text-clickable-grey"} />
            </OverlayTrigger>
        </div>
    </div>
}