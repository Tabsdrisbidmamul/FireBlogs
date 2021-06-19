<template>
  <div class="home">
    <blog-post v-if="!isAuth" :post="welcomeScreen"></blog-post>
    <blog-post
      v-for="(post, index) in sampleBlogPost"
      :key="index"
      :post="post"
    ></blog-post>

    <div class="blog-card-wrapper">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <blog-card
            v-for="(post, index) in sampleBlogCards"
            :key="index"
            :post="post"
          ></blog-card>
        </div>
      </div>
    </div>

    <div class="updates" v-if="!isAuth">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for FireBlogs <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg';
import BlogCard from '../components/BlogCard.vue';
import BlogPost from '../components/BlogPost.vue';
export default {
  name: 'Home',
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
          'Weekly blog articles with all things programming including HTML, CSS, Javascript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding',
      },
      sampleBlogPost: [
        {
          title: 'This is a Filler Title!',
          blogHTML: 'This is a filler blog post title',
          blogCoverPhoto: 'beautiful-stories',
        },
        {
          title: 'This is a Filler Title2!',
          blogHTML: 'This is a filler blog post title',
          blogCoverPhoto: 'designed-for-everyone',
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.getters['blogCardsModule/blogCards'];
    },
    isAuth() {
      return this.$store.getters['authModule/isAuth'];
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrapper {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
