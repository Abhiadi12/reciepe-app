/**
 * @param {objectId} currentUserId
 * @param {objectId} ownerId
 * @returns true if currentUserId is equal to ownerId
 */

export const isAuthorize = (currentUserId, ownerId) => {
  return currentUserId === ownerId;
};
