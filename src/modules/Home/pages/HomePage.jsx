import "./HomePage.css";
import { useNavigate } from "react-router";
import { useGetFiles } from "../../../services/useGetFiles";

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
        data.map((project) => {
          return (
            <div
              key={project?.id}
              className="homepage-card"
              onClick={cardClickHandler}
              onKeyDown={cardClickHandler}
            >
              {project?.path}
            </div>
          );
        })}
    </div>
  );
};
export default HomePage;
