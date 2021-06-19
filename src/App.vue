<template>
  <div class="app-wrapper">
    <div class="app">
      <navigation v-if="checkRoute" />
      <router-view />
      <footer-vue v-if="checkRoute"></footer-vue>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import FooterVue from './components/Footer.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'app',
  components: {
    Navigation,
    FooterVue,
  },
  data() {
    return {
      navigation: null,
    };
  },
  computed: {
    checkRoute() {
      if (
        this.$route.name === 'Login' ||
        this.$route.name === 'Register' ||
        this.$route.name === 'ForgotPassword'
      ) {
        return false;
      }
      return true;
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('authModule/authenticateUser', user);
      if (user) {
        this.$store.dispatch('authModule/getCurrentUser');
        console.log(this.$store.getters['authModule/profile']);
      }
    });
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path: {
    fill: #000;
  }
}

.arrow-light {
  path: {
    fill: #fff;
  }
}

button,
.router-button {
  transition: all 0.5s ease;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.87);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }
  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.blog-card-wrapper {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

section {
  position: relative;
  .form-wrap {
    display: flex;
    overflow: hidden;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;

    @media (min-width: 900px) {
      width: 100%;
    }

    .login-register {
      margin-bottom: 32px;

      .router-link {
        color: #000;
      }
    }

    form {
      padding: 0 10px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;

      @media (min-width: 900px) {
        padding: 0 50px;
      }

      h2 {
        text-align: center;
        font-size: 32px;
        color: #303030;
        margin-bottom: 40px;

        @media (min-width: 900px) {
          font-size: 40px;
        }
      }

      .inputs {
        width: 100%;
        max-width: 350px;

        .input {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;

          input {
            width: 100%;
            border: none;
            border-radius: 3px;
            background-color: #f2f7f6;
            border-bottom: 2px solid transparent;
            padding: 4px 4px 4px 30px;
            height: 50px;
            transition: all 250ms ease;

            &:focus {
              outline: none;
            }

            &:focus:valid {
              border-bottom: 2px solid #2ecc71;
            }

            &:focus:invalid {
              border-bottom: 2px solid #c0392b;
            }
          }

          .icon {
            position: absolute;
            left: 6px;
            width: 12px;
          }
        }
      }

      .forgot-password {
        text-decoration: none;
        color: #000;
        cursor: pointer;
        font-size: 14px;
        margin: 16px 0 32px;
        border-bottom: 1px solid transparent;

        transition: all 250ms ease;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .angle {
        display: none;
        position: absolute;
        background-color: #fff;
        transform: rotateZ(3deg);
        width: 60px;
        right: -30px;
        height: 101%;

        @media (min-width: 900px) {
          display: initial;
        }
      }
    }

    .background {
      display: none;
      flex: 2;
      background-size: cover;
      background-image: url('./assets/background.png');
      width: 100%;
      height: 100%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
}

.invalid {
  border-bottom: 2px solid #c0392b !important;
}

.error {
  text-align: center;
  color: #c0392b;
}
</style>
