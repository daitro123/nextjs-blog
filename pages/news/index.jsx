import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PostCard from "../../components/posts/PostCard";
import { Masonry } from "@mui/lab";
import { v4 as uuid } from "uuid";
import SearchBar from "../../components/SearchBar";

const NewsList = () => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/news")
            .then((res) => res.json())
            .then((data) => setNews(data?.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <Container maxWidth="lg">
            <SearchBar url={"/api/news?search="} />
            <Masonry columns={2} spacing={2} sx={{ my: 5 }}>
                {news.map((post) => {
                    return <PostCard post={post} key={uuid()} />;
                })}
            </Masonry>
        </Container>
    );
};

export default NewsList;
