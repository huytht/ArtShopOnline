import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  
  Paper,
  TextField,
  
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//import Checkbox from "@material-ui/core/Checkbox";
//import "./changePass.css";
import axios from "axios";
const ChangePass = () => {
  //const paperStyle = {padding: 20, height:'70vh', width: 300, margin: "20px auto"}
  //const btnSC = {}
  let [oldpassword, setOldPassword] = useState("");
  let [newpassword, setNewPassword] = useState("");
  let [newpassword2, setNewPassword2] = useState("");

  let setParams = (event) => {
    if (event.target.name === "oldpassword") {
      setOldPassword(event.target.value);
    }
    if (event.target.name === "newpassword") {
      setNewPassword(event.target.value);
    }
    if (event.target.name === "newpassword2") {
      setNewPassword2(event.target.value);
    }
  };


  let changepassword = async () => {
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("accessToken")
    const apiurl = "https://tengu-nodejs.herokuapp.com/api/customer/change-password/" + id;
    await axios
      .put(
        apiurl,
        {
          oldpassword: oldpassword,
          newpassword: newpassword,
          newpassword2: newpassword2,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        if (response.data.status_code === 200) {
          alert("Cập nhật mật khẩu thành công");
        } else {
          alert("Đổi mật khẩu thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid>
      <Paper elevation={10} className="paperStyle">
        <Grid align="center">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <br />
          <h2>Change Password</h2>
        </Grid>

        <br />
        <TextField
          label="PassWord"
          onChange={setParams}
          name="oldpassword"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
        />
        <br />
        <TextField
          label="New PassWord"
          onChange={setParams}
          name="newpassword"
          placeholder="Enter New Password"
          type="password"
          fullWidth
          required
        />
        <br />
        <TextField
          label="PassWord Confirm"
          onChange={setParams}
          name="newpassword2"
          placeholder=""
          type="Enter New Password"
          fullWidth
          required
        />

        {/* 
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="CheckdB"
                                color="primary"
                            />
                        
                        } 
                        label ="Remember me"
                    
                    
                    /> */}

        <br />
        <br />
        <br />

        <Grid className="btnSC">
          <Button
            className="bt"
            type="submit"
            color="primary"
             onClick={changepassword}
            variant="contained"
          >
            Save
          </Button>
          {/* <Button className="bt" type='submit' color='green' variant="contained"  >
                            Cancel
                        </Button> */}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ChangePass;
