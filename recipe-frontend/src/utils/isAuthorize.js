export const isAuthorize = (currentUserId, ownerId) => {
  return currentUserId === ownerId;
};
