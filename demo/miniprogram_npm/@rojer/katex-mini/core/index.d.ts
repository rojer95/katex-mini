declare type RichNode = {
    type?: string;
    name?: string;
    children?: RichNode[];
    attrs?: any;
    text?: string;
};
/**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove empty classes.
 */
export declare const createClass: (classes: string[]) => string;
export declare const parseLatex: (latex: string, option?: any) => RichNode[] | {
    name: string;
    attrs: {
        style: string;
    };
    children: {
        type: string;
        text: any;
    }[];
}[];
export {};
