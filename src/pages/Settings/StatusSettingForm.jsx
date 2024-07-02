import React from "react";

function StatusSettingForm({ id, handleTabClick }) {
  return <div onClick={() => handleTabClick("status")}>StatusSettingForm</div>;
}

export default StatusSettingForm;
