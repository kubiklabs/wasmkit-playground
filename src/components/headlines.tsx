import React, { FC } from "react";

type headings = {
  heading: string | number;
  subheading: string | number;
};

const Headlines: FC<headings> = ({ heading, subheading }) => {
  return (
    <div className="heading">
      {
        heading ==="Code ID" ?
        <>
        {heading}- {subheading}
        </>
        :
        <div>
        {heading}
        <div className="subheading-forAddress">
        {subheading}
        </div>
      </div>
      }
    </div>
  );
};

export default Headlines;
