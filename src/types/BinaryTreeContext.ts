import { RawNodeDatum } from "react-d3-tree";

export type BinaryTreeContext = {
    /* Refs */

    /* State */
    binaryTree: RawNodeDatum;
    setBinaryTree: (nodeDatum: RawNodeDatum, attributeName: string, value: string) => void;
    
    /* API Keys */

    /* Form data */
};