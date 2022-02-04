import { ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { currentUser } = useAuth();

    return (
        <Box>
            <Typography component="h1">Name: {currentUser.displayName}</Typography>
            <List>
                <ListItem>email: {currentUser.email}</ListItem>
                <ListItem>registered: {currentUser.metadata.creationTime}</ListItem>
            </List>
        </Box>
    );
};

export default Profile;
