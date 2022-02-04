import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
    const { logOut, setCurrentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        logOut()
            .then(() => {
                setCurrentUser(null);
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <></>;
};

export default Logout;
