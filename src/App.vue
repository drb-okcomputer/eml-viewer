<script setup lang="ts">
import AppBar from './components/AppBar.vue';
import Viewer from './components/Viewer.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <viewer />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>