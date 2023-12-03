import { Html } from "@react-three/drei";
import { postAnnotation } from "../../services/postAnnotation";
import "./TextBox.css";

const TextBox = ({ text, setText, position, setOpen, view = false }) => {
  const handleClose = () => {
    setText("");
    setOpen(false);
  };
  return (
    <Html position={position}>
      <div className="text-box-div">
        <input
          className="text-box"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type here"
          readOnly={view}
        />
        {!view ? (
          <>
            <button onClick={handleClose}>cancel</button>
            <button
              onClick={() => {
                postAnnotation(position, text);
                handleClose();
              }}
            >
              ok
            </button>
          </>
        ) : (
          <button onClick={handleClose}>close</button>
        )}
      </div>
    </Html>
  );
};

export default TextBox;
