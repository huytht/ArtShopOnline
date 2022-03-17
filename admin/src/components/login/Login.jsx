import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { render } from "@testing-library/react";
export default function Login() {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  // let [isLogin, setLogin] = useState(localStorage.getItem("accessToken") != null)

  let setParams = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  let login = async () => {
    const url = "https://tengu-nodejs.herokuapp.com/api/auth/login/";
    if (email !== "" || password !== "") {
      await axios
        .post(url, {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.status_code === 404) {
            alert("Sai email hoặc password");
          } else {
            if(response.data.isAdmin === true) {
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("id", response.data._id);
              localStorage.setItem("email", response.data.email);
              localStorage.setItem("first", response.data.firstName);
              localStorage.setItem("lastname", response.data.lastName);
              localStorage.setItem("isAdmin", response.data.isAdmin);
              // alert("Đăng nhập thành công");
              history.replace("/admin")
            }
            else {alert("Sai email hoặc password");}
          }
        })
        .catch((err) => {
          console.log("err:"+ err);
        });
    } else {
      alert("Chưa nhập email hoặc password");
    }
  };
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  // var urlencoded = new URLSearchParams();
  // urlencoded.append("username", username);
  // urlencoded.append("password", password);

  // var requestOption = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: urlencoded,
  //     redirect:'follow'
  // };

  //     fetch("https://learn-api.jmaster.io:8443/api/login", requestOption)
  //         .then(response => {
  //             console.log(response)

  //             if (response.ok) {
  //                 return response.json()
  //             }

  //             throw new Error(response.status)
  //         })
  //         .then(result => {
  //             console.log(result)
  //             localStorage.setItem("accessToken", result.accessToken)
  //             //setLogin(true)
  //             history.replace("/admin")
  //         })
  //         .catch(error => {
  //             console.log('error', error)
  //             alert("Username, Password are wrong")
  //         });
  // }

  // const paperStyle = {padding: 20, height:'70vh', width: 300, margin: "20px auto"}
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  //const btnStyle={margin:'8px 0'}

  return (
    <Grid className="container">
      <Paper elevation={10} className="paperStyle">
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <br />
          <h2>Sign In</h2>
        </Grid>
        <br />

        <TextField
          label="Email"
          placeholder="Enter Email"
          name="email"
          onChange={setParams}
          fullWidth
          required
        />
        <br/>
        <br />
        <TextField
          label="Password"
          placeholder="Enter Password"
          name="password"
          type="password"
          onChange={setParams}
          fullWidth
          required
        />
        {/* <br />
        <FormControlLabel
          control={<Checkbox name="CheckdB" color="primary" />}
          label="Remember me"
        />
        <br /> */}
        <br/>
        <br/>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="btnStyle"
          onClick={login}
          fullWidth
        >
          Sign in
        </Button>
        {/* <Typography>
          <Link href="#">Forgot password</Link>
        </Typography>

        <Typography>
          {" "}
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography> */}
      </Paper>
    </Grid>
  );
}
