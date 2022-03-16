import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import axios from "axios";

const states = [
  {
    value: "Tp. HCM",
    label: "thành phố Hồ Chí Minh",
  },
  {
    value: "Hà Nội",
    label: "Hà Nội",
  },
];

const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    country: "",
  });
  const id = localStorage.getItem("id").toString();
  const token = localStorage.getItem("accessToken").toString();
  
  useEffect(() => {
    const getApiUrl = "https://tengu-nodejs.herokuapp.com/api/customer/find/" + id;
    axios.get(getApiUrl, { headers: { token: token } }).then((response) => {
      setValues(response.data);
    });
  }, []);


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  let updateInfomation = async () => {
    const putApiUrl = "https://tengu-nodejs.herokuapp.com/api/customer/" + id;

    //headle data
    if (
      values.email === null ||
      values.firstName === null ||
      values.lastName === null ||
      values.phone === null ||
      values.country === null ||
      values.address === null
    ) {
      alert("Không được để trống thông tin");
    } else {
      await axios
        .put(
          putApiUrl,
          {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            country: values.country,
            address: values.address,
          },
          { headers: { token: token } }
        )
        .then((response) => {
          alert("Cập nhật thông tin thành công");
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  };
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                name="firstName"
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                label="Last name"
                name="lastName"
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                label="Email Address"
                name="email"
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                name="phone"
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                label="Country"
                name="country"
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                label="Select State"
                name="address"
                required
                select
                SelectProps={{ native: true }}
                value={values.address}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            onClick={updateInfomation}
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
