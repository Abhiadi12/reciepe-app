export const getAverageRating = (ratings) => {
  if (!ratings || !ratings.length) return 0;
  const totalRating = ratings.reduce((acc, rating) => acc + rating?.score, 0);
  return (totalRating / ratings.length).toFixed(1);
};
