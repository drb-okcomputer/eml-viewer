<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme, useDisplay } from 'vuetify';

// drawer
const drawer = ref<boolean>(false);

// display
const { mobile } = useDisplay();

// system theme
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// theme
const theme = useTheme();
theme.global.name.value = systemTheme;

const selectedTheme = ref<string>("system");
const themeList = [
    { value: "light", label: "Light", icon: "mdi-white-balance-sunny" },
    { value: "dark", label: "Dark", icon: "mdi-weather-night" },
    { value: "system", label: "System", icon: "mdi-desktop-tower-monitor" }
];

watch(selectedTheme, (value) => {
    if (value === "system") {
        theme.global.name.value = systemTheme;
    } else {
        theme.global.name.value = value;
    }
});
</script>

<template>
    <v-app-bar :elevation="2" color="indigo">
        <v-app-bar-title class="pl-md-10">EML Viewer</v-app-bar-title>
        <template v-slot:append>
            <v-btn 
            @click="drawer = !drawer"
            icon="mdi-cog" 
            class="mx-md-3"></v-btn>
        </template>
    </v-app-bar>

    <v-navigation-drawer
    v-model="drawer"
    :location="mobile ? 'bottom' : 'right'"
    class="px-3 py-5 bg-indigo-darken-1"
    temporary
    >
        <v-radio-group
        v-model="selectedTheme"
        >
        <template v-slot:label>
        <p class="text-subtitle-1 font-weight-bold">Theme</p>
        </template>
        <v-radio
        v-for="(item, index) in themeList"
        :key="index"
        :value="item.value"
        class="mb-2"
        >
        <template v-slot:label>
            <div class="d-flex align-center ga-2 ml-2">
                <v-icon :icon="item.icon"></v-icon>
                <span>{{ item.label }}</span>
            </div>
        </template>
        </v-radio>    
        </v-radio-group>    
    </v-navigation-drawer>
</template>