import { Alert, Container } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, getForLogin, post } from "../api/Calls";


export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail =
      emailRegex.test(value) && value.endsWith("@stud.ase.ro");
    setIsValid(isValidEmail);
  };


  const handleSignIn = async () => {
    if (email && password && isValid) {
      try {
        const DBObject = {
            UserName: `${name}`, 
            UserEmail: `${email}`, 
            UserPassword: `${password}`
        };
        const response = await post("/user", DBObject);
        if(response){
            navigate("/Edit");
            console.log("User adaugat in baza de date");
        }else console.log("User-ul nu a fost adaugat in baza de date");
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign In</h1>
      <Container component="main" maxWidth="xs">
      <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          error={!isValid}
        />
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
        <Button variant="contained" color="primary" onClick={handleSignIn}>
          Sign In
        </Button>

      </Container>
      {/* {showAlert && (
        <Alert variant="filled" severity="error" onClose={handleCloseAlert}>
          The credentials do not exist.
        </Alert>
      )} */}
    </div>
  );
}