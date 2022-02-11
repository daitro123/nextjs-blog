import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "../../components/DashboardLayout";
import { getCurrentUserPosts } from "../../utils/posts";
import { useAuth } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "date", headerName: "Date", width: 130 },
    {
        field: "edit",
        headerName: "Edit",
        width: 60,

        renderCell: (params) => {
            return <EditPostIcon params={params} />;
        },
    },
];

export default function MyPosts() {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);

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

function EditPostIcon(props) {
    return (
        <Link href={"/blog/" + props.params.row.id}>
            <div className="" style={{ cursor: "pointer" }}>
                <EditIcon index={props.params.row.id} />
            </div>
        </Link>
    );
}
