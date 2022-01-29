import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { truncateString } from "../../utils/utils";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";

export default function ProductCard({ product }) {
    return (
        <Card sx={{ maxWidth: "100%" }}>
            <CardMedia component="img" height="300" image={product.image} alt={product.title} />
            <CardContent>
                <Link href={`products/${product.id}`} passHref>
                    <MUILink color="#000" underline="none">
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                    </MUILink>
                </Link>
                <Typography variant="body2" color="text.secondary">
                    {truncateString(product.description, 20)}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`products/${product.id}`} passHref>
                    <Button size="small">Learn More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
