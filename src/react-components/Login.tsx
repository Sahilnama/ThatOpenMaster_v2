import React from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
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
    const [error, setError] = React.useState('');

    // Function to handle Google sign-in
    const signInWithGoogle = async () => {
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
    const signInWithEmail = async () => {
        setAuthState(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
                setAuthState(false);
            });
    };
    return (
        <div style={{ backgroundColor: 'var(--background-100)',width: '40vw'}}>
            <div style={{ maxWidth: '300px', margin: '20px'}}>
                <h2>Login</h2>
                <form
                    style={{ maxWidth: '280px', margin: '10px 0'}}
                    onSubmit={(e) => {
                        e.preventDefault();
                        signInWithEmail();
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
                    <img onClick={signInWithGoogle} src="..\assets\Google SignIn_neutral\web_neutral_rd_SI.svg" alt="Sign in with Google" />
                    </div>
                </form>
                <hr />
                <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', marginTop: '10px' }}>
                <p>Not an existing user? <a style={{color: 'var(--primary400)', cursor: 'pointer' }}>Sign up</a></p>
                </div>
                {error && <p style={{ color: 'red' }}>{error} You may use Email: user@bimdesk.com and Password: user001 to run test</p>}
            </div>
        </div>
    );
}

export function Logout() {
    const auth = getAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        auth.signOut().then(() => {
            navigate('/login');
        });
    }, [auth, navigate]);

    return <p>Logging out...</p>;
}
