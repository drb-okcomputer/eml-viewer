import { readEml, type EmailAddress, type ReadedEmlJson } from "eml-parse-js";

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