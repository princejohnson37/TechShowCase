import { Html } from "@react-three/drei";
import { postAnnotation } from "../../services/postAnnotation";
import "./TextBox.css";
import { useContext } from "react";
import { WebSocketContext } from "../../Context/WebSocketContext";

const TextBox = ({ text, setText, position, setOpen, view = false }) => {
	const [, , sendMessage] = useContext(WebSocketContext);
	const handleClose = () => {
		setText("");
		setOpen(false);
	};
	return (
		<Html position={position}>
			<div className='text-box-div'>
				<input
					className='text-box'
					type='text'
					value={text}
					onChange={(event) => setText(event.target.value)}
					placeholder='Type here'
					readOnly={view}
				/>
				{!view ? (
					<>
						<button onClick={handleClose}>cancel</button>
						<button
							onClick={() => {
								postAnnotation(position, text);
								handleClose();
								sendMessage({
									type: "add_annotation",
								});
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
