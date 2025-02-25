<script setup lang="ts">
import AppBar from './components/AppBar.vue';
import Viewer from './components/Viewer.vue';
</script>

<template>
  <v-app>
    <app-bar></app-bar>
    <v-main>
      <viewer />
    </v-main>
  </v-app>
</template>