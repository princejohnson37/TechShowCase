import { Html } from "@react-three/drei";
import { postAnnotation } from "../../services/postAnnotation";

const TextBox = ({ text, setText, position, setOpen }) => {
  const handleClose = () => {
    setText("");
    setOpen(false);
  };
  return (
    <Html position={position}>
      <div>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
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
