export default {
  namespaced: true,
  state: {
    sampleBlogCards: [
      {
        blogTitle: 'Blog Card #1',
        blogCoverPhoto: 'stock-1',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: 'Blog Card #2',
        blogCoverPhoto: 'stock-2',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: 'Blog Card #3',
        blogCoverPhoto: 'stock-3',
        blogDate: 'May 1, 2021',
      },
      {
        blogTitle: 'Blog Card #4',
        blogCoverPhoto: 'stock-4',
        blogDate: 'May 1, 2021',
      },
    ],
    editPost: null,
  },
  mutations: {
    setEditPost(state, payload) {
      state.editPost = payload;
    },
  },
  actions: {
    toggleEditPost(context, payload) {
      context.commit('setEditPost', payload);
    },
  },
  getters: {
    blogCards(state) {
      return state.sampleBlogCards;
    },

    editPost(state) {
      return state.editPost;
    },
  },
};
