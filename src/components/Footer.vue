<template>
    <v-footer
    color="indigo-lighten-1"
    class="d-flex align-center justify-center ga-5"
    >
        <div>
            {{ new Date().getFullYear() }} —
            <strong> EML Viewer</strong>
        </div>
        <v-btn
        variant="text"
        href="https://github.com/drb-okcomputer/eml-viewer"
        icon="mdi-github"
        target="_blank"
        ></v-btn>        
    </v-footer>
</template>