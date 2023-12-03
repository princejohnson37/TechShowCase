const RedDots = ({ position }) => {
  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[0.01]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
};

export default RedDots;
