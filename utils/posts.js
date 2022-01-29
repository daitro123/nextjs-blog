import { db } from "./firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore/lite";

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
