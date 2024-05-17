import React, { useState, useEffect } from "react";
import "../../styles/overviewpage.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { Line } from "rc-progress";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { TbArrowsMaximize } from "react-icons/tb";
import { PiTimerFill } from "react-icons/pi";
import LineChart from "../../components/dashboard/LineChart";
import { FaUser } from "react-icons/fa";
import BarChart from "../../components/dashboard/BarChart";
import { MdOutlineArrowOutward } from "react-icons/md";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { RiSettings5Fill } from "react-icons/ri";
import { PiPlantFill } from "react-icons/pi";
import { ImSpoonKnife } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import DoughnutChart from "../../components/dashboard/DoughnutChart";
import { IoIosRefresh } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import StackedBarChart from "../../components/dashboard/StackedBarChart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { RxTarget } from "react-icons/rx";
import axios from "axios";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import { RiDownload2Line } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
const emails = [
  {
    id: 1,
    sender: "Preethi",
    subject:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. aster demirit",
  },
  {
    id: 2,
    sender: "Harish Subramanian",
    subject:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.aster demirit",
  },
  {
    id: 3,
    sender: "Alice",
    subject:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.aster demirit",
  },
  {
    id: 4,
    sender: "Bob Brown",
    subject:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.aster demirit",
  },
  {
    id: 5,
    sender: "Emily Wilson",
    subject:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.aster demirit",
  },
  {
    id: 6,
    sender: "Gautham   ",
    subject:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.aster demirit",
  },
  {
    id: 7,
    sender: "Drake Williamson",
    subject:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.aster demirit",
  },
];
const Mail = ({ id, sender, subject }) => {
  return (
    <div className="maillistitem">
      <div className="maillistitem-left">
        <div className="maillistcheckbox">
          <input
            type="checkbox"
            name={`emailCheckbox${id}`}
            id={`emailCheckbox${id}`}
          />
        </div>
        <div className="maillistname">{sender}</div>
      </div>
      <div className="maillistsubject">{subject.substring(0, 50) + "..."}</div>
    </div>
  );
};

const ProgressBar = ({ percent, color, value, tooltipId, name }) => {
  const barStyle = {
    backgroundColor: color,
    height: "10px",
    width: `${percent}%`,
    margin: "0 5px",
    borderRadius: "4px",
  };

  return (
    <div data-tooltip-id={tooltipId} style={barStyle}>
      <ReactTooltip
        id={tooltipId}
        place="top"
        content={name + "  " + value}
      ></ReactTooltip>
    </div>
  );
};
const progressValues = [30, 60, 90, 20];
const totalWidth = progressValues.reduce((acc, curr) => acc + curr, 0);
const progressBars = progressValues.map((value, index) => ({
  percent: (value / totalWidth) * 100,
  color: ["#B7CBFF", "#8AAAFF", "#5C89FF", "#2E68FF"][index],
  name: ["Instagram", "X", "Facebook", "LinkedIn"][index],
  value: value,
  tooltipId: `tooltip-${index}`, // Unique tooltip ID for each progress bar
}));

const submitModalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "98rem",
    borderRadius: "0.9rem",
  },
  overlay: {
    backgroundColor: "#00000040",
  },
};
const uptimeModalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "54rem",
    height: "30rem",
    borderRadius: "0.9rem",
  },
  overlay: {
    backgroundColor: "#00000040",
  },
};

const downtimeData = [
  { sno: 1, date: "26/02/2023", time: "5:02 PM", duration: "4:05 Mins" },
  { sno: 2, date: "27/02/2023", time: "3:15 AM", duration: "2:30 Mins" },
  { sno: 3, date: "28/02/2023", time: "10:45 AM", duration: "1:20 Hrs" },
  { sno: 4, date: "01/03/2023", time: "8:30 PM", duration: "35 Mins" },
  { sno: 5, date: "26/02/2023", time: "5:02 PM", duration: "4:05 Mins" },
  { sno: 6, date: "27/02/2023", time: "3:15 AM", duration: "2:30 Mins" },
  { sno: 7, date: "28/02/2023", time: "10:45 AM", duration: "1:20 Hrs" },
  { sno: 8, date: "01/03/2023", time: "8:30 PM", duration: "35 Mins" },
];

