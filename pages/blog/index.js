import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/posts/PostCard";
import { getPosts } from "../../utils/posts";

const Posts = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const posts = async () => {
            const posts = await getPosts();
            setPosts(posts);
        };

        posts().catch((err) => console.log(err));
    }, []);

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} sx={{ my: 5 }}>
                {posts.map((post) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <PostCard post={post} />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Posts;
