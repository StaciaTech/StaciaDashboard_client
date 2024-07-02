import { React, useState } from "react";
import JobTemplate from "./JobTemplate";
import MailTemplate from "./MailTemplate";
import StatusTemplate from "./StatusTemplate";
import JobSettingsForm from "./JobSettingsForm";
import MailSettingForm from "./MailSettingForm";
import StatusSettingForm from "./StatusSettingForm";
import "../../styles/settings.css";

function TemplateLayout({ setShowTempLayout, title, id }) {
  const [activeTab, setActiveTab] = useState("job");
  const [jobId, setJobId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [mailId, setMailId] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTemplate = () => {
    switch (activeTab) {
      case "job":
        return (
          <JobTemplate
            handleTabClick={handleTabClick}
            setShowTempLayout={setShowTempLayout}
            setJobId={setJobId}
          />
        );
      case "mail":
        return (
          <MailTemplate
            handleTabClick={handleTabClick}
            setShowTempLayout={setShowTempLayout}
            setMailId={setMailId}
          />
        );
      case "status":
        return (
          <StatusTemplate
            handleTabClick={handleTabClick}
            setShowTempLayout={setShowTempLayout}
            setStatusId={setStatusId}
          />
        );
      case "job-form":
        return (
          <JobSettingsForm
            handleTabClick={handleTabClick}
            setShowTempLayout={setShowTempLayout}
            id={jobId}
          />
        );
      case "mail-form":
        return (
          <MailSettingForm
            handleTabClick={handleTabClick}
            setShowTempLayout={setShowTempLayout}
            id={mailId}
          />
        );
      case "status-form":
        return (
          <StatusSettingForm
            handleTabClick={handleTabClick}
            setShowTempLayout={setShowTempLayout}
            id={statusId}
          />
        );
      default:
        return (
          <JobTemplate
            handleTabClick={handleTabClick}
            setShowTempLayout={setShowTempLayout}
          />
        );
    }
  };

  return (
    <>
      <div className="template-layout">
        <div className="template-content">{renderTemplate()}</div>
      </div>
    </>
  );
}

export default TemplateLayout;
