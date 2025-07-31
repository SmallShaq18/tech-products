// StateLgaDropdown.jsx
import React, { useState } from "react";
import naija from "naija-state-local-government";

const StateLgaDropdown = ({selectedState, setSelectedState, lgas, setLgas}) => {
 // const [selectedState, setSelectedState] = useState("");
  //const [lgas, setLgas] = useState([]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);

    const stateData = naija.lgas(state);
    setLgas(stateData?.lgas || []);
  };

  return (
    <div className="mb-3">
      <label htmlFor="stateSelect" className="form-label">State</label>
      <select
        id="stateSelect"
        className="form-select"
        value={selectedState}
        onInput={handleStateChange}
      >
        <option value="">-- Select a State --</option>
        {naija.states().map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {lgas.length > 0 && (
        <>
          <label htmlFor="lgaSelect" className="form-label mt-3">LGA</label>
          <select id="lgaSelect" className="form-select">
            <option value="">-- Select an LGA --</option>
            {lgas.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default StateLgaDropdown;
