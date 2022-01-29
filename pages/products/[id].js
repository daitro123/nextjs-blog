import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProductPage({ product }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image="{product.image}" alt="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.image}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch("https://fakestoreapi.com/products");
    const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const product = await res.json();

    // Pass post data to the page via props
    return { props: { product } };
}
