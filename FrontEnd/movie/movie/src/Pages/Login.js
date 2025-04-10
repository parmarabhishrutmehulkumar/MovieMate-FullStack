import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
    navigate('/home'); // Redirect to the home page after successful login
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://media.istockphoto.com/id/931194022/photo/cinema-concept-of-vintage-film-reels-clapperboard-and-other-tools.jpg?s=612x612&w=0&k=20&c=1svaLgsepcoCl4j3sXVqRVFEQqvZcs2RvZXPtblJFZc=')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#f8f9fa',
        fontFamily: '"Courier New", monospace',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="card"
        style={{
          borderRadius: '15px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div className="card-body p-5">
          <h2
            className="text-uppercase text-center mb-5"
            style={{ fontWeight: 'bold', letterSpacing: '2px', color: 'white' }}
          >
            Welcome Back!
          </h2>

          <form onSubmit={handleLogin}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                style={{
                  backgroundColor: '#121212',
                  color: 'white',
                  borderColor: '#444',
                }}
                placeholder="Enter your email"
              />
              <label
                className="form-label"
                htmlFor="email"
                style={{ color: '#aaa' }}
              >
                Email Address
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                style={{
                  backgroundColor: '#121212',
                  color: '#f8f9fa',
                  borderColor: '#444',
                }}
                placeholder="Enter your password"
              />
              <label
                className="form-label"
                htmlFor="password"
                style={{ color: '#aaa' }}
              >
                Password
              </label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label
                  className="form-check-label"
                  htmlFor="rememberMe"
                  style={{ color: '#bbb' }}
                >
                  Remember Me
                </label>
              </div>
              <a href="#!" style={{ color: '#f8d32d' }}>
                Forgot Password?
              </a>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-danger btn-lg"
                style={{
                  background: 'linear-gradient(to right, #b31217, #e52d27)',
                  border: 'none',
                  boxShadow: '0 4px 10px rgba(229, 45, 39, 0.6)',
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                }}
              >
                Login
              </button>
              <p className="small mt-4" style={{ color: '#bbb' }}>
                Don't have an account?{' '}
                <Link to="/" style={{ color: '#f8d32d' }}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;