import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import AddNewProject from "../Components/AddNewProject";
import { useGetFiles } from "../../../services/useGetFiles";
import "./HomePage.css";
import ProjectCard from "../Components/ProjectCard";

const HomePage = () => {
	const navigate = useNavigate();
	const { data } = useGetFiles();

	const cardClickHandler = (projectId) => {
		navigate(`/viewer/${projectId}`);
	};

	const logOuthandler = () => {
		localStorage.clear();
		navigate("/login");
	};

	return (
		<>
			<nav className='navbar'>
				<div className='navbar-content'>
					<div className='navbar-title'>3D Tool</div>
					<div className='navbar-btn'>
						<Button onClick={logOuthandler} className='logout-button'>
							LogOut
						</Button>
					</div>
				</div>
			</nav>
			<div className='home-container'>
				<div className='home-page'>
					<AddNewProject />
					{data?.data &&
						data.data.map((project) => (
							<ProjectCard key={project.id} projectId={project.id} cardClickHandler={cardClickHandler}>
								{project.name}
							</ProjectCard>
						))}
				</div>
			</div>
		</>
	);
};

export default HomePage;
