import type { Attachment } from "eml-parse-js";

const base64toBin = (b64: string) => {
    const binStr = atob(b64);
    const bin = Uint8Array.from(binStr, str => str.charCodeAt(0));
    return bin;
}

export const downloadAttachmentFile = (attachment: Attachment) => {        
    const contentType = attachment.contentType.includes(";") ? attachment.contentType.split(";")[0] : attachment.contentType;
    const blob = new Blob([base64toBin(attachment.data64)], { type: contentType });
    const objectURL = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = attachment.name;
    a.href = objectURL;
    a.click();
    URL.revokeObjectURL(objectURL);
}