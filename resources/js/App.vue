<template>
    <div id="app">
      <header-component v-if="shouldShowHeader"></header-component>
      <router-view></router-view>
    </div>
  </template>

  <script>
  import HeaderComponent from "./components/HeaderComponent.vue";

  export default {
    components: {
      HeaderComponent
    },
    computed: {
      shouldShowHeader() {
        return this.$route.name !== 'login' && this.$route.name !== 'signup';
      }
    }
  };
  </script>

  <style>
  </style>
