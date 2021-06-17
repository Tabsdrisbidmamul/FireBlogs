<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="registerLink"
          >Register Now</router-link
        >
      </p>
      <h2>Login to FireBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>

        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
      </div>
      <router-link class="forgot-password" :to="forgotPasswordLink"
        >Forgot your password?</router-link
      >

      <button>Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import Email from '../assets/Icons/envelope-regular.svg';
import Password from '../assets/Icons/lock-alt-solid.svg';

export default {
  name: 'Login',
  components: {
    Email,
    Password,
  },
  data() {
    return {
      email: '',
      password: '',
    };
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

<style lang="scss">
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
    background-image: url('../assets/background.png');
    width: 100%;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
