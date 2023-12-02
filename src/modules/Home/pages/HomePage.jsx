import { useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [projectList, setProjectList] = useState([
    { projectName: "First Project" },
    { projectName: "Second Project" },
  ]);
  const cardClickHandler = () => {
    navigate("/viewer");
  };

  return (
    <div className="grid-view">
      {projectList.map((project, index) => {
        return (
          <div key={index} className="homepage-card" onClick={cardClickHandler}>
            {project.projectName}
          </div>
        );
      })}
    </div>
  );
};
export default HomePage;
