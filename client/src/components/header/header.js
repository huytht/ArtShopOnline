import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../tengu-logo.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from "@mui/icons-material/Search";

import SearchForm from "../searchBar/searchBar";

import { useDispatch, useSelector } from "react-redux";
import { actSetProduct, actAutoLogin, actSetCategory } from "../../actions/index";

const Header = () => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.Cart);
    const [redirect] = useState(false);

    const [openSearch, setOpenSearch] = useState(false);
    const onOpenSearch = () => setOpenSearch(true);
    const onCloseSearch = () => setOpenSearch(false);

    useEffect(() => {
        fetch("https://tengu-nodejs.herokuapp.com/api/product/")
            .then(res => res.json())
            .then((result) => {
                dispatch(actSetProduct(result));
            },
                (error) => {
                    alert("Error!");
                }
            )
    }, [dispatch]);
    useEffect(() => {
        fetch("https://tengu-nodejs.herokuapp.com/api/category/all")
            .then(res => res.json())
            .then((result) => {
                dispatch(actSetCategory(result));
            },
                (error) => {
                    alert("Error!");
                }
            )
    }, [dispatch]);
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            axios.post('https://tengu-nodejs.herokuapp.com/api/auth/time-expired', {}, { headers: { "token": token } })
                .then(response => {
                    if (response.data.status_code === 200) {
                        dispatch(actAutoLogin(response.data.data, token));
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [dispatch])
    return (
        <div className="header">
            {redirect ? <Redirect to="/" /> : ""}
            <SearchForm openSearch={openSearch} onCloseSearch={onCloseSearch} />
            <Box bgcolor="lightgray">
                <Container maxWidth="md" className="header__top__container">
                    <p className="header__top__phone">Hot Line: 0123456789</p>
                    <Box display="flex">
                        <Box className="header__top__text">Đăng nhập</Box>
                        <Box className="header__top__text">Đăng ký</Box>
                    </Box>
                </Container>
            </Box>
            <Box display="flex">
                <img src={Logo} className="header__logo" alt="Tengu-Thiết kế nội thất" />
            </Box>
            <Box m={1.5}><hr /></Box>
            <Box display="flex" justifyContent="space-between">
                <Container maxWidth="md" className="header__bot__container">
                    <Box display="flex" width="60%" justifyContent="space-between" mt={-1}>
                        <Link className="header__bot__text">HOME</Link>
                        <Link to="/" className="header__bot__text">PRODUCT</Link>
                        <Link className="header__bot__text">ABOUT US</Link>
                        <Link className="header__bot__text">CONTACT</Link>
                        <Link className="header__bot__text hot__sale">HOTSALE</Link>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={onOpenSearch}>
                            <SearchIcon />
                        </IconButton>
                        <Link to="/cart">
                            <IconButton aria-label="cart">
                                <Badge badgeContent={carts.allQuantity} color="info">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    </Box>
                </Container>
            </Box>
            <Box
                width="70px"
                height="1px"
                marginLeft="auto"
                marginRight="auto"
            >
                <hr style={{ border: "none", borderBottom: "3px solid red" }} />
            </Box>
        </div>
    );
}
export default Header;