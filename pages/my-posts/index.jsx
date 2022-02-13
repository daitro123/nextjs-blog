import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "../../components/DashboardLayout";
import { deletePost, getCurrentUserPosts } from "../../utils/posts";
import { useAuth } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

export default function MyPosts() {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "title", headerName: "Title", width: 200 },
        { field: "date", headerName: "Date", width: 130 },
        {
            field: "edit",
            headerName: "Edit",
            width: 60,

            renderCell: (params) => {
                return (
                    <Link href={"/edit-post/" + params.row.id}>
                        <div className="" style={{ cursor: "pointer" }}>
                            <EditIcon index={params.row.id} />
                        </div>
                    </Link>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 60,

            renderCell: (params) => {
                return (
                    <div
                        className=""
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon index={params.row.id} />
                    </div>
                );
            },
        },
    ];

    const handleDelete = (id) => {
        deletePost(id)
            .then((res) => {
                console.log(res);
                setPosts(posts.filter((post) => post.id !== id));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCurrentUserPosts(currentUser).then((res) => {
            setPosts([...res]);
        });
    }, []);

    return (
        <DashboardLayout>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                />
            </div>
        </DashboardLayout>
    );
}
