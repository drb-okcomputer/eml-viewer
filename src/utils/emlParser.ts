import { readEml, type EmailAddress, type ReadedEmlJson } from "eml-parse-js";
import type { EmlData } from "..";

export const readEmlData = (eml: string): Promise<ReadedEmlJson> => {
    return new Promise((resolve, reject) => {
        readEml(eml, (err, ReadEmlJson) => {
            if(err) {
                reject(err);
                return;
            }

            if(ReadEmlJson && Object.hasOwn(ReadEmlJson, "subject")) {
                resolve(ReadEmlJson);
            } else {
                reject(new Error("有効なEMLデータではありません"));
            }
        });        
    });
}

export const parseEmlData = (emlJson: ReadedEmlJson) => {    
    const returnEmlAddrsArray = (data: EmailAddress | EmailAddress[] | null | undefined) => {
        return !data ? [] : Array.isArray(data) ? data : [data];
    }

    const emlData: EmlData = {
        subject: emlJson.subject,
        from: returnEmlAddrsArray(emlJson.from),
        to: returnEmlAddrsArray(emlJson.to),
        cc: returnEmlAddrsArray(emlJson.cc),
        date: emlJson.date instanceof Date ? emlJson.date.toLocaleString() : emlJson.date,
        attachments: emlJson.attachments,
        text: emlJson.text
    };
    return emlData;
}