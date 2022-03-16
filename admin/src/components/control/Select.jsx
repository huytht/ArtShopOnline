import React from 'react'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core"

export default function Select(props) {
    
    const { name , label , value, onChange, options, ...other} = props;
    
    return (
        <FormControl
        style={{minWidth: "100%"}}
            variant="outlined">
                <InputLabel>{label}</InputLabel>
                <MuiSelect 
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...other}
                >
                    <MenuItem value="">None</MenuItem>
                    {
                        options.map(
                            item => ( <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                        )
                    }
                </MuiSelect>
        </FormControl>
        
    )
}
