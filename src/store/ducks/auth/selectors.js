export const getFirstName = state => state.auth.currentUser.firstName;
export const getUserId = state => state.auth.currentUser.id;

export default {
  getFirstName,
  getUserId
};
