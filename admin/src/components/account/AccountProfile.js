import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import avt from "../../assets/images/admin.png";
import { useState, useEffect } from "react";
import axios from 'axios'
const user = {
  avatar: avt,
  city: "Thành phố Hồ Chí Minh",
  country: "Việt Nam",
  name: "Nguyên Con Heo",
};

const AccountProfile = (props) => {
  const id = localStorage.getItem("id").toString();
  const token = localStorage.getItem("accessToken").toString();
  const [user, setUser] = useState({})
  useEffect(() => {
    const getApiUrl = "https://tengu-nodejs.herokuapp.com/api/customer/find/" + id;
    axios.get(getApiUrl, { headers: { token: token } }).then((response) => {
      setUser(response.data);
    });
  });

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={avt}
            sx={{
              width: 56, height: 56
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.lastName +" "+ user.firstName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.address} ${user.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${moment().format("hh:mm A")} ${"GTM+7"}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default AccountProfile;
