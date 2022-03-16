import React, { useState } from 'react';
import { makeStyles, } from "@material-ui/core"
//import { padding } from '@mui/system';


export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
   // if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  };
}


const useStyle = makeStyles( theme => ({
    root: {
        '& .MuiFormControl-root':{
            with: '80%',
            margin: theme.spacing(1)
            
        }
    }
}))

export function Form(props) {
    const classes  = useStyle();
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other} className={classes.root}>
      {props.children}
    </form>
  );
}