const RedDots = ({ key, position }) => {
  return (
    <mesh key={key} position={position}>
      <sphereGeometry args={[0.01]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default RedDots;
