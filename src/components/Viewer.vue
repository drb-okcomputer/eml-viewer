<script setup lang="ts">
import { readEmlData, parseEmlData } from '@/utils/emlParser';
import { ref } from 'vue';
import type { EmlData } from '..';
import type { Attachment } from 'eml-parse-js';

// eml ref data
const emlData = ref<EmlData>();

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
            const emlJson = await readEmlData(emlTxt);
            if(emlJson) {
                console.log(emlJson);
                const parsedData = parseEmlData(emlJson);
                emlData.value = parsedData;
            }
        }
    }    
}

// on click download button
const encodeBinaryString = (binaryString: string): Uint8Array<ArrayBuffer> => Uint8Array.from(
	binaryString,
	binaryChar => binaryChar.charCodeAt(0),
);

const downloadAttachmentFile = (attachment: Attachment) => {
    const contentType = attachment.contentType.includes(";") ? attachment.contentType.split(";")[0] : attachment.contentType;
    const data = encodeBinaryString(atob(attachment.data64));
    const blob = new Blob([data], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.name;
    a.click();
    URL.revokeObjectURL(url);
}


</script>

<template>    
    <v-sheet class="pa-15">
        <v-row class="mb-5">
            <v-col cols="6">
                <v-file-input 
                label="emlファイルをアップロードしてください"
                v-model="emlFile"
                @update:model-value="onFileUpload"
                ></v-file-input>
            </v-col>
        </v-row>
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
            <template v-for="from in emlData?.from">
                <v-col cols="auto">
                    <v-chip color="green">{{ from.name }} &lt;{{ from.email }}&gt;</v-chip>
                </v-col>
            </template>            
        </v-row>
        
        <!--to row-->
        <v-row align="center">
            <v-col cols="auto">To:</v-col>
            <template v-for="to in emlData?.to">
                <v-col cols="auto">
                    <v-chip color="primary">{{ to.name }} &lt;{{ to.email }}&gt;</v-chip>
                </v-col>
            </template>            
        </v-row>

        <!--cc row-->
        <v-row align="center">
            <v-col cols="auto">CC:</v-col>
            <template v-for="cc in emlData?.cc">
                <v-col cols="auto">
                    <v-chip>{{ cc }}</v-chip>
                </v-col>
            </template>
        </v-row>

        <!--attachments row-->
        <v-row align="center">            
            <template v-for="attachment in emlData?.attachments">
                <v-col cols="auto">
                    <v-btn
                    prepend-icon="mdi-file"                    
                    :text="attachment.name"
                    variant="outlined"
                    @click="downloadAttachmentFile(attachment)"
                    ></v-btn>                    
                </v-col>
            </template>
        </v-row>

        <!--body text row-->
        <v-row>
            <v-col>
               <div 
               :style="{ whiteSpace: 'pre-wrap'}"
               >{{ emlData?.text }}</div>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style lang="css" scoped>

</style>