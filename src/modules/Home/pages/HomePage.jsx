import React from "react";
import { useNavigate } from "react-router";
import AddNewProject from "../Components/AddNewProject";
import { useGetFiles } from "../../../services/useGetFiles";
import "./HomePage.css";
import ProjectCard from "../Components/ProjectCard";
import NavBar from "../../Common/NavBar";

import { Dropdown } from 'primereact/dropdown';
        
        

const HomePage = () => {
	const navigate = useNavigate();
	const { data } = useGetFiles();
  React.useEffect(()=> console.log(data), [data]);
  
	const cardClickHandler = (projectId) => {
		navigate(`/viewer/${projectId}`);
	};
	return (
		<>
			<NavBar />
      <div
        className="title-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '3%',
          paddingRight: "3%"
        }}
      >
        <div className="title">
          <h1>
            My Files
          </h1>
        </div>
        <div className="owned-by" style={{ display: 'flex' ,alignItems: 'center' }}>
          <Dropdown className="dark-dropdown" size="small"  value={'by anyone'} options={['by anyone', 'by me', 'not by me']} />
        </div>
      </div>
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
