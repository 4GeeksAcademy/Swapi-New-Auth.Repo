import React, { useEffect, useState } from "react";
import { Modal, Tab, Tabs, Form, Button } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";
import '../styles/registroUsuarios.css'



const RegistroUsuarios = ({ registroUsuarios, setRegistroUsuarios, updateRegisterStatus }) => {
    const [tabActiva, setTabActiva] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store, dispatch} = useGlobalReducer();
    const [isRegistered, setIsRegistered] = useState(!!store.token);
    


    useEffect(() => {
        //const token = localStorage.getItem("token");
        setIsRegistered(!!store.auth.token);
    }, [store.auth.token]);

    const handlelogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://effective-doodle-69rpw66jwp46357jw-3001.app.github.dev/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem("user_id", data.user_id);
                //setIsRegistered(true);
                dispatch({type: "SET_TOKEN", payload: data.access_token});
                dispatch({type: "SET_USER_ID", payload: data.user_id})
                
                setRegistroUsuarios(false);
                if (updateRegisterStatus) updateRegisterStatus();
                alert("Wellcome Back!");
            } else {
                throw new Error(data.message || "Login Error: Those are not the credentials we are looking for...");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://effective-doodle-69rpw66jwp46357jw-3001.app.github.dev/api/signup', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert("You are now a force user.");
                setTabActiva("Login");
            } else {
                throw new Error(data.message || "You are failing to comply with the required information.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('https://effective-doodle-69rpw66jwp46357jw-3001.app.github.dev/api/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                dispatch({type: "CLEAR_SESSION"});
                if (updateRegisterStatus) updateRegisterStatus();
                setRegistroUsuarios(false);
                setIsRegistered(false);
                alert("You are leaving, may the Force be with you...");
            } else {
                throw new Error("Logout Error.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Modal show={registroUsuarios} onHide={() => setRegistroUsuarios(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isRegistered ? "Log Out" : (tabActiva === "Login" ? "Log In" : "Sign Up")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isRegistered ? (
                    <div className="text-center">
                        <p>You are logged in.</p>
                        <Button variant="danger" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <Tabs
                        activeKey={tabActiva}
                        onSelect={(k) => setTabActiva(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="Login" title="Login">
                            <Form onSubmit={handlelogin}>
                                <Form.Group className="mb-3" controlId="formLoginEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="your@email.here"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLoginPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Access
                                </Button>
                            </Form>
                        </Tab>

                        <Tab eventKey="Signup" title="Sign Up">
                            <Form onSubmit={handleSignUp}>
                                <Form.Group className="mb-3" controlId="formSignupEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="your@email.here"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formSignupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default RegistroUsuarios;
