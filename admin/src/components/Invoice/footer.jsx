import React from 'react'

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Typography } from '@material-ui/core';


export default function Footer() {
    return (
        <Typography>

								<Box
                                width="50px"
                                borderBottom="3px solid"
                                marginTop="8px"
                                marginBottom="8px"
                            />
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <AddLocationIcon/>
                                <Box ml={1}>
                                    Địa chỉ: 351A Lạc Long Quân, phường 5, quận 11, thành phố Hồ Chí Minh
                                </Box>
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <PhoneIcon />
                                <Box ml={1}>
                                    Hotline 1: 0123456789
                                </Box> 
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <PhoneIcon />
                                <Box ml={1}>
                                    Hotline 2: Chưa có
                                </Box> 
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <PhoneIcon />
                                <Box ml={1}>
                                    SĐT: 0987654321
                                </Box>  
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <EmailIcon />
                                <Box ml={1}>
                                    Email: info@tengu_vn.com.vn
                                </Box>  
                            </Box>
								</Typography>
    )
}
