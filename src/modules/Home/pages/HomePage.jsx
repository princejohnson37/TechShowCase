import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import AddNewProject from "../Components/AddNewProject";
import { useGetFiles } from "../../../services/useGetFiles";
import "./HomePage.css";

const HomePage = () => {
	const navigate = useNavigate();
	const { data, isFetching, isLoading } = useGetFiles();

	const cardClickHandler = (projectId) => {
		navigate(`/viewer/${projectId}`);
	};

	const logOuthandler = () => {
		localStorage.clear();
		navigate("/login");
	};

	if (isLoading || isFetching) {
		return <div>Loading...</div>;
	}

	return (
		<div className='home-page'>
			<div className='grid-view'>
				{data &&
					data.length > 0 &&
					data.map((project) => (
						<button
							key={project?.id}
							className='homepage-card'
							onClick={() => cardClickHandler(project?.id)}
							onKeyDown={() => cardClickHandler(project?.id)}
						>
							{project?.path}
						</button>
					))}
				<AddNewProject />
			</div>
			<Button onClick={logOuthandler}>LogOut</Button>
		</div>
	);
};

export default HomePage;
