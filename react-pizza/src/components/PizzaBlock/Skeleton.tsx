import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton:React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="134" y="12" rx="0" ry="0" width="4" height="0" />
    <circle cx="135" cy="138" r="122" />
    <rect x="-1" y="284" rx="7" ry="7" width="280" height="27" />
    <rect x="0" y="324" rx="9" ry="9" width="280" height="90" />
    <rect x="4" y="434" rx="9" ry="9" width="90" height="27" />
    <rect x="123" y="425" rx="18" ry="18" width="152" height="46" />
  </ContentLoader>
);

export default Skeleton;
