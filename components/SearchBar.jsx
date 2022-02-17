import { FormControl, List, ListItem, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { v4 as uuid } from "uuid";
import React, { useState, useMemo } from "react";
import { debounce, truncateString } from "../utils/utils";

const SearchBar = ({ url }) => {
    const theme = useTheme();
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = (e) => {
        if (!e.target.value) return setSuggestions([]);

        fetch(url + e.target.value)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json.data && e.target.value) {
                    setSuggestions(json.data);
                } else {
                    setSuggestions([json.message]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", position: "relative" }}>
            <FormControl sx={{ width: "100%", marginTop: 5 }}>
                <TextField fullWidth placeholder="Search..." onChange={debouncedSearch} />
            </FormControl>
            <Box
                sx={{
                    display: suggestions.length > 0 ? "block" : "none",
                    border: "1px solid whitesmoke",
                    width: "100%",
                    position: "absolute",
                    background: "white",
                    boxShadow: theme.shadows[6],
                    borderRadius: "5px",
                    fontFamily: theme.typography.fontFamily,
                    zIndex: 5,
                }}
            >
                <List>
                    {suggestions
                        ?.map((item) => {
                            return (
                                <ListItem
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            color: "red",
                                            backgroundColor: "whitesmoke",
                                        },
                                    }}
                                    key={uuid()}
                                >
                                    {item.title ? truncateString(item.title, 5) : item}
                                </ListItem>
                            );
                        })
                        .slice(0, 10)}
                </List>
            </Box>
        </div>
    );
};

export default SearchBar;
