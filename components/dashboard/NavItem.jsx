import { Button, ListItem, Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";

const NavItem = ({ href, icon, children }) => {
    const router = useRouter();
    const active = href ? router.pathname === href : false;

    return (
        <ListItem>
            <Link passHref href={href}>
                <Button
                    component="a"
                    startIcon={icon}
                    disableRipple
                    sx={{
                        backgroundColor: active && "rgba(255,255,255, 0.08)",
                        borderRadius: 1,
                        color: active ? "secondary.main" : "neutral.300",
                        fontWeight: active && "fontWeightBold",
                        justifyContent: "flex-start",
                        px: 3,
                        textAlign: "left",
                        textTransform: "none",
                        width: "100%",
                        "& .MuiButton-startIcon": {
                            color: active ? "secondary.main" : "neutral.400",
                        },
                        "&:hover": {
                            backgroundColor: grey[300],
                        },
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{children}</Box>
                </Button>
            </Link>
        </ListItem>
    );
};

export default NavItem;
