import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import {  MenuItem, MenuList } from "@mui/material";
import {Link,Route,Routes} from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import "./Sidebar.css";
import Dashboard from "../Dashboard/Dashboard";
import Page from "../Page/Page";

const drawerWidth = 250;

export default function Sidebar() {
    const navigate = useNavigate();
    let id = localStorage.getItem('userDetails');
    let token = localStorage.getItem('token');
    useEffect(() => {
        if (token !== null) {
            fetch(`/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }).then(
                (resp) => {
                    if (resp.status !== 200) {
                        navigate('/')
                    }
                    else {
                        resp.json().then((result) => {
                            // console.log("Admin", result)
                            // console.log(result.category)
                            // // setDetails(result);
                            // setprofilePic(result.profileimage);

                        });
                    }
                })
        }
        else {
            navigate('/')
        }
    }, [])

    const { windows } = {};
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    let curPage = window.location.href.split("/")
    const [open1, setOpen1] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/dashboard")
    const [open2, setOpen2] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/page")
    const handleActive1 = () => {
        setOpen1(true)
        setOpen2(false)
        // setOpen3(false)
        // setOpen4(false)
        // setOpen5(false)
        // setOpen6(false)
        // // setOpen7(false)
        // setOpen8(false)
        // setOpen9(false)
        // setOpen10(false)
    }
    const handleActive2 = () => {
        setOpen1(false)
        setOpen2(true)
        // setOpen3(false)
        // setOpen4(false)
        // setOpen5(false)
        // setOpen6(false)
        // // setOpen7(false)
        // setOpen8(false)
        // setOpen9(false)
        // setOpen10(false)
    }
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <MenuList>
                <div>
                    {/* dashboard */}
                    <MenuItem>
                        <Link to="/main/dashboard" className={open1 ? "active text-decoration-none text-white" : "activated text-decoration-none text-white"}  onClick={handleActive1}><a className={open1 ? "sidenavselected dashboard icon text-decoration-none text-white" : "sidenav dashboard icon text-decoration-none text-white"}>Dashboard</a></Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/main/page" className={open2 ? "active text-decoration-none text-white" : "activated text-decoration-none text-white"}  onClick={handleActive2}><a className={open2 ? "sidenavselected page icon text-decoration-none text-white" : "sidenav page icon text-decoration-none text-white"}>Page</a></Link>
                    </MenuItem>
                </div>
            </MenuList>

            <Divider />
        </div>
    );

    const container =
        windows !== undefined ? () => windows().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: "#212529",
                    backdropFilter: "blur(30px)",
                    border: "1px solid #2E2E2E",
                    height: "64px",
                }}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="d-inline-flex py-2 h-100 w-100 mt-2 fs-4 fw-bold">Daily Task Management</div><br />
                    <button className="btn btn-danger rounded-1 w-20-custom align-items-center d-flex" onClick={logout}><span className="d-lg-block d-none ">Logout</span> <LogoutIcon className="justify-content-center text-center ms-2" /></button>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            backgroundColor: "#18191A !important",
                            border: "1px solid #212529 !important",
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            boxSizing: "border-box",
                            backgroundColor: "#18191A !important",
                            border: "1px solid #212529 !important",
                            width: drawerWidth
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />
                <Routes>
          <Route path="/main/dashboard" element={<Dashboard/>}/>
          <Route path="/main/page" element={<Page/>}/>
          {/* <Route path="/main/profile" element={<Profile/>}/> */}
       </Routes>
            </Box>
        </Box>
    )




    async function logout() {
        // Clear token (if applicable)
        localStorage.removeItem('token');
        localStorage.clear();
        window.localStorage.clear();
        navigate('/')
        // Display a logout confirmation message or perform any other necessary actions
    };

}