import { readEml } from "eml-parse-js";

export const readEmlData = async (eml: string) => {
    readEml(eml, (err, ReadEmlJson) => {
        console.log(ReadEmlJson);
    })
}