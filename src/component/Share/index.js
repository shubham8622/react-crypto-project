import { RWebShare } from "react-web-share";
const Share = () => {
  return (
    <div>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: `${window.location.protocol}//${window.location.host}/`,
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="nav-links">Share</button>
      </RWebShare>
    </div>
  );
};

export default Share;