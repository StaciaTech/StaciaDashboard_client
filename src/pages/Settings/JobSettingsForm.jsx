import React from "react";

function JobSettingsForm({ id, handleTabClick }) {
  return <div onClick={() => handleTabClick("job")}>JobSettingsForm</div>;
}

export default JobSettingsForm;
