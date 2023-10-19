import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faDiscord,
  faTelegram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import "./socials.css";
import { faBug } from "@fortawesome/free-solid-svg-icons";

const HeaderSocials = (props: any) => {
  return (
    <div className="social-header-wrapper">
      <div className={`social-header`}>
        <div className="social-header-icon ">
          <a target="_blank" href="">
            <FontAwesomeIcon icon={faDiscord} size="lg" />
          </a>
        </div>
        <div className="social-header-icon ">
          <a target="_blank" href="">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </div>
        <div className="social-header-icon ">
          <a target="_blank" href="">
            <FontAwesomeIcon icon={faTelegram} size="lg" />
          </a>
        </div>
        <div className="social-header-icon ">
          <a target="_blank" href="">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default HeaderSocials;
