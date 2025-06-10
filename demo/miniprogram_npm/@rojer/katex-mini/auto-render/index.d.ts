import { Delimiters } from './types';
export declare const renderMathInText: (text: string, optionsCopy: {
    delimiters: Delimiters;
    preProcess?: ((math: string) => string) | undefined;
    errorCallback?: ((msg: string, e: any) => void) | undefined;
}) => any;
