// React
import React from "react";

// Styles
import "./index.css";

const DeploymentTools = () => {
  return (
    <main className="deployment-tools">
      <div className="buttons-container">
        <h1>Deployment Tools</h1>
        <div className="buttons-row">
          <div className="buttons-column">
            <h2>SEER Code</h2>
            <button>Deploy SEER</button>
            <button>Revert SEER</button>
            <button>Nuclear Option</button>
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
