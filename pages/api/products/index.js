// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    if (req.method === "GET") {
        await fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => res.status(200).json(json));
    } else {
        res.status(404).json({ message: "Can't resolve" });
    }
}
