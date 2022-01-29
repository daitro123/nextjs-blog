import { Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../../components/products/ProductCard";

const Products = ({ products }) => {
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

export async function getStaticProps() {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://fakestoreapi.com/products`);
    const products = await res.json();

    // Pass post data to the page via props
    return { props: { products } };
}

export default Products;
