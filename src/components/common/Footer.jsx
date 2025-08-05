import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Company = ["About", "Careers", "Affiliates"];

export const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex flex-col lg:flex-row gap-8  justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14  border-b  pb-5 border-richblack-700">
        {/* section1 */}
        <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
          {/* company */}

          <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
            <img src={Logo} alt="" className="object-contain" />
            <h1 className="text-xl text-richblack-50 font-semibold">Company</h1>
            <div className=" flex flex-col gap-2 ">
              {Company.map((ele, i) => {
                return (
                  <div
                    key={i}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                );
              })}
            </div>
            <div className=" flex flex-row gap-3 text-xl ">
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* resource and support */}

          <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
            <div>
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resource
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support{" "}
              </h1>
              <Link
                to={"/help-center"}
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2"
              >
                {" "}
                Help Center
              </Link>
            </div>
          </div>

          {/* plan and community */}

          <div className=" lg w-[30%] mb-7 flex lg:flex-wrap flex-col justify-betwen justify-start lg:pl-0">
            <div>
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}{" "}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="text-richblack-50 font-semibold text-[16px] lg:mt-7">
                Community
              </h1>
              <div>
                {Community.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* section2 */}
        <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
          {FooterLink2.map((ele, i) => {
            return (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={link.link}>{link.title}</Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* bottom */}

      <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 pt-9 text-sm">
        <div className="flex  lg:items-start items-center flex-row  lg:w-[30%]">
          {BottomFooter.map((ele, i) => {
            return (
              <div
                key={i}
                className={` ${
                  BottomFooter.length - 1 === i
                    ? ""
                    : " border-r border-richblack-700 cursor-pointer "
                } px-1 hover:text-richblack-50 transition-all duration-200 `}
              >
                <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                  {ele}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center lg:mt-0 mt-5">
          Made with Anurag yadav © 2024 Studynotion
        </div>
      </div>
    </div>
  );
};
