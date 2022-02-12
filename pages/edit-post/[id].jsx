import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DashboardLayout from "../../components/DashboardLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Grid, Input, TextField } from "@mui/material";
import { Post, savePost, updatePost } from "../../utils/posts";
import { useAuth } from "../../context/AuthContext";
import { getPost } from "../../utils/posts";
import { useRouter } from "next/router";

const EditPost = (props) => {
    const [editorContent, setEditorContent] = useState("");
    const [title, setTitle] = useState("");
    const { currentUser } = useAuth();
    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
        getPost(id)
            .then((post) => {
                setTitle(post.title);
                setEditorContent(post.content);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSave = () => {
        const editedPost = { id, title, content: editorContent, user_uid: currentUser.uid };
        console.log(editedPost);
        updatePost(editedPost).then(() => {
            setEditorContent("");
            setTitle("");
        });
    };

    return (
        <DashboardLayout>
            <TextField
                onChange={(e) => setTitle(e.target.value)}
                id="standard-basic"
                label="Title"
                variant="standard"
                value={title}
                sx={{
                    marginBottom: 2,
                }}
            />
            <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} />
            <Button
                variant="contained"
                disabled={!editorContent && true}
                sx={{ marginTop: 1 }}
                onClick={handleSave}
            >
                Save
            </Button>
        </DashboardLayout>
    );
};

// dynamic turns off ssr, React Quill needs to use DomAPIs https://github.com/zenoamaro/react-quill/issues/185
// https://stackoverflow.com/questions/53139884/next-js-disable-server-side-rendering-on-some-pages

export default dynamic(() => Promise.resolve(EditPost), { ssr: false });
