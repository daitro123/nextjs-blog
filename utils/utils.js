export const truncateString = (string, words = 1) => {
    const arr = string.split(" ");

    if (arr.length > words) {
        return arr.slice(0, words).join(" ") + "...";
    }

    return string;
};

export const stripTags = (string) => {
    return string.replace(/(<([^>]+)>)/gi, "");
};

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}
