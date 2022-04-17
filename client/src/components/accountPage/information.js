import React, { useState } from "react";
import {
    Paper,
    TextField,
    Button,
    Avatar,
    Box,
    Typography,
    Autocomplete
} from '@mui/material';
import Data from "../../dataJson/local.json";
import { useSelector } from "react-redux";

const Infomation = () => {
    const Account = useSelector(state => state.Account);
    const [fName, setFName] = useState(Account.account.firstName);
    const [lName, setLName] = useState(Account.account.lastName);
    const [phone, setPhone] = useState(Account.account.phone);
    const [email, setEmail] = useState(Account.account.email);
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    return (
        <Box>
            <Typography fontSize={30} textAlign="center" fontWeight="bold" sx={{ marginY: 3 }}>
                Thông Tin Của Tôi
            </Typography>
            <Box display="flex" sx={{ marginX: 8 }}>
                <Paper elevation={2} sx={{ width: 250, height: 150, p: 2, textAlign: "center", mr: 5 }}>
                    <Avatar sx={{ width: 100, height: 100, marginX: "auto", mb: 1 }}>P</Avatar>
                    <Typography
                        fontSize={24}
                    >
                        {/* {Account.account.firstName + " " + Account.account.lastName} */}
                        Lê Khánh Phương
                    </Typography>
                </Paper>
                <Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <TextField
                            required
                            size="small"
                            label="Họ"
                            // value={fName}
                            value="Lê"
                            onChange={(e, value) => setFName(value)}
                            sx={{ width: "49%" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            required
                            size="small"
                            label="Tên"
                            // value={lName}
                            value="Khánh Phương"
                            onChange={(e, value) => setLName(value)}
                            sx={{ width: "49%" }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <TextField
                        required
                        size="small"
                        label="Số điện thoại"
                        // value={phone}
                        value="0123456789"
                        onChange={(e, value) => setPhone(value)}
                        sx={{ width: 1, marginBottom: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        size="small"
                        label="Email"
                        // value={email}
                        value="lkphuong@gmail.com"
                        onChange={(e, value) => setEmail(value)}
                        sx={{ width: 1, marginBottom: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* <TextField
                        size="small"
                        label="Quốc gia"
                        value={country}
                        onChange={(e, value) => setCountry(value)}
                        sx={{ width: 1, marginBottom: 2 }}
                    /> */}
                    <Autocomplete
                        id="province-select"
                        size="small"
                        sx={{ width: 1, marginBottom: 2 }}
                        options={Data}
                        value={province}
                        // value="Phú Yên"
                        onChange={(e, value) => setProvince(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tỉnh thành"
                            />
                        )}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Autocomplete
                        disabled={province === null ? true : false}
                        id="district-select"
                        size="small"
                        value={district}
                        // value="Tuy Hòa"
                        sx={{ width: 1, marginBottom: 2 }}
                        options={province === null ? Data : province.districts}
                        onChange={(e, value) => setDistrict(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Quận Huyện"
                            />
                        )}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Autocomplete
                        disabled={district === null ? true : false}
                        id="ward-select"
                        size="small"
                        value={ward}
                        // value=". . ."
                        sx={{ width: 1, marginBottom: 2 }}
                        options={district === null ? Data : district.wards}
                        onChange={(e, value) => setWard(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Xã Phường"
                            />
                        )}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                        >
                            Cập nhật
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Infomation;
