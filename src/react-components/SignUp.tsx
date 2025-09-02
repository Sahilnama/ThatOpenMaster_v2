import React from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { sign } from 'three/examples/jsm/nodes/Nodes.js';

export function Login() {
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth();
    const navigate = useNavigate();

    // State variables for managing authentication state and user input
    const [authState, setAuthState] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');

    // Function to handle Google sign-in
    const signUpWithGoogle = async () => {
        setAuthState(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthState(false);
            });
    };

    // Function to handle email and password sign-in
    const signUpWithEmail = async () => {
        if (password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        setAuthState(true);
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(response =>{
                console.log(response.user.uid)
                navigate('/')
            })
            .catch(error =>{
                console.log(error);
                setError(error.message);
                setAuthState(false);
            })
    };
    return (
        <div style={{ backgroundColor: 'var(--background-100)',width: '40vw'}}>
            <div style={{ maxWidth: '300px', margin: '20px'}}>
                <h2>Sign Up</h2>
                <form
                    style={{ maxWidth: '280px', margin: '10px 0'}}
                    onSubmit={(e) => {
                        e.preventDefault();
                        signUpWithEmail();
                    }}
                >
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex',gap: '15px', marginTop: '10px' }}>
                    <button type="submit" className='blue-btn'>Login</button>
                    <img onClick={signUpWithGoogle} src="..\assets\Google SignIn_neutral\web_neutral_rd_SU.svg" alt="Sign in with Google" />
                    </div>
                </form>
                <hr />
                <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', marginTop: '10px' }}>
                <p>Existing user? <a style={{color: 'var(--primary400)', cursor: 'pointer' }}>Login</a></p>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}
