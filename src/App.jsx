import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import { Home, Profile, Onboarding } from "./pages";
import ScreeningSchedule from "./pages/ScreeningSchedule";
import SingleRecordDetails from "./pages/records/single-record-details";
import { useStateContext } from "./context";
import VideoUpload from "./components/VideoUpload";
import RealTimeDetection from "./components/RealTimeDetection";
import AnalyzedVideos from "./pages/AnalyzedVideos";
import WatchVideo from "./components/WatchVideo";
import UnderConstruction from "./pages/UnderConstruction";

const App = () => {
  const { user, authenticated, ready, login, currentUser } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    } else if (user && !currentUser) {
      navigate("/onboarding");
    }
  }, [user, authenticated, ready, login, currentUser, navigate]);

  return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video-upload" element={<VideoUpload />} />
          <Route path="/real-time" element={<RealTimeDetection/>} />
          <Route path="/analyzed-videos" element={<AnalyzedVideos/>} />
          <Route path="/watch/:videoUrl" element={<WatchVideo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/medical-records/:id"
            element={<SingleRecordDetails />}
          />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} />
          

          <Route path="*" element={<UnderConstruction/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
