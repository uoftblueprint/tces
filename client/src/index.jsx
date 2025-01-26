import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import ViewJobPost from "./pages/view-job-post/index";

const jobPosting = {
  title: "Software Engineer",
  employer: "Tech Corp",
  location: "Toronto, ON",
  compensation: { min: 70000, max: 120000, frequency: "yearly" },
  jobType: "Full-time",
  hoursPerWeek: 40,
  closeDate: "2025-01-31",
  description:
    "We are looking for a skilled Software Engineer to join our team. The role requires expertise in developing robust web applications and collaborating with cross-functional teams to deliver high-quality software. Responsibilities include writing clean code, performing code reviews, and ensuring the scalability of our system. Additionally, the candidate should have experience with cloud services and DevOps tools. This is a fantastic opportunity to join a fast-growing company and make a real impact.",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ViewJobPost jobPosting={jobPosting} />
  </React.StrictMode>,
);
