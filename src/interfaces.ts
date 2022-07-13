import { DocumentData } from 'firebase/firestore';

export interface IEmail {
    id?: string;
    author: string | null | undefined;
    recipient: string;
    subject: string;
    text: string;
    date: any;
    read: boolean;
    starred: boolean;
    snoozed: boolean;
    spam: boolean;
    trash: boolean;
}

export interface IComposeForm {
    recipient: string;
    subject: string;
    text: string;
}

export interface IFormFields {
    email: string,
    password: string,
    confirmation?: string,
}

export interface IContext {
    emails: DocumentData[];
    composeVisibility: boolean;
    setComposeVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    infoVisibility: boolean;
    setInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}