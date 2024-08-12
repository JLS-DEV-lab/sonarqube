import { useState } from "react";

interface Props {
    /* Name of the parent node */
    parent?: string;
    onClose: string;
    children
    /* */
}

const AddBDDModal = ({ parent }: Readonly<Props>) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div 
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}>

        </div>
    );
};

export default AddBDDModal;