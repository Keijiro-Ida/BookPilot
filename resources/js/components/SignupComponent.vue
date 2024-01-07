<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="form.name" type="text">
        <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" type="email">
        <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="form.password" type="password">
        <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>
      </div>
      <div>
        <label for="password">Password確認:</label>
        <input id="password" v-model="form.password_confirmation" type="password">
      </div>
      <button type="submit">Create User</button>
    </form>
  </template>

  <script>
  import axios from 'axios';
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        errors: {},
      };
    },
    methods: {
    ...mapActions('auth', ['signup']),
      async submitForm() {
        try {
          const response = await this.signup({form:this.form});
          this.$router.push({ name: 'book.shelf' });
        } catch (error) {
          console.error('Signup error:', error.message);
          this.errors = error.message;
        }
      }
    }
  };
  </script>

<style>
.error {
  color: red;
}
</style>
