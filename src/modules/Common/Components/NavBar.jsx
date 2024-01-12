import { Button } from "primereact/button";
import { useNavigate } from "react-router";

const NavBar = () => { 
	const navigate = useNavigate();
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
    </>
  ); 
};

export default NavBar;