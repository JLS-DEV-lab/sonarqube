interface Props {
    /** Action type := "File Upload" || "File Download" */
    actionType: string;
    /** Displays a heading */
    title: string;
    /** Displays a small helptext */
    helpText: string;
    /** Reference ID, to locate DOM object */
    referenceId: string;
}

const FileHandler = ({ actionType, title, helpText, referenceId}: Readonly<Props>) => {
    return (
        <div>
            <span>{actionType}</span>
            <span>{title}</span>
            <span>{referenceId}</span>
            <span>{helpText}</span>
            <span>File handler component</span>
        </div>
    )
}

export default FileHandler;