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
import { Box } from "@mui/system";

export default function PostCard({ post }) {
    return (
        <Card sx={{ maxWidth: "100%", display: "flex" }}>
            {/* <CardMedia component="img" height="300" image={post.image} alt={post.title} /> */}
            <Box sx={{ flex: "0 1 60%" }}>
                <CardContent>
                    <Link href={post.id ? `blog/${post.id}` : post.url} passHref>
                        <MUILink color="#000" underline="none">
                            <Typography gutterBottom variant="h5" component="div">
                                {post.title}
                            </Typography>
                        </MUILink>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        {post.content
                            ? truncateString(stripTags(post.content), 20)
                            : truncateString(stripTags(post.description), 20)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={`blog/${post.id}`} passHref>
                        <Button size="small">Learn More</Button>
                    </Link>
                </CardActions>
            </Box>

            <Box sx={{ flex: "0 1 40%" }}>
                <CardMedia
                    component="img"
                    src={
                        post.image ? post.image : "./images/markus-winkler-aId-xYRTlEc-unsplash.jpg"
                    }
                    height="100%"
                />
            </Box>
        </Card>
    );
}
