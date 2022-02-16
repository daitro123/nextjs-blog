import React from "react";
import { Container, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Container
            sx={{
                minHeight: "80vh",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <CircularProgress />
        </Container>
    );
};

export default Loading;
