import React from "react";
import { useNavigate } from "react-router";
import AddNewProject from "../Components/AddNewProject";
import { useGetFiles } from "../../../services/useGetFiles";
import "./HomePage.css";

import 'primeicons/primeicons.css';
        
// import ProjectCard from "../Components/ProjectCard";
import NavBar from "../../Common/Components/NavBar";
import CustomCard from "../Components/Cards/CustomCard";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import useUser from "../../Common/hooks/useUser";

// eslint-disable-next-line react/prop-types
const Side = ({ visible, setVisible }) => {
  const navigate = useNavigate();

  const cardClickHandler = (projectId) => {
    navigate(`/viewer/${projectId}`);
  };
  const [open, project] = visible;
  return (
    <>
       <div className="card flex justify-content-center" style={{ backgroundColor: '#121212' }}>
        <Sidebar
          visible={open}
          position="right"
          onHide={() => setVisible([false, {}])}
          style={{ backgroundColor: '#121212', color: '#fff' }}
        >
          <h2>{project.name}</h2>
          <Button label="view" icon={'pi pi-eye'} severity="success" onClick = { () => cardClickHandler(project.id) } />
          <Button label="delete" icon={'pi pi-trash'} severity="delete"/>
          <div style={{
            width: '100%',
            marginTop: '5%'
          }}>
            
          </div>
        </Sidebar>
        <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
      </div>
    </>
  );
}

const HomePage = () => {
  const { data: curr_user } = useUser();
  const { data } = useGetFiles();

  // React.useEffect(() => console.log(data, curr_user, displayData), [data, curr_user]);
  const [visible, setVisible] = React.useState([false, {}]);
  const [selectedValue, setSelectedValue] = React.useState(() => "by anyone");
  let displayData = [];
  if (selectedValue === "by anyone") {
    displayData = data?.data;
  } else if (selectedValue === "by me") {
    data?.data.map((item) => {
      if (item.owner.username === curr_user.data.username) {
        displayData.push(item);
      }
    });
  } else {
    data?.data.map((item) => {
      if (item.owner.username !== curr_user.data.username) {
        displayData.push(item);
      }
    });
  }

  return (
    <>
      <NavBar />

      <div
        className="title-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "3%",
          paddingRight: "3%",
        }}
      >
        <div className="title">
          <h1>My Files</h1>
        </div>
        <div
          className="owned-by"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Dropdown
            className="dark-dropdown"
            size="small"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.value)}
            options={["by anyone", "by me", "not by me"]}
          />
        </div>
      </div>
      <div className="home-container">
        <div className="home-page">
          <AddNewProject />
          {displayData &&
            displayData.map((project) => (
              <CustomCard
                key={project.id}
                project={project}
                onOpenClick={() => setVisible([true, project])}
              />
            ))}
        </div>
      </div>
      <Side visible={visible} setVisible={setVisible} />
    </>
  );
};

export default HomePage;
