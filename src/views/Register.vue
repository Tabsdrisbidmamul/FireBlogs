<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="loginLink">Login Now</router-link>
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
            blur="clearValidation('lastName')"
            :class="{ invalid: !lastName.isValid }"
          />
          <User class="icon" />
        </div>

        <div class="input">
          <input
            type="email"
            placeholder="Username"
            v-model="userName.val"
            blur="clearValidation('userName')"
            :class="{ invalid: !userName.isValid }"
          />
          <User class="icon" />
        </div>

        <div class="input">
          <input
            type="email"
            placeholder="Email"
            v-model="email.val"
            blur="clearValidation('email')"
            :class="{ invalid: !email.isValid }"
          />
          <Email class="icon" />
        </div>

        <div class="input">
          <input
            type="password"
            placeholder="Password"
            v-model="password.val"
            blur="clearValidation('password')"
            :class="{ invalid: !password.isValid }"
          />
          <Password class="icon" />
        </div>

        <div class="input">
          <input
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            blur="clearValidation('confirmPassword')"
            :class="{ invalid: !confirmPassword.isValid }"
          />
          <Password class="icon" />
        </div>
      </div>

      <button>Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import Email from '../assets/Icons/envelope-regular.svg';
import Password from '../assets/Icons/lock-alt-solid.svg';
import User from '../assets/Icons/user-alt-light.svg';

export default {
  name: 'Register',
  components: {
    Email,
    Password,
    User,
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
    };
  },
  methods: {
    clearValidation(input) {
      this[input].isValid = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
