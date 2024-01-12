import { Dropdown } from "primereact/dropdown";

const TitleBar = () => {
  return (
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
  );
};

export default TitleBar;
