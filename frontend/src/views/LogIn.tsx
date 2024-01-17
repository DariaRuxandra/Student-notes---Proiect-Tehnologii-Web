import { Alert, Container } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, getForLogin, post } from "../api/Calls";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail =
      emailRegex.test(value) && value.endsWith("@stud.ase.ro");
    setIsValid(isValidEmail);
    // const a = markdownify("i want to sleep");
  };

  const handleLogIn = async () => {
    if (email && password && isValid) {
      try {
        const response = await getForLogin("/user", email, password);
        if (response) {
          localStorage.setItem("id", response.UserId);
          navigate("/Edit");
        } else {
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="login-component">
      <h1>Log In</h1>
      <Container component="main" maxWidth="xs">
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          error={!isValid}
          helperText={
            !isValid && "Please enter a valid @stud.ase.ro email address"
          }
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#ec729c", marginTop: "25px" }}
          onClick={handleLogIn}
        >
          Log In
        </Button>

        <p>
          If you don't have an account, make sure to{" "}
          <a href="/SignIn">Sign up</a>
        </p>
      </Container>
      {showAlert && (
        <Alert variant="filled" severity="error" onClose={handleCloseAlert}>
          The credentials do not exist.
        </Alert>
      )}
    </div>
  );
}
