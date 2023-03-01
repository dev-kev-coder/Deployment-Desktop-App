// React
import React from "react";

// Styles
import "./index.css";

const DeploymentTools = () => {
  const handleDeploy = () => {
    electron.seerApi.deploySeer();
  };
  const handleRevert = () => {
    electron.seerApi.revertSeer();
  };
  const handleNuclear = () => {
    electron.seerApi.nuclearOption();
  };

  return (
    <main className="deployment-tools">
      <div className="buttons-container">
        <h1>Deployment Tools</h1>
        <div className="buttons-row">
          <div className="buttons-column">
            <h2>SEER Code</h2>
            <button onClick={handleDeploy}>Deploy SEER</button>
            <button onClick={handleRevert}>Revert SEER</button>
            <button onClick={handleNuclear}>Nuclear Option</button>
          </div>

          <div className="buttons-column">
            <h2>SQL Database</h2>
            <button>Back Up</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeploymentTools;
