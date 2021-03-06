import React, { useState } from "react";
import dynamic from "next/dynamic";
import DashboardLayout from "../../components/DashboardLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Grid, Input, TextField } from "@mui/material";
import { margin } from "@mui/system";
import { Post, savePost } from "../../utils/posts";
import { useAuth } from "../../context/AuthContext";
import withProtected from "../../components/auth/withProtected";

const CreatePost = (props) => {
    const [editorContent, setEditorContent] = useState("");
    const [title, setTitle] = useState("");
    const { currentUser } = useAuth();

    const handleSave = () => {
        const newPost = { title, content: editorContent, user_uid: currentUser.uid };
        console.log(newPost);
        savePost(newPost).then(() => {
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

export default dynamic(() => Promise.resolve(CreatePost), { ssr: false });
