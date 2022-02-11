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
} from "firebase/firestore/lite";

export class Post {
    constructor(title, content, user_uid) {
        this.date = Timestamp.fromDate(new Date());
        this.title = title;
        this.content = content;
        this.user_uid = user_uid;
    }
}

export async function getPosts() {
    const postsCol = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCol);
    const postsList = postsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(postsList);
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
    const q = query(collection(db, "posts"), where("user_uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const postsList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        date: doc.get("date").toDate(),
    }));
    return postsList;
}

export async function savePost(post) {
    const response = await setDoc(doc(collection(db, "posts")), { ...post });

    return response;
}
