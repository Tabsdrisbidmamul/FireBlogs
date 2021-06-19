<template>
  <section>
    <Modal :modalMessage="error" :open="!!error" @close-modal="closeModal" />
    <Loading v-if="isLoading" />
    <div class="form-wrap">
      <form class="register" @submit.prevent="register">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="loginLink"
            >Login Now</router-link
          >
        </p>
        <h2>Create Your FireBlogs Account</h2>
        <div class="inputs">
          <div class="input">
            <input
              type="text"
              placeholder="First Name"
              v-model="firstName.val"
              @blur="clearValidation('firstName')"
              :class="{ invalid: !firstName.isValid }"
            />
            <User class="icon" />
          </div>

          <div class="input">
            <input
              type="text"
              placeholder="Last Name"
              v-model="lastName.val"
              @blur="clearValidation('lastName')"
              :class="{ invalid: !lastName.isValid }"
            />
            <User class="icon" />
          </div>

          <div class="input">
            <input
              type="text"
              placeholder="Username"
              v-model="userName.val"
              @blur="clearValidation('userName')"
              :class="{ invalid: !userName.isValid }"
            />
            <User class="icon" />
          </div>

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

          <div class="input">
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="confirmPassword.val"
              @blur="clearValidation('confirmPassword')"
              :class="{ invalid: !confirmPassword.isValid }"
            />
            <Password class="icon" />
          </div>
        </div>

        <p class="error" v-if="!formIsValid">
          Some values in the form are incorrect, please fix them before sending
        </p>

        <button>Sign Up</button>
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
import User from '../assets/Icons/user-alt-light.svg';
import Modal from '../components/utils/Modal.vue';
import Loading from '../components/utils/Loading.vue';

export default {
  name: 'Register',
  components: {
    Email,
    Password,
    User,
    Modal,
    Loading,
  },
  computed: {
    loginLink() {
      return { name: 'Login' };
    },
  },
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      email: {
        val: '',
        isValid: true,
      },
      userName: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      confirmPassword: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    clearValidation(input) {
      this[input].isValid = true;
    },
    closeModal() {
      this.error = null;
    },
    validate() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (this.userName.val === '') {
        this.userName.isValid = false;
        this.formIsValid = false;
      }

      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }

      if (this.password.val === '') {
        this.password.isValid = false;
        this.formIsValid = false;
      }

      if (
        this.confirmPassword.val === '' ||
        this.confirmPassword.val !== this.password.val
      ) {
        this.confirmPassword.isValid = false;
        this.formIsValid = false;
      }
    },
    async register() {
      this.validate();

      if (!this.confirmPassword.isValid) {
        this.error = 'Passwords do not match!';
        return;
      }

      if (!this.formIsValid) {
        this.error = 'Some parts of the form are empty 🙈';
        return;
      }
      try {
        this.isLoading = true;
        // 1. Authenticate and Register the User
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth
          .createUserWithEmailAndPassword(this.email.val, this.password.val)
          .catch((error) => {
            throw new Error(error.message);
          });

        const result = await createUser;

        // 2. Add the newly created user to the 'users' collection
        const database = db.collection('users').doc(result.user.uid);
        await database
          .set({
            firstName: this.firstName.val,
            lastName: this.lastName.val,
            userName: this.userName.val,
            email: this.email.val,
          })
          .catch((error) => {
            throw new Error(error.message);
          });

        this.isLoading = false;
        this.$router.replace({ name: 'Home' });
      } catch (error) {
        this.isLoading = false;
        this.error = `${error.message} 🙈`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  .form-wrap {
    .register {
      h2 {
        max-width: 350px;
      }
    }
  }
}
</style>
