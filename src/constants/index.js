import settings from "../assets/icons/settings.svg";
import analyzed from "../assets/icons/analyzed.svg";
import dashboard from "../assets/icons/dashboard.svg";
import metrics from "../assets/icons/metrics.svg";
import real_time from "../assets/icons/real_time.svg";
import scan from "../assets/icons/scan.svg";
import trend from "../assets/icons/trend.svg";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard, 
    link: "/",
  },
  {
    name: "upload-video",
    imgUrl: scan,
    link: "/video-upload",
  },
  {
    name: "real-time",
    imgUrl: real_time,
    link: "/real-time",
  },
  {
    name: "analyzed-videos",
    imgUrl: analyzed,
    link: "/analyzed-videos",
  },
  {
    name: "metrics",
    imgUrl: metrics,
    link: "/metrics",
  },
  {
    name: "trends",
    imgUrl: trend,
    link: "/trends",
  },
  {
    name: "settings",
    imgUrl: settings,
    link: "/settings",
    disabled: false,
  },
];
