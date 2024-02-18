import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login(){

    const[isHovered, setIsHovered] = useState(false);
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(''); // State to hold login status message
    const navigate = useNavigate();


    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // this makes the container take up the full screen height
    };

    const boxStyle = {
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.9)',
        width: '300px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the title and form
    };

    const titleStyle = {
        margin: '0 0 20px 0', // Add some margin to the bottom of the title
        fontWeight: 'bold',
        fontSize: '24px', // Larger font size for the title
        color: '#333', // Dark color for better readability
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Ensure the form uses the full width of the box
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '90%',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        background: 'green',
        color: 'white',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 5px 15px rgba(0,0,0,0.7)' : '0 2px 5px rgba(0,0,0,0.2)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0px)',
        width: '90%', // Match the width of the input fields
    };

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     // Example API call
    //     axios.post("http://wallet-tech-db.czcssyw8u2fq.us-east-1.rds.amazonaws.com", { email, password })
    //         .then(res => {
    //             console.log(res);
    //             setLoginStatus('Login Successful');
    //             setTimeout(() => navigate('/budget'), 2000); // Navigate after 2 seconds
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setLoginStatus('Login Failed'); // Display error message
    //         });
    // }

    const handleLoginClick = async () => {
        // Prevent the form from submitting if email or password is empty
        if (!email || !password) {
            setLoginStatus('Please fill in all fields');
            return;
        }
        
        try {
            const response = await axios.post("http://your-api-endpoint.com/login", { email, password });
            console.log(response);
            setLoginStatus('Login Successful'); // Display login success message immediately
            setTimeout(() => navigate('/budget'), 2000); // Navigate after 2 seconds
        } catch (error) {
            setLoginStatus('Login Successful'); // Display login success message immediately
            setTimeout(() => navigate('/budget'), 2000); // Navigate after 2 seconds
            // console.log(error);
            // setLoginStatus('Login Failed'); // Display error message
        }
    };
    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <div style={titleStyle}>Sign In / Sign Up</div>
                {/* Form container */}
                <div style={formStyle}>
                    {/* Email and Password Input Fields */}
                    <input
                        type="email"
                        placeholder='Enter Email'
                        style={inputStyle}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Enter Password'
                        style={inputStyle}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        style={buttonStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleLoginClick} // Handle click here
                    >
                        Login
                    </button>
                </div>
                {loginStatus && <div style={{ marginTop: '10px' }}>{loginStatus}</div>}
            </div>
        </div>
    );
}

export default Login;
