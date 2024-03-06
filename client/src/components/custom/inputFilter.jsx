import React, { useState } from "react";
import "../../css/custom/inputFilter.css";


export default function InputFilter({
  label,
  onDelayedChange,
  delay = 1000,
}) {
  const [delayID, setDelayID] = useState(null);

  return (
    <div className="filter-holder">
      <label htmlFor="filter-movie">{label}</label>
      <input type="text" name="filter-movie" onChange={ev => {
        if (delayID !== null)
          clearTimeout(delayID);

        setDelayID(setTimeout(() => {
          setDelayID(null);

          if (onDelayedChange)
            onDelayedChange(ev.target.value);
        }, delay));
      }} />
    </div>
  );
} 