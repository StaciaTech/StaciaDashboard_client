import { React, useState } from "react";
import Switch from "react-switch";

function NotificationSettings() {
  const [careerSwitch, setCareerSwitch] = useState(false);
  const [goalsSwitch, setGoalsSwitch] = useState(false);
  const [reminderSwitch, setReminderSwitch] = useState(false);
  const [pushSwitch, setPushSwitch] = useState(false);
  const [SmsSwitch, setSmsSwitch] = useState(false);
  const [mailSwitch, setMailSwitch] = useState(false);
  return (
    <>
      <div>
        <div className="page-heading">Notifications</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
            margin: "2rem 0rem",
          }}
        >
          <div className="security-option-container">
            <div className="security-option-title">Notification Category</div>
            <div className="security-option">
              <div>Careers</div>
              <div>
                <Switch
                  className="switchtoggler"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={20}
                  onColor="#0047FF"
                  onChange={() => setCareerSwitch(!careerSwitch)}
                  checked={careerSwitch}
                />
              </div>
            </div>
            <div className="security-option">
              <div>Goals</div>
              <div>
                <Switch
                  className="switchtoggler"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={20}
                  onColor="#0047FF"
                  onChange={() => setGoalsSwitch(!goalsSwitch)}
                  checked={goalsSwitch}
                />
              </div>
            </div>
            <div className="security-option">
              <div>Reminders</div>
              <div>
                <Switch
                  className="switchtoggler"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={20}
                  onColor="#0047FF"
                  onChange={() => setReminderSwitch(!reminderSwitch)}
                  checked={reminderSwitch}
                />
              </div>
            </div>
          </div>
          <div className="security-option-container">
            <div className="security-option-title">Notification Messages</div>
            <div className="security-option">
              <div>Push Notifications</div>
              <div>
                <Switch
                  className="switchtoggler"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={20}
                  onColor="#0047FF"
                  onChange={() => setPushSwitch(!pushSwitch)}
                  checked={pushSwitch}
                />
              </div>
            </div>
            <div className="security-option">
              <div>SMS</div>
              <div>
                <Switch
                  className="switchtoggler"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={20}
                  onColor="#0047FF"
                  onChange={() => setSmsSwitch(!SmsSwitch)}
                  checked={SmsSwitch}
                />
              </div>
            </div>
            <div className="security-option">
              <div>Mail</div>
              <div>
                <Switch
                  className="switchtoggler"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={20}
                  onColor="#0047FF"
                  onChange={() => setMailSwitch(!mailSwitch)}
                  checked={mailSwitch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationSettings;
