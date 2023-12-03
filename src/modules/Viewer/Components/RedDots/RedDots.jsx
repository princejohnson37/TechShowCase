/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';

const RedDots = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.01]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

RedDots.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default RedDots;
