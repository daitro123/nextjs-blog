import { FormControl, List, ListItem, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import uuid from "draft-js/lib/uuid";
import React, { useState, useMemo } from "react";
import { debounce, truncateString } from "../utils/utils";

const SearchBar = ({ url }) => {
    const theme = useTheme();
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
        fetch(url + event.target.value)
            .then((res) => res.json())
            .then((json) => {
                if (json.data) {
                    setSuggestions(json.data);
                } else {
                    setSuggestions([]);
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
                    display: searchInput ? "block" : "none",
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
                    {suggestions.length > 0 ? (
                        suggestions.map((item) => {
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
                                    {truncateString(item.title, 5)}
                                </ListItem>
                            );
                        })
                    ) : (
                        <ListItem>No articles found</ListItem>
                    )}
                </List>
            </Box>
        </div>
    );
};

export default SearchBar;
