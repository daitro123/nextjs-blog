import React from "react";
import { Container, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ErrorIcon from "@mui/icons-material/Error";
import ArticleIcon from "@mui/icons-material/Article";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { grey } from "@mui/material/colors";
import NavItem from "../components/dashboard/NavItem";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import NoSSR from "./NoSSR";
import withProtected from "./auth/withProtected";

const items = [
    {
        href: "/account",
        icon: <PersonIcon fontSize="small" />,
        title: "Account",
    },
    {
        href: "/my-posts",
        icon: <ArticleIcon fontSize="small" />,
        title: "My Posts",
    },
    {
        href: "/create-post",
        icon: <PostAddIcon fontSize="small" />,
        title: "Create Post",
    },
    {
        href: "/logout",
        icon: <LockIcon fontSize="small" />,
        title: "Logout",
    },
    {
        href: "/remove-account",
        icon: <PersonAddAltIcon fontSize="small" />,
        title: "Remove Account",
    },
];

const DashboardLayout = ({ children }) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    if (!currentUser) {
        router.push("/signin");
    }

    return (
        <NoSSR>
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
                    <Grid item xs={8} paddingX={2}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </NoSSR>
    );
};

export default withProtected(DashboardLayout);
