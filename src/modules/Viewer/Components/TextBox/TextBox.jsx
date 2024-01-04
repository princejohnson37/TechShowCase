import { Html } from "@react-three/drei";
import { postAnnotation } from "../../services/postAnnotation";
import "./TextBox.css";
import { useContext } from "react";
import { WebSocketContext } from "../../Context/WebSocketContext";
import { useViewerContext } from "../../Context/ViewerContext";

const TextBox = ({ text, setText, position, setOpen, view = false }) => {
	const [, , sendMessage] = useContext(WebSocketContext);
	const { fileId: id } = useViewerContext();
	const handleClose = () => {
		setText("");
		setOpen(false);
		sendMessage({
			type: "add_annotation",
		});
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
								postAnnotation(position, text, id);
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
