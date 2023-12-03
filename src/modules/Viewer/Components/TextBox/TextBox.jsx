import { Html } from "@react-three/drei";

const TextBox = ({ text, handleTextChange, position }) => {
  const cords = { ...position };
  // cords.y -= 0.05;
  return (
    <Html position={position}>
      <div
      // style={{
      //   position: "absolute",
      //   top: "50%",
      //   left: "50%",
      //   transform: "translate(-50%, -50%)",
      // }}
      >
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Type here"
        />
        <button
          onClick={() => {
            const data = {};
          }}
        >
          ok
        </button>
      </div>
    </Html>
  );
};
export default TextBox;
