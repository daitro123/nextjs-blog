import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/posts/PostCard";
import { getPosts } from "../../utils/posts";
import { Masonry } from "@mui/lab";
import { uuid } from "uuidv4";

const Posts = ({ posts }) => {
    return (
        <Container maxWidth="md">
            <Masonry columns={2} spacing={2} sx={{ my: 5 }}>
                {posts.map((post) => {
                    return <PostCard post={post} key={uuid()} />;
                })}
            </Masonry>
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