const averageLoadingData = [
  { sno: 1, pagename: "Landing Page", pageloadtime: "0.9 sec" },
  { sno: 2, pagename: "All Product Page", pageloadtime: "1 sec" },
  { sno: 3, pagename: "Chili Landing Page", pageloadtime: "2 sec" },
  { sno: 4, pagename: "Contact Us", pageloadtime: "0.9 sec" },
  { sno: 5, pagename: "All Service Page", pageloadtime: "0.5 sec" },
  { sno: 6, pagename: "All Project Page", pageloadtime: "0.4 sec" },
];

const OverViewPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trafficSourceModal, setTrafficSourceModal] = useState(false);
  const [uptimeModal, setUptimeModal] = useState(false);
  const [averageltModal, setAverageltModal] = useState(false);
  const [popupBannerModal, setPopupBannerModal] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addGoals, setAddGoals] = useState(false);

  function closeModal() {
    setModalIsOpen(false);
    setTrafficSourceModal(false);
    setUptimeModal(false);
    setAverageltModal(false);
    setPopupBannerModal(false);
  }
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/dashboard/getDashBoard"
        );
        setDashboardData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleShiftUp = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleShiftDown = () => {
    setStartIndex((prevIndex) =>
      Math.min(dashboardData.goals.length, prevIndex + 1)
    );
  };
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    'Total Views',
    'New Users',
    'Bounce Rate',
    'Avg Time Spent',
    'Mail Received',
    'Instagram',
    'X',
    'Facebook',
    'LinkedIn',
    'Page1 view',
    'Page 100 view',
    'Uptime',
    'Real Time Users',
    'Direct Traffic',
    'Email Marketing',
    'Social Media Traffic',
    'Online Forum',
    'Search Engine',
    'Free Quote - Machine Design',
    'Free Quote - Project Documentation',
    'Free Quote - Cad Modeling',
    'Free Quote - Ansys',
    'Free Quote - 3D Modeling',
    'Avg Loading Time',
    'Pop Up Banner Interaction',
    'Information Technology - Mail',
    'Agri Industries - Mail',
    'Food Porcessing - Mail'
  ];

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      {dashboardData && (
        <div className="dashboardcontainer">
          <div className="dash-stats-container">
            <div className="stats-card">
              <div className="stats-card-title">Total Views</div>
              <div className="stats-card-value">{dashboardData.TotalViews}</div>
            </div>
            <div className="stats-card">
              <div className="stats-card-title">New Users</div>
              <div className="stats-card-value">{dashboardData.NewUsers}</div>
            </div>
            <div className="stats-card">
              <div className="stats-card-title">Bounce Rate</div>
              <div className="stats-card-value">
                {dashboardData.BounceRate}%
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-card-title">Avg. time spent</div>
              <div className="stats-card-value">
                2.30 <span style={{ fontSize: "0.875rem" }}>mins</span>{" "}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-card-title">Mail Received</div>
              <div className="stats-card-value">
                {dashboardData.MailReceived}k
              </div>
            </div>
            <div className="stats-card export">
              <div className="stats-card-title">Export</div>
              <div className="download-icon">
                <MdOutlineFileDownload size={38} />
              </div>
            </div>
          </div>
          <div className="viewscontainer">
            <div className="views-graph">
              <div className="views-header">
                Views{" "}
                <TbArrowsMaximize
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                  className="goals-icon"
                />
              </div>
              <div className="linechartholder">
                <LineChart />
              </div>
            </div>
            {modalIsOpen && (
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={submitModalCustomStyles}
                contentLabel="Example Modal"
              >
                <div className="submit-modal-container">
                  <div className="traffic-header">
                    <div className="traffic-modal-left">Website Traffic</div>
                    <div className="traffic-modal-right">
                      <div className="traffic-duration-items">
                        <div className="td-list">Last Week</div>
                        <div className="td-list active">Last 6 months</div>
                        <div className="td-list">Last year</div>
                        <div className="td-list">
                          Custom{" "}
                          <FiCalendar style={{ verticalAlign: "middle" }} />
                        </div>
                      </div>
                      <div className="goals-icon download-btn">
                        <RiDownload2Line style={{ verticalAlign: "middle" }} />
                      </div>

                      <IoMdClose
                        style={{
                          verticalAlign: "middle",
                          color: "#787878",
                          cursor: "pointer",
                        }}
                        onClick={closeModal}
                      />
                    </div>
                  </div>

                  <div className="linechartholderexpanded">
                    <LineChart />
                  </div>
                </div>
              </Modal>
            )}

            <div className="goals-holder">
              <div className="goals-holder-title">
                <div>Goals</div>
                <div className="goals-icon">
                  {" "}
                  {addGoals ? (
                    <div
                      className="cancel-goal-btn"
                      onClick={() => setAddGoals(!addGoals)}
                    >
                      {" "}
                      Cancel
                    </div>
                  ) : (
                    <FaPlusCircle
                      onClick={() => setAddGoals(!addGoals)}
                      size={25}
                      style={{ verticalAlign: "middle" }}
                    />
                  )}
                </div>
              </div>

              {addGoals ? (
                <>
                  <div className="addgoalformholder">
                    <form className="addgoalform">
                      
                      <select className="goalfield goaldropdown" id="options" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select Your Source</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
     <div style={{display:"flex", gap:"1rem"}}>
      <input
                        className="goalfield goalfield-col1"
                        type=""
                        name="goaldesc"
                        id=""
                        placeholder="Enter Your Goal"
                        required
                      />
                      
                      <input
                        className="goalfield goalfield-col2"
                        type="text"
                        name="Goal Target"
                        id=""
                        placeholder="Enter Your Target"
                        required
                      />
                      </div>
                      <input className="formbtn" type="submit" value="Save" />
                    </form>
                  </div>
                </>
              ) : (
                <>
                  {dashboardData.goals
                    .slice(startIndex, startIndex + 3)
                    .map((goal, index) => (
                      <div key={index} className="goal-items">
                        {/* Render each goal item */}
                        <div className="goal-item-icon">
                          {/* Render icon here */}
                          <RxTarget size={30} />
                        </div>
                        <div className="goal-item-stats">
                          {goal.description}
                          <div className="goal-progress-bar">
                            {/* Render progress bar here */}
                            <Line
                              percent={goal.progress}
                              strokeWidth={1.5}
                              trailWidth={1.5}
                              strokeColor="#0047FF"
                              trailColor="#E5EDFF"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="arrowholder">
                    <MdOutlineKeyboardDoubleArrowUp
                      disabled={startIndex === 0}
                      onClick={handleShiftUp}
                      size={27}
                    />
                    <MdOutlineKeyboardDoubleArrowDown
                      disabled={startIndex === dashboardData.goals.length - 3}
                      onClick={handleShiftDown}
                      size={27}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="row3">
            <div className="row3-left">
              <div className="row3-left-col1">
                <div className="cumulativelinkheader ">
                  {" "}
                  Cumulative Social Links
                  <span
                    style={{
                      fontSize: "2.25rem",
                      color: "black",
                      fontWeight: "600",
                    }}
                  >
                    112
                  </span>
                </div>
                <div className="cumulativebody">
                  <div className="cumulativeprogressbar">
                    {progressBars.map((bar, index) => (
                      <ProgressBar
                        key={index}
                        percent={bar.percent}
                        color={bar.color}
                        value={bar.value}
                        name={bar.name}
                        tooltipId={bar.tooltipId}
                      />
                    ))}
                  </div>

                  <div className="trafficlabels cumulativefooter">
                    <div className="trafficlabel-item">
                      {" "}
                      <div className="dot dot2"></div>Instagram
                    </div>
                    <div className="trafficlabel-item">
                      <div className="dot dot1"></div> X
                    </div>
                    <div className="trafficlabel-item">
                      <div className="dot dot3"></div> Facebook
                    </div>
                    <div className="trafficlabel-item">
                      <div className="dot dot5"></div> LinkedIn
                    </div>
                  </div>
                </div>
              </div>

              <div className="row3-left-col2">
                <div className="row3-left-col2-up">
                  <PiTimerFill style={{ verticalAlign: "middle" }} />
                  <span style={{ margin: "0 1rem 0 0.3rem" }}>Uptime</span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "2.25rem",
                      fontWeight: "600",
                      margin: "0 1rem 0 0",
                    }}
                  >
                    {" "}
                    {dashboardData.Uptime}{" "}
                  </span>
                  <TbArrowsMaximize
                    size={20}
                    className="goals-icon"
                    onClick={() => setUptimeModal(!uptimeModal)}
                  />
                </div>
                <div className="row3-left-col2-down">
                  <FaUser />
                  <span style={{ margin: "0 1rem 0 0.5rem" }}>
                    Real-Time Users
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "2.25rem",
                      fontWeight: "600",
                      margin: "0 0 0 0.5rem",
                    }}
                  >
                    {" "}
                    {dashboardData.RealTimeUsers}{" "}
                  </span>
                </div>
              </div>
            </div>
            {uptimeModal && (
              <Modal
                isOpen={uptimeModal}
                onRequestClose={closeModal}
                style={uptimeModalCustomStyles}
                contentLabel="Example Modal"
              >
                <div className="submit-modal-container">
                  <div className="traffic-header traffic-source-header">
                    <div className="traffic-modal-left uptime-left">
                      <PiTimerFill style={{ verticalAlign: "middle" }} />
                      <span
                        style={{
                          margin: "0 1rem 0 0.3rem",
                          verticalAlign: "middle",
                        }}
                      >
                        Uptime
                      </span>
                      <span
                        style={{
                          color: "black",
                          fontSize: "2.25rem",
                          fontWeight: "600",
                          margin: "0 1rem 0 0",
                        }}
                      >
                        {" "}
                        {dashboardData.Uptime}{" "}
                      </span>
                    </div>

                    <div className="traffic-modal-right">
                      <div className="filter-btn">
                        <FiFilter
                          style={{
                            verticalAlign: "middle",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="filter-btn">
                        <RiDownload2Line
                          size={23}
                          style={{
                            verticalAlign: "middle",

                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                          }}
                        />
                      </div>

                      <IoMdClose
                        style={{
                          verticalAlign: "middle",
                          color: "#787878",
                          cursor: "pointer",
                        }}
                        onClick={closeModal}
                      />
                    </div>
                  </div>
                  <div className="uptimeheader">
                    No. of Downtime {downtimeData.length}
                  </div>
                  <div className="uptimetableheader">
                    <div className="uptime-thead col1">Sno</div>
                    <div className="uptime-thead col2">Downtime Date</div>
                    <div className="uptime-thead col3">Time</div>
                    <div className="uptime-thead col4">Duration</div>
                  </div>

                  <div className="uptime-tbody">
                    {downtimeData.map((entry, index) => (
                      <div key={index} className="uptime-tdata">
                        <div className="tdata col1">{entry.sno}</div>
                        <div className="tdata col2">{entry.date}</div>
                        <div className="tdata col3">{entry.time}</div>
                        <div className="tdata col4">{entry.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Modal>
            )}
            <div className="row3-right">
              <div className="goals-holder-title">
                <div>7/120 Pages</div>

                <div className="goals-icon">
                  <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                    Expand
                  </span>
                  <MdOutlineArrowOutward
                    style={{ verticalAlign: "middle" }}
                    size={15}
                  />
                </div>
              </div>

              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "black",
                }}
              >
                {" "}
                Page Views
              </div>

              <div className="pageviewbarchart">
                <BarChart />
              </div>
            </div>
          </div>

          <div className="row3 row4">
            <div className="row3-left row4-left">
              <div className="trafficheader">
                Website Traffic Source
                <div className="trafficlabels">
                  <div className="trafficlabel-item">
                    {" "}
                    <div className="dot dot2"></div>Direct Traffic
                  </div>
                  <div className="trafficlabel-item">
                    <div className="dot dot1"></div> Email Marketing
                  </div>
                  <div className="trafficlabel-item">
                    <div className="dot dot3"></div> Social Media
                  </div>
                  <div className="trafficlabel-item">
                    <div className="dot dot5"></div> Online Forum
                  </div>
                  <div className="trafficlabel-item">
                    <div className="dot dot4"></div> Search Engine
                  </div>
                </div>
                <div className="goals-icon">
                  <TbArrowsMaximize
                    onClick={() => setTrafficSourceModal(!trafficSourceModal)}
                  />
                </div>
              </div>
              {trafficSourceModal && (
                <Modal
                  isOpen={trafficSourceModal}
                  onRequestClose={closeModal}
                  style={submitModalCustomStyles}
                  contentLabel="Example Modal"
                >
                  <div className="submit-modal-container">
                    <div className="traffic-header traffic-source-header">
                      <div className="traffic-modal-left">
                        Website Traffic Source
                      </div>
                      <div className="trafficlabels">
                        <div className="trafficlabel-item">
                          {" "}
                          <div className="dot dot2"></div>Direct Traffic
                        </div>
                        <div className="trafficlabel-item">
                          <div className="dot dot1"></div> Email Marketing
                        </div>
                        <div className="trafficlabel-item">
                          <div className="dot dot3"></div> Social Media
                        </div>
                        <div className="trafficlabel-item">
                          <div className="dot dot5"></div> Online Forum
                        </div>
                        <div className="trafficlabel-item">
                          <div className="dot dot4"></div> Search Engine
                        </div>
                      </div>
                      <div className="traffic-modal-right">
                        <div className="traffic-duration-items">
                          <div className="td-list">Last Week</div>
                          <div className="td-list active">Last 6 months</div>
                          <div className="td-list">Last year</div>
                          <div className="td-list">
                            Custom{" "}
                            <FiCalendar style={{ verticalAlign: "middle" }} />
                          </div>
                        </div>
                        <div className="goals-icon download-btn">
                          <RiDownload2Line
                            style={{ verticalAlign: "middle" }}
                          />
                        </div>

                        <IoMdClose
                          style={{
                            verticalAlign: "middle",
                            color: "#787878",
                            cursor: "pointer",
                          }}
                          onClick={closeModal}
                        />
                      </div>
                    </div>

                    <div className="linechartholderexpanded">
                      <StackedBarChart />
                    </div>
                  </div>
                </Modal>
              )}

              <div className="stackedbarchartholder">
                <StackedBarChart />
              </div>
            </div>

            <div className="row3-right row4-right">
              <div className="goals-holder-title">
                <div>Recent Mail</div>
                <div className="goals-icon">
                  <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                    All Mails
                  </span>
                </div>
              </div>

              <div className="mailsearchbar">
                <div>
                  <CiSearch
                    size={22}
                    style={{ verticalAlign: "middle", marginRight: "1rem" }}
                  />
                  <input
                    type="text"
                    className="searchbox"
                    placeholder="search"
                  />
                </div>
                <HiOutlineAdjustmentsHorizontal
                  size={22}
                  style={{ verticalAlign: "middle" }}
                />
              </div>

              <div className="mailactionmenus">
                <div className="mailactionmenus-left">
                  <input type="checkbox" name="" id="" />
                  <IoIosRefresh />
                  <BsThreeDotsVertical />
                </div>
                <div className="mailactionmenus-right">1-10 of 30</div>
              </div>
              <div className="maillists">
                {emails.map((email) => (
                  <Mail
                    key={email.id}
                    id={email.id}
                    sender={email.sender}
                    subject={email.subject}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="row3 row5">
            <div className="row3-left">
              <div className="row3-left-col1">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "0.5rem",
                  }}
                >
                  <BsFillFileEarmarkTextFill /> Free Quote{" "}
                  <span
                    style={{
                      fontSize: "2.25rem",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    45
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "50%",
                  }}
                >
                  <div
                    className="doughchartholder"
                    style={{ width: "55%", padding: "2rem" }}
                  >
                    <DoughnutChart />
                  </div>

                  <div className="doughnutlabels">
                    <div className="label-item">
                      {" "}
                      <div className="dot dot1"></div> Machine Design
                    </div>
                    <div className="label-item">
                      <div className="dot dot2"></div> Project Documentation
                    </div>
                    <div className="label-item">
                      <div className="dot dot3"> </div>Cad Modeling
                    </div>
                    <div className="label-item">
                      <div className="dot dot4"></div>Ansys
                    </div>
                    <div className="label-item">
                      <div className="dot dot5"> </div>3D Modeling
                    </div>
                  </div>
                </div>
              </div>

              <div className="row3-left-col2">
                <div className="row3-left-col2-up row5-left-col2-up ">
                  <TbArrowsMaximize
                    className="goals-icon average-maximize"
                    onClick={() => setAverageltModal(!averageltModal)}
                  />
                  <div>Average Loading Time</div>
                  <div
                    style={{
                      fontSize: "2.25rem",
                      color: "black",
                      fontWeight: "600",
                    }}
                  >
                    {dashboardData.AverageLoadingTime} sec
                  </div>
                  {averageltModal && (
                    <Modal
                      isOpen={averageltModal}
                      onRequestClose={closeModal}
                      style={uptimeModalCustomStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="submit-modal-container">
                        <div className="traffic-header traffic-source-header">
                          <div className="traffic-modal-left uptime-left">
                            <span
                              style={{
                                margin: "0 1rem 0 0.3rem",
                                verticalAlign: "middle",
                              }}
                            >
                              Average Loading Time
                            </span>
                            <span
                              style={{
                                color: "black",
                                fontSize: "2.25rem",
                                fontWeight: "600",
                                margin: "0 1rem 0 0",
                              }}
                            >
                              {" "}
                              {dashboardData.AverageLoadingTime}{" "}
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "1rem",
                                  fontWeight: "600",
                                }}
                              >
                                sec
                              </span>
                            </span>
                            <span
                              style={{
                                margin: "0 1rem 0 0.3rem",
                                verticalAlign: "middle",
                              }}
                            >
                              (This Month)
                            </span>
                          </div>

                          <div className="traffic-modal-right">
                            <div className="filter-btn">
                              <FiFilter
                                style={{
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                            <div className="filter-btn">
                              <RiDownload2Line
                                size={23}
                                style={{
                                  verticalAlign: "middle",

                                  cursor: "pointer",
                                  backgroundColor: "#F5F5F5",
                                }}
                              />
                            </div>

                            <IoMdClose
                              style={{
                                verticalAlign: "middle",
                                color: "#787878",
                                cursor: "pointer",
                              }}
                              onClick={closeModal}
                            />
                          </div>
                        </div>
                        <div className="uptimetableheader">
                          <div className="uptime-thead avg-col1">Sno</div>
                          <div className="uptime-thead avg-col2">Page Name</div>
                          <div className="uptime-thead avg-col3">
                            Page Load Time
                          </div>
                        </div>

                        <div className="uptime-tbody">
                          {averageLoadingData.map((entry, index) => (
                            <div key={index} className="uptime-tdata">
                              <div className="tdata avg-col1">{entry.sno}</div>
                              <div className="tdata avg-col2">
                                {entry.pagename}
                              </div>
                              <div className="tdata avg-col3">
                                {entry.pageloadtime}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
                <div className="row3-left-col2-up row5-left-col2-up ">
                  <TbArrowsMaximize
                    className="goals-icon average-maximize"
                    onClick={() => setPopupBannerModal(!popupBannerModal)}
                  />
                  <div>Pop Up Banner Interaction</div>
                  <div
                    style={{
                      fontSize: "2.25rem",
                      color: "black",
                      fontWeight: "600",
                    }}
                  >
                    {dashboardData.PopUpBannerInteraction}
                  </div>
                </div>
                {popupBannerModal && (
                  <Modal
                    isOpen={popupBannerModal}
                    onRequestClose={closeModal}
                    style={uptimeModalCustomStyles}
                    contentLabel="Example Modal"
                  >
                    <div className="submit-modal-container">
                      <div className="traffic-header traffic-source-header">
                        <div className="traffic-modal-left uptime-left">
                          <PiTimerFill style={{ verticalAlign: "middle" }} />
                          <span
                            style={{
                              margin: "0 1rem 0 0.3rem",
                              verticalAlign: "middle",
                            }}
                          >
                            Uptime
                          </span>
                          <span
                            style={{
                              color: "black",
                              fontSize: "2.25rem",
                              fontWeight: "600",
                              margin: "0 1rem 0 0",
                            }}
                          >
                            {" "}
                            {dashboardData.Uptime}{" "}
                          </span>
                        </div>

                        <div className="traffic-modal-right">
                          <div className="filter-btn">
                            <FiFilter
                              size={20}
                              style={{
                                verticalAlign: "middle",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          <div className="filter-btn">
                            <RiDownload2Line
                              size={20}
                              style={{
                                verticalAlign: "middle",

                                cursor: "pointer",
                                backgroundColor: "#F5F5F5",
                              }}
                            />
                          </div>

                          <IoMdClose
                            style={{
                              verticalAlign: "middle",
                              color: "#787878",
                              cursor: "pointer",
                            }}
                            onClick={closeModal}
                          />
                        </div>
                      </div>
                      <div className="uptimeheader">
                        No. of Downtime {downtimeData.length}
                      </div>
                      <div className="uptimetableheader">
                        <div className="uptime-thead col1">Sno</div>
                        <div className="uptime-thead col2">Downtime Date</div>
                        <div className="uptime-thead col3">Time</div>
                        <div className="uptime-thead col4">Duration</div>
                      </div>

                      <div className="uptime-tbody">
                        {downtimeData.map((entry, index) => (
                          <div key={index} className="uptime-tdata">
                            <div className="tdata col1">{entry.sno}</div>
                            <div className="tdata col2">{entry.date}</div>
                            <div className="tdata col3">{entry.time}</div>
                            <div className="tdata col4">{entry.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
            <div className="row3-right row5-right">
              Emails from the organization
              <div className="emailstats">
                <div className="emailstats-item">
                  <div className="itemlogo">
                    <RiSettings5Fill
                      size={25}
                      style={{ verticalAlign: "middle" }}
                    />
                  </div>
                  <div className="itemname">Information Technology</div>
                  <div className="itemvalue">43</div>
                </div>
                <div className="emailstats-item">
                  <div className="itemlogo">
                    <PiPlantFill
                      size={25}
                      style={{ verticalAlign: "middle" }}
                    />
                  </div>
                  <div className="itemname">Agri Industries</div>
                  <div className="itemvalue">43</div>
                </div>
                <div className="emailstats-item">
                  <div className="itemlogo">
                    <ImSpoonKnife
                      size={25}
                      style={{ verticalAlign: "middle" }}
                    />
                  </div>
                  <div className="itemname">Food Processing</div>
                  <div className="itemvalue">43</div>
                </div>
              </div>
              <div className="arrowholder">
                <MdOutlineKeyboardDoubleArrowUp size={30} />
                <MdOutlineKeyboardDoubleArrowDown size={30} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverViewPage;
