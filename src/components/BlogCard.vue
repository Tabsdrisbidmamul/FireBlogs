<template>
  <div class="blog-card">
    <transition name="toggle-icons">
      <div class="icons" v-if="editPost">
        <div class="icon">
          <Edit class="icon--edit" />
        </div>

        <div class="icon">
          <Delete class="icon--delete" />
        </div>
      </div>
    </transition>

    <img
      :src="require(`../assets/blogCards/${post.blogCoverPhoto}.jpg`)"
      :alt="post.blogCoverPhoto"
    />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on: {{ post.blogDate }}</h6>
      <router-link class="link" to="#">
        View The Post<Arrow class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg';
import Edit from '../assets/Icons/edit-regular.svg';
import Delete from '../assets/Icons/trash-regular.svg';

export default {
  name: 'blogCard',
  props: ['post'],
  components: {
    Arrow,
    Edit,
    Delete,
  },
  computed: {
    editPost() {
      return this.$store.getters['blogCardsModule/editPost'];
    },
  },
  beforeMount() {
    this.$store.dispatch('blogCardsModule/toggleEditPost', false);
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  backface-visibility: hidden;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 2px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: all 0.5s ease;

      &:hover {
        background-color: #303030;

        .icon--edit,
        .icon--delete {
          transition: all 0.5s ease;
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      &--edit,
      &--delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;

      transition: all 0.5s ease;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }

  .toggle-icons-enter,
  .toggle-icons-leave-to {
    opacity: 0;
  }

  .toggle-icons-to .toggle-icons-leave {
    opacity: 1;
  }

  .toggle-icons-enter-active,
  .toggle-icons-leave-active {
    transition: all 250ms ease-out;
  }
}
</style>
