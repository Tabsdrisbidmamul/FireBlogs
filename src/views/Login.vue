<template>
  <section>
    <Modal :modalMessage="error" :open="!!error" @close-modal="closeModal" />
    <Loading v-if="isLoading" />
    <div class="form-wrap">
      <form class="login" @submit.prevent="login">
        <p class="login-register">
          Don't have an account?
          <router-link class="router-link" :to="registerLink"
            >Register Now</router-link
          >
        </p>
        <h2>Login to FireBlogs</h2>
        <div class="inputs">
          <div class="input">
            <input
              type="email"
              placeholder="Email"
              v-model="email.val"
              @blur="clearValidation('email')"
              :class="{ invalid: !email.isValid }"
            />
            <Email class="icon" />
          </div>

          <div class="input">
            <input
              type="password"
              placeholder="Password"
              v-model="password.val"
              @blur="clearValidation('password')"
              :class="{ invalid: !password.isValid }"
            />
            <Password class="icon" />
          </div>
        </div>
        <router-link class="forgot-password" :to="forgotPasswordLink"
          >Forgot your password?</router-link
        >

        <p class="error" v-if="!formIsValid">
          Some values in the form are incorrect, please fix them before sending
        </p>

        <button>Sign In</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </section>
</template>

<script>
import firebase from '@firebase/app';
import '@firebase/auth';
import db from '../firebase/firebaseInit';

import Email from '../assets/Icons/envelope-regular.svg';
import Password from '../assets/Icons/lock-alt-solid.svg';
import Modal from '../components/utils/Modal.vue';
import Loading from '../components/utils/Loading.vue';

export default {
  name: 'Login',
  components: {
    Email,
    Password,
    Modal,
    Loading,
  },
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      error: null,
      isLoading: false,
    };
  },
  methods: {
    closeModal() {
      this.error = null;
    },
    clearValidation(input) {
      this[input].isValid = true;
    },

    validation() {
      this.formIsValid = true;

      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }

      if (this.password.val === '') {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },

    login() {
      this.validation();

      if (!this.formIsValid) {
        this.error = 'Some Parts of the form are empty 🙈';
        return;
      }

      // 1. Authenticate and login the user
      this.isLoading = true;
      console.log(db);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email.val, this.password.val)
        .then((response) => {
          this.isLoading = false;
          console.log(response);
          console.log(firebase.auth().currentUser.uid);
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          this.isLoading = false;
          if (error.code === 'auth/wrong-password') {
            this.password.isValid = false;
            this.formIsValid = false;
          }
          this.error = `${error.message} 🐒`;
        });
    },
  },
  computed: {
    registerLink() {
      return { name: 'Register' };
    },
    forgotPasswordLink() {
      return { name: 'ForgotPassword' };
    },
  },
};
</script>
