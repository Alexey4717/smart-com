import type { UsersById, UserType } from 'types/user';

export const mapPlacesToStoreEntities = (
  usersArray: UserType[]
) => {
  const hasUsersArrayLength = Boolean(usersArray.length);
  const users: UsersById = {};
  const usersIdsSet = new Set<string>();

  if (hasUsersArrayLength) {
    usersArray.forEach((user) => {
      const {
        id: userId,
        name: userName,
        uniqueUrlName: userUniqueUrlName,
        photos: userPhotos,
        status: userStatus,
        followed: userFollowed
      } = user;

      users[userId.toString()] = {
        name: userName,
        uniqueUrlName: userUniqueUrlName,
        photos: userPhotos,
        status: userStatus,
        followed: userFollowed
      };

      usersIdsSet.add(userId.toString());
    });
  }

  const usersIds = Array.from(usersIdsSet);

  return {
    users,
    usersIds
  }
};