export const getBaseImageUrl = (poster_path: string) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
}