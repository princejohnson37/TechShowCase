import { useNavigate } from "react-router";

import AddNewProject from "../Components/AddNewProject";
import { useGetFiles } from "../../../services/useGetFiles";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, isFetching, isLoading } = useGetFiles();
  

  const cardClickHandler = () => {
    navigate("/viewer");
  };

 

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-view">
      {data &&
        data.length > 0 &&
        data.map((project) => (
          <div
            key={project?.id}
            className="homepage-card"
            onClick={cardClickHandler}
            onKeyDown={cardClickHandler}
          >
            {project?.path}
          </div>
        ))}
        <AddNewProject />
    </div>
  );
};

export default HomePage;
