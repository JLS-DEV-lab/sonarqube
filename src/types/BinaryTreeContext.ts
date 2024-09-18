import { RawNodeDatum } from "react-d3-tree";

export type BinaryTreeContext = {
    /* Refs */

    /* State */
    binaryTree: RawNodeDatum;
    setBinaryTree: (
        update: RawNodeDatum | null, // If null, replace the entire tree
        attributeName?: string,
        value?: string
    ) => void;
    
    /* API Keys */

    /* Form data */
};