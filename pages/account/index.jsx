import { ListItem, Typography, List } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

const Account = () => {
    const { currentUser } = useAuth();

    return (
        <DashboardLayout>
            <Box>
                <Typography component="h1">Name: {currentUser.displayName}</Typography>
                <List>
                    <ListItem>email: {currentUser.email}</ListItem>
                    <ListItem>registered: {currentUser.metadata.creationTime}</ListItem>
                </List>
            </Box>
        </DashboardLayout>
    );
};

export default Account;
