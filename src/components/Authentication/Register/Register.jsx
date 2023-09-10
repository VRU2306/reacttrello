import "./Register.css";
import { useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Container } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        fontFamily: "Inter"

    },
});
export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [output, setOutput] = useState('data')
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // firstName
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');

    const RegisterFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const RegisterLastName = (event) => {
        setLastName(event.target.value);
    }

    const RegisterEmail = (event) => {
        setEmail(event.target.value);
    }

    const RegisterMobile = (event) => {
        setMobile(event);
    }

    const RegisterPassword = (event) => {
        setPassword(event.target.value);
    }
    return (
        <div>
            <div className="d-flex border-bottom border-dark">
                <div className="d-inline-flex p-3 h-100 w-100 ms-5 mt-2 fs-4 fw-bold">Daily Task Management</div><br />
            </div>
            <div className="container" elevation={10}>
                <div className="text-center align-tems-center mt-5 ">
                    <div className="fs-2">Sign Up </div><br />
                </div>

                <ValidatorForm
                    onSubmit={Register}
                >
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Container maxWidth="xs" className="mt-5">
                            <div className='mt-3 '>
                                {/* <span className="text-pro">Email</span><br /> */}
                                <TextValidator
                                    label="FirstName"
                                    onChange={RegisterFirstName}
                                    size="small"
                                    name="firstName"
                                    placeholder='Enter your Firstname'
                                    className='w-100'
                                    value={firstName}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </div>
                            {/* <br /> */}
                            <div className="mt-3">
                                <TextValidator
                                    label="LastName"
                                    onChange={RegisterLastName}
                                    size="small"
                                    name="firstName"
                                    placeholder='Enter your Lastname'
                                    className='w-100'
                                    value={lastName}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </div>
                            <div className='mt-3 '>
                                {/* <span className="text-pro">Email</span><br /> */}
                                <TextValidator
                                    label="Email"
                                    onChange={RegisterEmail}
                                    size="small"
                                    name="email"
                                    className='w-100'
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                {/* <span className="text-pro">Email</span><br /> */}
                                <MuiTelInput
                                    label="Mobile"
                                    defaultCountry="IN"
                                    onChange={RegisterMobile}
                                    size="small"
                                    name="mobile"
                                    className='w-100'
                                    value={mobile}
                                    required
                                    validators={['required']}
                                    errorMessages={['this field is required',]}
                                />
                            </div>
                            {/* <br /> */}
                            <div className="form-group mt-3">
                                <TextValidator
                                    size="small"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={RegisterPassword}
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
                            <button className='btn btn-primary rounded-1 mt-3 w-100 text-white' type="submit">Sign Up</button>


                            {
                                output === "Success" ? (
                                    <p className="text-success text-center mt-2">Sign Up SuccessFull ! Head over to <Link to="/" className="text-decoration-none">Login</Link></p>

                                ) : ""

                            }
                            {
                                output === "Fail" && output !== 'data' ? (
                                    <p className="text-danger text-center mt-2">Email or Phone Number already registered ! Please try again </p>
                                ) : ""
                            }
                        </Container>


                        <span className="d-flex justify-content-center mt-3">Already a Member? <Link to="/" className="text-decoration-none text-primary ms-1">Login </Link></span><br />
                    </ThemeProvider>
                </ValidatorForm>
            </div>
        </div>
    )



    async function Register(e) {
        e.preventDefault();
        const requestOptions = {
            // credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                type: 'User',
                confirmPassword: password,
                mobile: mobile?.toString().replace(/\s/g, '')
            })
        };
        let response = await fetch('/api/users', requestOptions);
        let res = await response.json();
        console.log(response, res, 208)
        try {
            if (response.status === 200 && res.isExistingUser === false) {
                setOutput('Success')
            }
            else {
                setOutput('Fail')
            }
            if (res.status !== 200) {
                return "Server Error"
            }
        }
        catch (err) {
            console.log(err)
            return err;
        }

    }

}


