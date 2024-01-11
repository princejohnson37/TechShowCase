import { Html } from "@react-three/drei";
import PropTypes from 'prop-types';
import { postAnnotation } from "../../services/postAnnotation";
import "./TextBox.css";
import { useContext } from "react";
import { WebSocketContext } from "../../Context/WebSocketContext";
import { useViewerContext } from "../../Context/ViewerContext";
import { deleteAnnotation } from "../../services/deleteAnnotation";

const TextBox = ({ text, setText, position, setOpen, view = false, annotationId }) => {
	const [, , sendMessage] = useContext(WebSocketContext);
	const { projectId } = useViewerContext();
	const handleClose = () => {
		setText("");
		setOpen(false);
		sendMessage({
			type: "add_annotation",
		});
	};
  const handleDelete = () => { 
    deleteAnnotation(annotationId);
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
					<div className="text-box-btn">
						<button onClick={handleClose}>cancel</button>
						<button
							onClick={() => {
								postAnnotation(position, text, projectId);
								handleClose();
								sendMessage({
									type: "add_annotation",
								});
							}}
						>
							ok
						</button>
					</div>
				) : (
          <div className="text-box-btn">
					<button onClick={handleClose}>close</button>
          <button onClick={handleDelete} className="delete-button">
                        delete
                    </button>
          </div>
				)}
			</div>
		</Html>
	);
};

export default TextBox;

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  setOpen: PropTypes.func.isRequired,
  view: PropTypes.bool,
  annotationId: PropTypes.string,
};

TextBox.defaultProps = {
  view: false
};