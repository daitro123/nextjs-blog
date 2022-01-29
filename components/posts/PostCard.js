import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { stripTags, truncateString } from "../../utils/utils";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";

export default function PostCard({ post }) {
    return (
        <Card sx={{ maxWidth: "100%" }}>
            {/* <CardMedia component="img" height="300" image={post.image} alt={post.title} /> */}
            <CardContent>
                <Link href={`blog/${post.id}`} passHref>
                    <MUILink color="#000" underline="none">
                        <Typography gutterBottom variant="h5" component="div">
                            {post.title}
                        </Typography>
                    </MUILink>
                </Link>
                <Typography variant="body2" color="text.secondary">
                    {truncateString(stripTags(post.content), 20)}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`blog/${post.id}`} passHref>
                    <Button size="small">Learn More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
