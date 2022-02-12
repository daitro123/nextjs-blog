import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/posts/PostCard";
import { getPosts } from "../../utils/posts";

const Posts = ({ posts }) => {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const posts = async () => {
    //         const posts = await getPosts();
    //         setPosts(posts);
    //     };

    //     posts().catch((err) => console.log(err));
    // }, []);

    console.log(posts);

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

export async function getStaticProps() {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    // const res = await fetch(`https://fakestoreapi.com/products`);
    // const products = await res.json();

    let posts = await getPosts();

    // weird issue https://github.com/vercel/next.js/issues/11993
    posts = JSON.parse(JSON.stringify(posts));

    // Pass post data to the page via props
    return { props: { posts } };
}

export default Posts;
