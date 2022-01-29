import Layout from "../components/Layout";
import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthProvider from "../context/AuthContext";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#005248",
        },
        secondary: {
            main: "#FABB51",
        },
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
