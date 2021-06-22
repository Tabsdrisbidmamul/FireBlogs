import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../../firebase/firebaseInit';

export default {
  namespaced: true,
  state() {
    return {
      blogHTML: 'Write your blog title here...',
      blogTitle: '',
      blogPhotoName: '',
      blogPhotoFileURL: null,
      blogPhotoPreview: null,
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
    setFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    setLastName(state, payload) {
      state.profileLastName = payload;
    },
    setUserName(state, payload) {
      state.profileUserName = payload;
    },
    setBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    setBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    setFileName(state, payload) {
      state.blogPhotoName = payload;
    },
    setFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    setOpenPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
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
    async updateUserSettings(context) {
      const { id, firstName, lastName, userName } = context.getters.profile;

      const database = await db.collection('users').doc(id);
      await database.update({
        firstName,
        lastName,
        userName,
      });
      context.commit('setProfileInitials');
    },
    openPhotoPreview(context) {
      context.commit('setOpenPhotoPreview');
    },
    fileNameChange(context, payload) {
      context.commit('setFileName', payload);
    },
    createFileURL(context, payload) {
      context.commit('setFileURL', payload);
    },
    changeFirstName(context, payload) {
      context.commit('setFirstName', payload);
    },
    changeLastName(context, payload) {
      context.commit('setLastName', payload);
    },
    changeUserName(context, payload) {
      context.commit('setUserName', payload);
    },
    newBlogPost(context, payload) {
      context.commit('setBlogPost', payload);
    },
    updateBlogTitle(context, payload) {
      context.commit('setBlogTitle', payload);
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
    blog(state) {
      return {
        blogHTML: state.blogHTML,
        blogTitle: state.blogTitle,
        blogPhotoName: state.blogPhotoName,
        blogPhotoFileURL: state.blogPhotoFileURL,
        blogPhotoPreview: state.blogPhotoPreview,
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
