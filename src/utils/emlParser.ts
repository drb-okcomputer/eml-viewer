import { readEml, type ReadedEmlJson } from "eml-parse-js";
import type { EmlData } from "..";

export const readEmlData = (eml: string) => {
    const promise = new Promise<ReadedEmlJson | undefined>((resolve, reject) => {
        try {
            readEml(eml, (err, ReadEmlJson) => {
                if(ReadEmlJson) {                    
                    resolve(ReadEmlJson);
                }        
            });            
        } catch (error) {
            console.error(error);
            reject(undefined);
        }
    });
    return promise;    
}

export const parseEmlData = (emlJson: ReadedEmlJson) => {    
    const emlData: EmlData = {
        subject: emlJson.subject,
        from: !emlJson.from ? [] : Array.isArray(emlJson.from) ? emlJson.from : [emlJson.from],
        to: !emlJson.to ? [] : Array.isArray(emlJson.to) ? emlJson.to : [emlJson.to],
        cc: !emlJson.cc ? [] : Array.isArray(emlJson.cc) ? emlJson.cc : [emlJson.cc],
        date: emlJson.date instanceof Date ? emlJson.date.toLocaleString() : emlJson.date,
        attachments: emlJson.attachments,
        text: emlJson.text
    };
    return emlData;
}