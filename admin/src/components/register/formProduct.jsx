import { Grid } from "@material-ui/core";
//import { image } from "faker";
import React, { useState, useEffect } from "react";
import { useForm, Form } from "./useForm";
import Controls from "../control/Controls";
import * as employeeService from "./employeeService";
import axios from "axios";

// import FormData from 'form-data'

const initialFvalues = {
  Photo: "",
  name: "",
  price: "",
  discount: "",
  size: "",
  categoryi: "",
  quality: "",
  Description: "",
};

export default function EmployeeForm() {
//   const { values, setValues, errors, setErrors, handleChange, resetForm } =
//     useForm(initialFvalues);
  // const {
  //     values,
  //     setValues,
  //     errors,
  //     handleInputChange
  // } = useForm(initialFvalues);

  const [values, setValues] = useState({
    title: "",
    desc: "",
    category: "",
    size: "",
    price: 0,
    discount_rate: "",
    amount: 0
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };


  const createProductUrl = "https://tengu-nodejs.herokuapp.com/api/product/";
  const token = localStorage.getItem("accessToken");

  const [image, setImage] = useState("");

  let createProduct = () => {

    if (values.title === "" ||   values.price === "" || values.category === "" ||  values.size === "" ||  image === "") {
      alert("Đã xảy ra lỗi")
    }
    else {

    console.log(values)
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dhdxn5ok");
    data.append("cloud_name", "apk solution");
    fetch("https://api.cloudinary.com/v1_1/apk-slution/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        axios.post(createProductUrl, {
            title: values.title,
            desc: values.desc,
            price: values.price,
            category: values.category,
            size: values.size,
            amount: values.amount,
            discount_rate: values.discount_rate,
            img: data.secure_url,
            cloudinary_id: data.public_id
        }, {headers: {token: token}}).then((result) => {alert("Thêm sản phẩm thành công")})
      })
      .catch((err) => {console.log(err); alert("Đã xảy ra lỗi")});
  };
}
  return (
    <Form>
      <Grid  container spacing={3}>
        <Grid item xs={12} md={12} >
          {/* <TextField
                        variant= "outlined"
                        label="Photo"
                        name="photo"
                        values = {values.Photo}
                        onChange={handleInputChange}
                    /> */}

          <Controls.Input
            name="title"
            label="Name"
            value={values.title}
            onChange={handleChange}
          />
          </Grid>
          
          {/* <div style={{ margin: "theme.spacing(0.5)" }}> */}
          <Grid item xs={12} md={12} >
            <Controls.Input
              variant="outlined"
              label="Price"
              name="price"
              type="numeric"
            //   error={errors.price}
              values={values.price}
              onChange={handleChange}
              variant="outlined"
            />
            </Grid>
           
           
          {/* </div> */}
          <Grid item xs={12} md={12} >
          <Controls.Input
            name="size"
            label="Size"
            type="text"
            value={values.size}
            onChange={handleChange}
          />
          </Grid>
          <Grid item xs={12} md={12} >
          <Controls.Input
            label="Photo"
            name="img"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setImage(e.target.files[0])}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Controls.Input
            name="discount_rate"
            label="Discount"
            value={values.discount_rate}
            onChange={handleChange}
          />
          
          </Grid>
          <Grid item xs={12} md={12} >
            <Controls.Input
              name="amount"
              label="Quality"
              type="numeric"
            //   error={errors.price}
              value={values.amount}
              onChange={handleChange}
              variant="outlined"
            />
            </Grid>
          {/* <Controls.DateC
                        name="createAt"
                        label="CreateAt"
                        value= {values.createAt}
                        onChange={handleChange}

                    /> */}
          <Grid item xs={12} md={12} >
          <Controls.Select
            
            name="category"
            label="Category"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.category}
            onChange={handleChange}
            options={employeeService.getDepartmentCollection()}
          />
          </Grid>
          <Grid item xs={12} md={12} >
          <Controls.Input
            name="desc"
            label="Description"
            type="text"
            rowsmax={3}
            rows={2}
            multiline
            value={values.desc}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}

            // error={errors.Description}
            variant="outlined"
          />
          </Grid>
          <div>
            <Controls.Button
              // type="submit"
              text="Submit"
              onClick={createProduct}
            />
           
          </div>
        </Grid>
     
    </Form>
  );
}
