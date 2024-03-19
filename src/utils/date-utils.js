
export const getReleaseYear = (releaseDate) => {
    const date = new Date(releaseDate);
    return date.getFullYear();
};