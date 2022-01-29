export default async function handler(req, res) {
    const {
        query: { id },
    } = req;

    await fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((json) => res.status(200).json(json))
        .catch((err) => res.status(404).json({ message: "Can't resolve", error: err }));
}
