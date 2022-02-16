import * as dataJson from "../../../utils/newsData.json";

const simulatedAPI = (searchString) => {
    return new Promise((resolve, reject) => {
        if (searchString) {
            const searchResult = dataJson.data
                .filter((item) => {
                    return item.title.toLowerCase().indexOf(searchString) != -1;
                })
                .slice(0, 10);

            if (searchResult.length > 0) {
                setTimeout(() => {
                    resolve({ pagination: { limit: 10 }, data: searchResult });
                }, 400);
            } else {
                setTimeout(() => {
                    reject("No items found");
                }, 400);
            }
        } else {
            setTimeout(() => {
                resolve(dataJson);
            }, 2000);
        }
    });
};

export default async function handler(req, res) {
    const {
        query: { search },
    } = req;

    if (req.method === "GET") {
        simulatedAPI(search)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(404).json({ message: err }));
    } else {
        res.status(404).json({ message: "Can't resolve" });
    }
}
