import GLBModelLoader from '../Components/GlbLoader'
const Viewer = () => {
  return (
    <>
       <GLBModelLoader glbPath="/models/wolf_skull.glb" />
    </>
  );
};
export default Viewer;