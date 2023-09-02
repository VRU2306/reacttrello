import "./Login.css";
import { useState, useEffect } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { CssBaseline, Container } from "@mui/material";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        fontFamily: "Inter"

    },
});
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [toast, setToast] = useState('data')
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginEmail = (event) => {
        setEmail(event.target.value);
    }

    const loginPassword = (event) => {
        setPassword(event.target.value);

    }
    return (
        <div>
            <div className="d-flex border-bottom border-dark">
                <div className="d-inline-flex p-3 h-100 w-100 ms-5 mt-2 fs-4 fw-bold">Daily Task Management</div><br />
            </div>
            <div className="container" elevation={10}>
                <div className="text-center align-tems-center mt-5 ">
                    <div className="fs-2">Log In</div><br />
                </div>

                <ValidatorForm
                    onSubmit={SignIn}
                >
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Container maxWidth="xs" className="mt-5">
                            <div className='mt-3 '>
                                {/* <span className="text-pro">Email</span><br /> */}
                                <TextValidator
                                    label="Email"
                                    onChange={loginEmail}
                                    size="small"
                                    name="email"
                                    className='w-100'
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                />
                            </div>
                            {/* <br /> */}
                            <div className="mt-3">
                                <TextValidator
                                    size="small"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={loginPassword}
                                    name="password"
                                    className='w-100'
                                    value={password}
                                    validators={['required', 'minStringLength:6', 'matchRegexp:[A-Z]', 'matchRegexp:[0-9]', 'matchRegexp:[!@#$%^&*(),.?":{}|<>~`/|+_-]']}
                                    errorMessages={['This field is required', 'Password Must be atleast 6 characters long', 'Must include Capital letter', 'Must Include a number', 'Must include a Special Character']}
                                    placeholder='6+ characters'
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff className='text-secondary' /> : <Visibility className='text-primary' />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    }
                                />
                            </div>
                            <Link to="/PasswordReset" className="text-decoration-none d-flex justify-content-end text-primary">Forgot Password ?</Link>


                            <button className='btn btn-primary rounded-1 mt-3 w-100 text-white' type="submit">Login</button>
                            <br />
                            {
                                toast === "Fail" && toast !=='data' ? (
                                    <p className="text-danger text-center mt-2">Invalid Login Credentials. Please Try Again</p>
                                ) : ''
                            }
                            <br />
                        </Container>


                        <span className="d-flex justify-content-center">First Time here? <Link to="/register" className="text-decoration-none text-primary ms-1">Create Your Account</Link></span><br />
                    </ThemeProvider>
                </ValidatorForm>
            </div>
        </div>
    )



    async function SignIn(e) {
        e.preventDefault();
        const requestOptions = {
            // credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailOrMobile: email, password: password })
        };
        let response = await fetch('/api/users/login', requestOptions);
        let res = await response.json();
        try {
            // if (res.status === 200) {
            // setToast('Success')
            // console.log(res, toast)

            localStorage.setItem("token", res?.id)
            localStorage.setItem("userDetails", res.userId)
            // console.log(toast, setToast)
            window.location.href = ("/main/dashboard");
            // }
            if (res.status !== 200) {
                setToast('Fail')
                return "Server Error"
            }
        }
        catch (err) {
            console.log(err)
            return err;
        }

    }

}


