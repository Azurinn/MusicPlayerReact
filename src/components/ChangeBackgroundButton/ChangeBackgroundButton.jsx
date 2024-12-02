import React, {useState} from "react";
import "./ChangeBackgroundButton.css";

const ChangeBackgroundButton = ({ onChangeBackground }) => {
    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => setHover(true);

    const handleMouseLeave = () => setHover(false);

    return (
        <button
        className={`changeBackBtn ${hover ? "changeBackBtn-hover" : ""}`}
        onClick={onChangeBackground}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
            Change Background
        </button>
    );
};

export default ChangeBackgroundButton;
