import React from "react";
import { Container, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ErrorIcon from "@mui/icons-material/Error";
import { grey } from "@mui/material/colors";
import NavItem from "../components/dashboard/NavItem";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const items = [
    {
        href: "/account",
        icon: <PersonIcon fontSize="small" />,
        title: "Account",
    },
    {
        href: "/settings",
        icon: <SettingsIcon fontSize="small" />,
        title: "Settings",
    },
    {
        href: "/logout",
        icon: <LockIcon fontSize="small" />,
        title: "LogOut",
    },
    {
        href: "/register",
        icon: <PersonAddAltIcon fontSize="small" />,
        title: "Register",
    },
    {
        href: "/404",
        icon: <ErrorIcon fontSize="small" />,
        title: "Error",
    },
];

const DashboardLayout = ({ children }) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    if (!currentUser) {
        router.push("/signin");
    }

    return (
        <Container>
            <Grid container marginTop={25}>
                <Grid item xs={4} sx={{ background: grey[200] }}>
                    {items.map((item) => {
                        return (
                            <NavItem key={item.title} href={item.href} icon={item.icon}>
                                {item.title}
                            </NavItem>
                        );
                    })}
                </Grid>
                <Grid item xs={8}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
};

export default DashboardLayout;
