import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAlertCircle,
  IconCircleDashedCheck,
  IconFolder,
  IconHourglassHigh,
  IconUserScan,
  IconTrendingUp,
} from "@tabler/icons-react";
import { PiDetectiveBold } from "react-icons/pi";
import { usePrivy } from "@privy-io/react-auth";
import MetricsCard from "./MetricsCard"; // Adjust the import path
import { useStateContext } from "../context"; // Ensure correct import path

const DisplayInfo = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { fetchUserRecords, records, fetchUserByEmail } = useStateContext();
  const [metrics, setMetrics] = useState({
    detectedDeepFakes: 0,
    analyzedMediaFiles: 0,
    pendingAnalysis: 0,
    detectionAccuracy: 0,
    realTimeDetections: 0,
    falsePositives: 0,
  });

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address)
        .then(() => {
          console.log(records);
          let detectedDeepFakes = 0;
          let analyzedMediaFiles = 0;
          let pendingAnalysis = 0;
          let falsePositives = 0;
          let correctDetections = 0;
          let realTimeDetections = 0;

          records.forEach((record) => {
            if (record.analysisData) {
              try {
                const analysis = JSON.parse(record.analysisData);
                detectedDeepFakes += analysis.deepFakesDetected || 0;
                analyzedMediaFiles += analysis.mediaAnalyzed || 0;
                pendingAnalysis += analysis.pendingFiles || 0;
                falsePositives += analysis.falsePositives || 0;
                correctDetections += analysis.correctDetections || 0;
                realTimeDetections += analysis.realTimeInputs || 0;
              } catch (error) {
                console.error("Failed to parse analysisData:", error);
              }
            }
          });

          // Calculate detection accuracy
          const detectionAccuracy =
            analyzedMediaFiles > 0
              ? ((correctDetections / analyzedMediaFiles) * 100).toFixed(2)
              : 0;

          setMetrics({
            detectedDeepFakes,
            analyzedMediaFiles,
            pendingAnalysis,
            detectionAccuracy,
            realTimeDetections,
            falsePositives,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, fetchUserRecords, records]);

  const metricsData = [
    {
      title: "Detected DeepFakes",
      subtitle: "View",
      value: metrics.detectedDeepFakes,
      icon: PiDetectiveBold,
      onClick: () => navigate("/deepfakes/detected"),
    },
    {
      title: "Analyzed Media Files",
      subtitle: "View",
      value: metrics.analyzedMediaFiles,
      icon: IconCircleDashedCheck,
      onClick: () => navigate("/analyzed-videos"),
    },
    {
      title: "Pending Files for Analysis",
      subtitle: "View",
      value: metrics.pendingAnalysis,
      icon: IconFolder,
      onClick: () => navigate("/media/pending"),
    },
    {
      title: "Detection Accuracy",
      subtitle: "View",
      value: `${metrics.detectionAccuracy}%`,
      icon: IconUserScan,
      onClick: () => navigate("/performance/accuracy"),
    },
    {
      title: "Real-Time Detections",
      subtitle: "View",
      value: metrics.realTimeDetections,
      icon: IconHourglassHigh,
      onClick: () => navigate("/real-time"),
    },
    {
      title: "DeepFake Trends",
      subtitle: "View",
      value: "View Trends",
      icon: IconTrendingUp,
      onClick: () => navigate("/trends"),
    },
    {
      title: "False Positives",
      subtitle: "View",
      value: metrics.falsePositives,
      icon: IconAlertCircle,
      onClick: () => navigate("/performance/false-positives"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-[26px]">
      <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        {metricsData.slice(0, 2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-[9px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {metricsData.slice(2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;
