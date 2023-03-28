import { ReactElement } from "react";

interface IProps {
    content : ReactElement
    handleClose: (e: React.MouseEvent<HTMLSpanElement>) => void
};


const EditPopUp : React.FC<IProps> = ({content, handleClose}) => {
    return (
        <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>

    );

}

export default EditPopUp;
