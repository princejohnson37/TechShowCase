import { Html } from "@react-three/drei";
import { postAnnotation } from "../../services/postAnnotation";

const TextBox = ({ text, handleTextChange, position, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Html position={position}>
      <div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Type here"
        />
        <button onClick={handleClose}>cancel</button>
        <button
          onClick={() => {
            postAnnotation(position, text);
            handleClose();
          }}
        >
          ok
        </button>
      </div>
    </Html>
  );
};
export default TextBox;
