import type { EmailAddress, Attachment } from "eml-parse-js";

export type EmlData = {
    subject: string;
    from: EmailAddress[];
    to: EmailAddress[];
    cc?: EmailAddress[];
    date: string;
    attachments?: Attachment[];
    text?: string;
}