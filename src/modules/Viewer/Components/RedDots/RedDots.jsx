/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import TextBox from "../TextBox/TextBox";
import { useState } from "react";

const RedDots = ({ position, setText, text, isOpen, view, id }) => {
	const [isDotClicked, setIsDotClicked] = useState(isOpen);
  // console.log("position --> ", position);
	return (
		<>
			<mesh position={position} onClick={() => setIsDotClicked((prev) => !prev)}>
				<sphereGeometry args={[0.01]} />
				<meshBasicMaterial color='red' />
			</mesh>
			{isDotClicked && (
				<TextBox
					key={id}
					annotationId={id}
					setText={setText}
					text={text}
					position={position}
					setOpen={setIsDotClicked}
					view={view}
				/>
			)}
		</>
	);
};

export default RedDots;
