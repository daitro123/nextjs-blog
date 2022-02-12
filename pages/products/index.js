import { CircularProgress, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import dynamic from "next/dynamic";

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch(`https://fakestoreapi.com/products`);
            const data = await res.json();
            return data;
        };
        setLoading(true);
        getProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    if (loading) {
        return (
            <Container maxWidth="md">
                <Grid
                    container
                    spacing={2}
                    sx={{
                        my: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "60vh",
                    }}
                >
                    <CircularProgress />
                </Grid>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} sx={{ my: 5 }}>
                {products.map((product) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

// export async function getStaticProps() {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://fakestoreapi.com/products`);
//     const products = await res.json();

//     // Pass post data to the page via props
//     return { props: { products } };
// }

// trying out dynamic - no ssr, should work as client side
export default dynamic(() => Promise.resolve(Products), { ssr: false });
