import { db } from "./firebase";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    setDoc,
    Timestamp,
    deleteDoc,
} from "firebase/firestore/lite";

export async function getPosts() {
    const postsCol = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCol);
    const postsList = postsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return postsList;
}

export async function getPost(id) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    return docSnap.data();
}

export async function getCurrentUserPosts(user) {
    if (!user) return new Error("Unknown user!");
    const q = query(collection(db, "posts"), where("user_uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const postsList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        date: doc.get("date").toDate(),
    }));
    return postsList;
}

export async function savePost(post) {
    const response = await setDoc(doc(collection(db, "posts")), {
        ...post,
        date: Timestamp.fromDate(new Date()),
    });
    return response;
}

export async function updatePost(post) {
    const response = await setDoc(doc(db, "posts", post.id), {
        ...post,
        date: Timestamp.fromDate(new Date()),
    });
    return response;
}

export async function deletePost(id) {
    const response = await deleteDoc(doc(db, "posts", id));
    return response;
}
