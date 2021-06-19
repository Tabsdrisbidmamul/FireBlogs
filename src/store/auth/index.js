import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../../firebase/firebaseInit';

export default {
  namespaced: true,
  state() {
    return {
      editPost: null,
      user: null,
      profileAdmin: null,
      profileEmail: null,
      profileFirstName: null,
      profileLastName: null,
      profileUsername: null,
      profileId: null,
      profileInitials: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setEditPost(state, payload) {
      state.editPost = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileEmail = doc.data().email;
      state.profileUsername = doc.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join('') +
        state.profileLastName.match(/(\b\S)?/g).join('');
    },
  },
  actions: {
    toggleEditPost(context, payload) {
      context.commit('setEditPost', payload);
    },
    authenticateUser(context, payload) {
      context.commit('setUser', payload);
    },
    async getCurrentUser(context) {
      const database = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      const databaseResults = await database.get();
      context.commit('setProfileInfo', databaseResults);
      context.commit('setProfileInitials');
    },
  },
  getters: {
    isAuth(state) {
      return !!state.user;
    },
    user(state) {
      return state.user;
    },
    profile(state) {
      return {
        id: state.profileId,
        userName: state.profileUsername,
        email: state.profileEmail,
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
      };
    },
    profileInitials(state) {
      return state.profileInitials;
    },
    profileAdmin(state) {
      return state.profileAdmin;
    },
  },
};
