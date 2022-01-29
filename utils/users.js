import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export async function getUsers() {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    return usersList;
}
