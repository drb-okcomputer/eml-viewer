<script setup lang="ts">
import { readEmlData, parseEmlData } from '@/utils/emlParser';
import { downloadAttachmentFile } from '@/utils/fileDownloader';
import { ref } from 'vue';
import type { EmlData } from '..';
import type { Attachment } from 'eml-parse-js';

// attachment display color
const attachmentColor = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    const ext = lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1).toLowerCase() : "";
    switch(ext) {
        case 'pdf':
            return 'red';
        case 'doc':
        case 'docx':
            return 'blue';
        case 'xls':
        case 'xlsx':
            return 'green';
        case 'ppt':
        case 'pptx':
            return 'orange';
        case 'zip':
            return 'purple';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'indigo';
        default:
            return undefined;
    }
};

// eml ref data
const emlData = ref<EmlData>();

// File object
const emlFile = ref<File>();

const readFileAsText = (file: File): Promise<string | { status: boolean, message: string }> => {
    return new Promise((resolve, reject) => {
        if(!/.eml$/i.test(file.name)) {
            resolve({ status: false, message: "EMLファイルをアップロードしてください" });
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {            
            resolve(reader.result as string);
        }
        reader.onerror = () => {
            reject({ status: false, message: "ファイルの読み取りエラーが発生しました" });
        }
        reader.readAsText(file);
    });    
}

const onFileUpload = async () => {
    if(emlFile.value) {        
        try {
            const emlTxt = await readFileAsText(emlFile.value);

            if(typeof emlTxt !== 'string') {
                alert(emlTxt.message);
                return;
            }
            const emlJson = await readEmlData(emlTxt);
            const parsedData = parseEmlData(emlJson);
            emlData.value = parsedData;
        } catch(err) {
            console.warn(err);
            alert("EMLファイルの読み取りエラーが発生しました");
            emlFile.value = undefined;
        }
    }    
}

</script>

<template>    
    <v-sheet class="pa-5 pa-md-15">
        <v-row class="mb-md-5">
            <v-col md="12" lg="6">
                <v-file-input 
                accept="message/rfc822"
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
                    <v-chip color="green">{{ from.name }}&lt;{{ from.email }}&gt;</v-chip>
                </v-col>
            </template>            
        </v-row>
        
        <!--to row-->
        <v-row align="center">
            <v-col cols="auto">To:</v-col>
            <template v-for="to in emlData?.to">
                <v-col cols="auto">
                    <v-chip color="primary">{{ to.name }}&lt;{{ to.email }}&gt;</v-chip>
                </v-col>
            </template>            
        </v-row>

        <!--cc row-->
        <v-row align="center">
            <v-col cols="auto">CC:</v-col>
            <template v-for="cc in emlData?.cc">
                <v-col cols="auto">
                    <v-chip>{{ cc.name }}&lt;{{ cc.email }}&gt;</v-chip>
                </v-col>
            </template>
        </v-row>

        <!--attachments row-->
        <v-row align="center">            
            <template v-for="attachment in emlData?.attachments">
                <v-col cols="auto">
                    <v-btn
                    :color="attachmentColor(attachment.name)"
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
            <v-col cols="auto">
               <div 
               :style="{ whiteSpace: 'pre-wrap', width: '100%' }"
               >{{ emlData?.text }}</div>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style lang="css" scoped>

</style>