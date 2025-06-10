import { Delimiters } from './types';
declare const splitAtDelimiters: (text: string, delimiters: Delimiters) => {
    type: "text" | "math";
    data: string;
    rawData?: string | undefined;
    display?: boolean | undefined;
}[];
export default splitAtDelimiters;
