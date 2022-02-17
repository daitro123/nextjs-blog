import * as dataJson from "../../../utils/newsData.json";

const shortTimeOut = (func) => {
    setTimeout(func, 400);
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataJson);
        }, 2000);
    });
};

const getSearched = (searchQuery) => {
    return new Promise((resolve, reject) => {
        if (searchQuery) {
            const searchResult = dataJson.data
                .filter((item) => {
                    return item.title.toLowerCase().indexOf(searchQuery) != -1;
                })
                .slice(0, 10);

            if (searchResult.length > 0) {
                shortTimeOut(resolve({ pagination: { limit: 10 }, data: searchResult }));
            } else {
                shortTimeOut(reject("No items found"));
            }
        } else {
            shortTimeOut(reject("Empty query"));
        }
    });
};

export default async function handler(req, res) {
    const searchQuery = req.query.search;

    if (req.method === "GET") {
        if (searchQuery === undefined) {
            getAll()
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(404).json({ message: err }));
        } else {
            getSearched(searchQuery)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(404).json({ message: err }));
        }
    } else {
        res.status(404).json({ message: "Can't resolve" });
    }
}
