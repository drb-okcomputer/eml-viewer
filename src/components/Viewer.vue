<script setup lang="ts">
import { readEmlData } from '@/utils/emlParser';
import { ref } from 'vue';

// type
type Mail = {
    title: string,
    to: string[],
    cc: string[],
    attachments: string[],
    body: string,
    date: string,
}

const mailData: Mail = {
    title: "",
    to: ["matsumoto-kousuke@jmj.tmu.ac.jp", "matsumoto-kousuke@jmj.tmu.ac.jp", ],
    cc: ["hoge@contoso.com", "fuga@example.com"],
    attachments: [],
    body: "",
    date: "2025年/02月/25日 09:00",
}

// File object
const emlFile = ref<File>();

const readFileAsText = (file: File) => {
    const reader = new FileReader();
    const promise = new Promise<string | undefined>((resolve, reject) => {
        try {
            reader.readAsText(file);
            reader.onloadend = () => {
                const res = reader.result as string;
                resolve(res);
            }

        } catch(err) {
            console.error(err);
            reject(undefined);
        }
    });
    return promise;
}

const onFileUpload = async () => {
    if(emlFile.value) {
        const res = await readFileAsText(emlFile.value);
        if(res) {
            readEmlData(res);
        }
    }    
}


</script>

<template>
    <v-sheet class="pa-6 mb-3">
        <v-row>
            <v-col cols="6">
                <v-file-input 
                label="emlファイルをアップロードしてください"
                v-model="emlFile"
                @update:model-value="onFileUpload"
                ></v-file-input>
            </v-col>
        </v-row>
    </v-sheet>
    <v-sheet class="pa-6">
        <!--date row-->
        <v-row>
            <v-col cols="3" class="d-flex ">
                <p class="text-subtitle-2">{{ mailData.date }}</p>
            </v-col>
        </v-row>

        <!--title row-->
        <v-row align="center">
            <v-col cols="auto">Title:</v-col>
            <v-col>
                <p>{{ mailData.title }}</p>             
            </v-col>
        </v-row>
        
        <!--to row-->
        <v-row align="center">
            <v-col cols="auto">To:</v-col>
            <template v-for="to in mailData.to">
                <v-col cols="auto">
                    <v-chip color="primary">{{ to }}</v-chip>
                </v-col>
            </template>            
        </v-row>

        <!--cc row-->
        <v-row align="center">
            <v-col cols="auto">CC:</v-col>
            <template v-for="cc in mailData.cc">
                <v-col cols="auto">
                    <v-chip>{{ cc }}</v-chip>
                </v-col>
            </template>
        </v-row>

        <!--attachments row-->
        <v-row align="center">            
            <template v-for="attachment in mailData.attachments">
                <v-col cols="auto">
                    <v-btn
                    prepend-icon="mdi-file"                    
                    :text="attachment"
                    variant="outlined"
                    ></v-btn>                    
                </v-col>
            </template>
        </v-row>

        <!--attachments row-->
        <v-row>
            <v-col>
               
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style lang="css" scoped>

</style>