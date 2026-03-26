import React, { useState } from "react";
import naija from "naija-state-local-government";

/**
 * StateLgaDropdown — Nigerian State + LGA selector
 *
 * Supports two prop interfaces:
 *   A) CheckoutForm:  selectedState, onStateChange(stateName)
 *   B) Original:      selectedState, setSelectedState, lgas, setLgas
 */
const StateLgaDropdown = ({
  selectedState,
  onStateChange,
  setSelectedState,
  lgas: externalLgas,
  setLgas,
}) => {
  const [internalLgas, setInternalLgas] = useState([]);
  const lgas = externalLgas !== undefined ? externalLgas : internalLgas;

  const handleChange = (e) => {
    const state = e.target.value;
    if (typeof onStateChange === 'function')    onStateChange(state);
    if (typeof setSelectedState === 'function') setSelectedState(state);

    const resolved = naija.lgas(state)?.lgas || [];
    if (typeof setLgas === 'function') setLgas(resolved);
    else setInternalLgas(resolved);
  };

  return (
    <div className="th-state-lga">
      <select
        id="th-state-select"
        className="th-select"
        value={selectedState || ''}
        onChange={handleChange}
      >
        <option value="">Select a state…</option>
        {naija.states().map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {lgas.length > 0 && (
        <div className="th-field" style={{ marginTop: 12 }}>
          <label className="th-field__label" htmlFor="th-lga-select">
            Local Government Area
          </label>
          <select id="th-lga-select" className="th-select">
            <option value="">Select an LGA…</option>
            {lgas.map((lga) => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default StateLgaDropdown;
