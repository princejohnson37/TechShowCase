import PropTypes from "prop-types";
const ProjectCard = (props) => {
	const { projectId, cardClickHandler } = props;
	return (
		<div>
			<button
				className='homepage-card'
				style={{
					color: "#ccc",
					backgroundColor: "#6f6f6f",
				}}
				onClick={() => cardClickHandler(projectId)}
			>
				{props.children}
			</button>
		</div>
	);
};

ProjectCard.propTypes = {
	projectId: PropTypes.string.isRequired,
	cardClickHandler: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default ProjectCard;
