<script setup lang="ts">
import { readEmlData } from '@/utils/emlParser';
import type { ReadedEmlJson } from 'eml-parse-js';
import { ref } from 'vue';

// type
type Mail = {
    title: string,
    from: string,
    to: string[],
    cc: string[],
    attachments: string[],
    body: string,
    date: string,
}

const mailData: Mail = {
    title: "",
    from: "tanak@example.com",
    to: ["matsumoto-kousuke@jmj.tmu.ac.jp", "matsumoto-kousuke@jmj.tmu.ac.jp", ],
    cc: ["hoge@contoso.com", "fuga@example.com"],
    attachments: [],
    body: "",
    date: "2025年/02月/25日 09:00",
}

// eml ref data
const emlData = ref<ReadedEmlJson>();

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
        const emlTxt = await readFileAsText(emlFile.value);
        if(emlTxt) {
            const eml = await readEmlData(emlTxt);
            if(eml) {
                emlData.value = eml;
            }
        }
    }    
}


</script>

<template>
    <v-sheet class="pa-10 mb-3">
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
    <v-sheet class="pa-10">
        <!--date row-->
        <v-row>
            <v-col cols="auto">Date:</v-col>
            <v-col cols="auto">
                <p>{{ emlData?.date.toLocaleString() }}</p>
            </v-col>
        </v-row>
    
        <!--title row-->
        <v-row align="center">
            <v-col cols="auto">Subject:</v-col>
            <v-col>
                <p>{{ emlData?.subject }}</p>             
            </v-col>
        </v-row>

        <!--from row-->
        <v-row align="center">
            <v-col cols="auto">From:</v-col>
            <v-col cols="auto">
                <v-chip color="green">{{ emlData?.from }}</v-chip>
            </v-col>
        </v-row>
        
        <!--to row-->
        <v-row align="center">
            <v-col cols="auto">To:</v-col>
            <template v-for="to in emlData?.to">
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

        <!--body text row-->
        <v-row>
            <v-col>
               <div>{{ emlData?.text }}</div>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style lang="css" scoped>

</style>