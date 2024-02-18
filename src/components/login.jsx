import React, {useState} from 'react'

function Login(){

    const[isHovered, setIsHovered] = useState(false);
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

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

    function handleSubmit(event){
        event.preventDefault();
        // Here, you would handle the form submission, such as validating the input and potentially signing the user in or redirecting them.
    }

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <div style={titleStyle}>Sign In / Sign Up</div>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label htmlFor="email">Email </label>
                        <input type="email" placeholder='Enter Email' style={inputStyle} onChange={e=>setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password </label>
                        <input type="password" placeholder='Enter Password' style={inputStyle} onChange={e=>setPassword(e.target.value)}></input>
                    </div>
                    <button style={buttonStyle}
                    onMouseEnter={()=>setIsHovered(true)}
                    onMouseLeave={()=>setIsHovered(false)}
                    >Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
