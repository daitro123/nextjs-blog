import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";

export default function SignUp() {
    const { signUp, currentUser, updateUser } = useAuth();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const emailRef = useRef();
    const router = useRouter();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // eslint-disable-next-line no-console
        console.log(passwordRef.current.value, confirmPasswordRef.current.value);

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords don't match");
        }

        try {
            setError("");
            setLoading(true);
            const res = await signUp(emailRef.current.value, passwordRef.current.value);
            const update = await updateUser({
                displayName: fnameRef.current.value + " " + lnameRef.current.value,
            });
            console.log(res);
            router.push("/");
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="fname"
                                label="First Name"
                                name="fname"
                                autoComplete="given-name"
                                inputRef={fnameRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="lname"
                                label="Last Name"
                                type="text"
                                id="lname"
                                autoComplete="family-name"
                                inputRef={lnameRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={emailRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                inputRef={passwordRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                inputRef={confirmPasswordRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {error && <Alert severity="error">{error}</Alert>}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-center">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
