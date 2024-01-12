import "primeicons/primeicons.css";
import PropTypes from "prop-types";
import { Button } from "primereact/button";

import "./CustomCard.css";

const CustomCard = ({ project, onOpenClick }) => {
	console.log("project", project);
	const Users = () => {
		if (project.shared_users.length > 1) {
			console.log("here");
			return <span className='pi pi-users user-icon'></span>;
		} else if (project.shared_users.length === 1) {
			if (project.shared_users[0].username !== project.owner.username) {
				console.log("here here", project.shared_users[0].username, project.owner.username);
				return <span className='pi pi-users user-icon'></span>;
			}
		} else {
			return <></>;
		}
	};
	return (
		<div className='homepage-card'>
			<div className='custom-card-container'>
				<div className='custom-card-header'>
					<h3>{project?.name}</h3>
					<Users />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<Button label='open' onClick={onOpenClick} />
				</div>
			</div>
		</div>
	);
};

CustomCard.propTypes = {
	project: PropTypes.string.isRequired,
	onOpenClick: PropTypes.func.isRequired,
};

export default CustomCard;
