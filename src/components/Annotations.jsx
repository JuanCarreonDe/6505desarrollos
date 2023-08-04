import { Html } from "@react-three/drei";

function Annotations({
  handleButtonClick,
  calculateTargetCoordinates,
  models,
  radius,
  center,
}) {
  return (
    <>
      {models.map((model, i) => {
        const { x, y, z } = calculateTargetCoordinates(
          model,
          radius,
          center,
          -2.8
        );
        return (
          <Html key={model.id} position={[x, model.target.y, z]}>
            <div className="annotations"
              onClick={() => {
                handleButtonClick(model);
              }}
            >
              <p>
              {model.id + 1}
              </p>
            </div>
            {/* <svg
                height="34"
                width="34"
                transform="translate(-16 -16)"
              >
                <circle
                  cx="17"
                  cy="17"
                  r="16"
                  stroke="white"
                  strokeWidth="2"
                  fill="rgba(255,255,255,.66)"
                  onClick={() => {
                    handleButtonClick(model);
                  }}
                />
                <text
                  x="12"
                  y="22"
                  fill="white"
                  fontSize={17}
                  fontFamily="monospace"
                  style={{ pointerEvents: "none" }}
                >
                  {i + 1}
                </text>
              </svg> */}
          </Html>
        );
      })}
    </>
  );
}

export default Annotations;
