import { useState } from "react";
import "./index.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Demo user
  const validUser = {
    username: "admin",
    password: "12345",
    userId: 101,
    role: "Admin",
  };

  // Generate simulated token
  const generateToken = (userId, role) => {
    const payload = {
      userId: userId,
      role: role,
    };

    const token = btoa(JSON.stringify(payload));

    return token;
  };

  // Login function
  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (
      username === validUser.username &&
      password === validUser.password
    ) {
      // Generate token
      const token = generateToken(
        validUser.userId,
        validUser.role
      );

      // Store token
      localStorage.setItem("token", token);

      // Store logged-in user
      setUser({
        userId: validUser.userId,
        role: validUser.role,
      });
    } else {
      setError("Invalid username or password");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setUsername("");
    setPassword("");
  };

  // Protected Dashboard
  if (user) {
    return (
      <div className="container">
        <div className="dashboard">

          <h1>Dashboard</h1>

          <h3>Welcome!</h3>

          <p>
            <strong>User ID:</strong> {user.userId}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <p className="success">
            Login successful!
          </p>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    );
  }

  // Login Page
  return (
    <div className="container">

      <div className="login-box">

        <h1>Login System</h1>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

        </form>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <div className="demo">

          <h3>Demo Login</h3>

          <p>
            Username: <strong>admin</strong>
          </p>

          <p>
            Password: <strong>12345</strong>
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;