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
  };

  // const handleLogin = () => {
  //   if (email && password && isValid) {
  //     navigate("/Edit");
  //   } else {
  //     // alert('Please fill in both email and password fields.');
  //     setShowAlert(true);
  //   }
  // };

  const handleLogin = async () => {
    if (email && password && isValid) {
      try {
        const response = await getForLogin("/user", email);
        console.log(`response din LogIn = ${response}`);
        if (response) {
          navigate("/Edit");
        } else {
          setShowAlert(true);
          console.log("sau aici");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      setShowAlert(true);
      console.log(" aici");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Log In</h1>
      {/* <form> */}
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
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Log In
        </Button>

        {/* </form> */}
      </Container>
      {showAlert && (
        <Alert variant="filled" severity="error" onClose={handleCloseAlert}>
          The credentials do not exist.
        </Alert>
      )}
    </div>
  );
}
