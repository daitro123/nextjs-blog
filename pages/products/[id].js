import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import Loading from "../../components/Loading";

export default function ProductPage(props) {
    const router = useRouter();
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error } = useSWR(`https://fakestoreapi.com/products/${router.query.id}`, fetcher);

    if (error) {
        return (
            <Container
                sx={{
                    minHeight: "80vh",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <Typography variant="h5" component="div" textAlign={"center"}>
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!data) return <Loading />;

    return (
        <Container
            sx={{
                minHeight: "80vh",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <Card sx={{ maxWidth: 1200, display: "flex", height: 400, marginTop: 10 }}>
                <CardMedia
                    sx={{ flex: "1 1 40%", objectFit: "contain" }}
                    component="img"
                    image={data.image}
                    alt={data.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" marginBottom={4}>
                        {data.title}
                    </Typography>
                    <Typography variant="h6" component="p" color="text.secondary" marginBottom={2}>
                        ${data.price}
                    </Typography>
                    <Typography component="p" color="text.secondary">
                        {data.description}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
//     const res = await fetch("https://fakestoreapi.com/products");
//     const posts = await res.json();

//     // Get the paths we want to pre-render based on posts
//     const paths = posts.map((post) => ({
//         params: { id: post.id.toString() },
//     }));

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
//     const product = await res.json();

//     // Pass post data to the page via props
//     return { props: { product } };
// }
