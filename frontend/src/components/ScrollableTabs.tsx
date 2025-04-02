// ScrollableTabs.tsx (Cleaned Version)
// 🚫 Functional logic and data removed for academic integrity

import React from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import "./mui-tabs.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const ScrollableTabs = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const onTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabContent = ["Summary", "Top News", "Charts", "Insights"];

  return (
    <>
      <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            activeTab={activeTab}
            onTabClick={(e, index) => onTabClick(index)}
            hideNavBtnsOnMobile={false}
            navBtnClassName="justify-content-md-center"
            leftBtnIcon={<FiChevronLeft size={"1.5em"} />}
            rightBtnIcon={<FiChevronRight size={"1.5em"} />}
          >
            {tabContent.map((content, index) => (
              <Tab key={index} className={`text-center`}>
                <div
                  style={{
                    fontSize: "18px",
                    width: "12.3vw",
                    minWidth: "150px",
                    color: activeTab === index ? "black" : "gray",
                  }}
                >
                  {content}
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>

        {/* 🚫 Main tab content logic removed for showcase */}
        {/* Insert summary, news, chart, and insight component calls here */}
      </div>
    </>
  );
};

export default ScrollableTabs;
