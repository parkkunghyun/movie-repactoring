const STORAGE_KEY="likedMovies";

export const getLikedMovies = () : any[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export const toggleLikeMovie = (movie: any) => {
    const liked = getLikedMovies();
  const exists = liked.find((m) => m.id === movie.id);

  let updated;
  if (exists) {
    updated = liked.filter((m) => m.id !== movie.id);
  } else {
    updated = [...liked, movie];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}