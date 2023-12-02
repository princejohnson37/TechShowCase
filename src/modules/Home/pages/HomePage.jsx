import { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [projectList, setProjectList] = useState([
    {
      projectName: "First Project",
    },
    {
      projectName: "Second Project",
    },
  ]);
  return (
    <div>
      {projectList.map((project, index) => {
        return (
          <div key={index} className="homepage-card">
            {project.projectName}
          </div>
        );
      })}
    </div>
  );
};
export default HomePage;
