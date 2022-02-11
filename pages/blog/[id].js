import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { getPost } from "../../utils/posts";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

// only using standard react client side fetching

const Post = (props) => {
    const [post, setPost] = useState({});
    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
        const post = async () => {
            const post = await getPost(id);
            setPost(post);
        };

        post().catch((err) => console.log(err));
    }, []);

    return (
        <Container maxWidth="md">
            <main>
                <Container spacing={5} sx={{ mt: 3 }}>
                    <Typography gutterBottom variant="h2" component={"h1"} marginTop={15}>
                        {post.title}
                    </Typography>

                    <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        style={{ fontSize: "1.25rem" }}
                    ></div>
                </Container>
            </main>
        </Container>
    );
};

export default Post;
