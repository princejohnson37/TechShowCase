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
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-title">3D Tool</div>
          <div className="navbar-btn" >
          <Button onClick={logOuthandler} className="logout-button">
            LogOut
          </Button>
          </div>
        </div>
      </nav>
      <div className="home-container">
        <div className="home-page">
          <div className="grid-view">
          {data &&
					data.length > 0 &&
					data.map((project) => (
						<button
							key={project?.uuid}
							className='homepage-card'
							onClick={() => cardClickHandler(project?.uuid)}
							onKeyDown={() => cardClickHandler(project?.uuid)}
						>
							{project?.name}
						</button>
					))
					}
            <AddNewProject />
          </div>
          {/* <Button onClick={logOuthandler}>LogOut</Button> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
