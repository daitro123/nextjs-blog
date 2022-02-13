import { red, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import AuthProvider from "../context/AuthContext";
import "../styles/globals.css";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: teal[500],
        },
        secondary: {
            main: red[200],
        },
    },
    typography: {
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default MyApp;
