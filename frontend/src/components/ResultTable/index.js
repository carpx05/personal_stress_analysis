import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from 'react';

// Define button configurations
const buttonConfigs = [
  {
    message: "Chat with Us",
    color: "bg-blue-500",
    route: "/chat",
  },
  {
    message: "Expert Consultant",
    color: "bg-red-500",
    route: "/expert-chat",
  },
];

export default function ResultTable() {
  const router = useRouter();
  const { stressScore, anxietyScore, depressionScore } = router.query;
  const [vitalLimit, setVitalLimit] = useState(null);

  useEffect(() => {
    try {
      const storedVitalLimit = localStorage.getItem("vitalLimit");
      if (storedVitalLimit && (storedVitalLimit === "Abnormal" || storedVitalLimit === "Normal")) {
        setVitalLimit(storedVitalLimit);
      } else {
        setVitalLimit(null);
      }
    } catch (error) {
      console.error("Error retrieving vitalLimit from localStorage:", error);
      setVitalLimit(null);
    }
  }, []);

  const getStressLevel = (score) => {
    if (score <= 14) return "Normal";
    if (score <= 18) return "Mild";
    if (score <= 25) return "Moderate";
    if (score <= 33) return "Severe";
    return "Extremely Severe";
  };

  const getAnxietyLevel = (score) => {
    if (score <= 7) return "Normal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Severe";
    return "Extremely Severe";
  };

  const getDepressionLevel = (score) => {
    if (score <= 9) return "Normal";
    if (score <= 13) return "Mild";
    if (score <= 20) return "Moderate";
    if (score <= 27) return "Severe";
    return "Extremely Severe";
  };

  const isAbnormal = (limit) => limit === "Abnormal";

  const msg1 = "You can reach out for support.";
  const msg2 = `Please consult a professional immediately. Due to ${depressionScore > 13 ? 'Depression' : ''} ${anxietyScore > 14 ? 'Anxiety' : ''} ${stressScore > 25 ? 'Stress' : ''}`.trim();

  const needsConsultation = isAbnormal(vitalLimit) && 
    (depressionScore > 13 || anxietyScore > 14 || stressScore > 25);

  // Update button display logic based on vitalLimit and scores
  const showChatButton = vitalLimit === "Normal" && !(depressionScore > 13 || anxietyScore > 14 || stressScore > 25);
  const showExpertButton = isAbnormal(vitalLimit) && (depressionScore > 13 || anxietyScore > 14 || stressScore > 25);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Final Report
        </h1>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Stress</td>
              <td className="border px-4 py-2">{stressScore}</td>
              <td className="border px-4 py-2">
                {getStressLevel(stressScore)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Anxiety</td>
              <td className="border px-4 py-2">{anxietyScore}</td>
              <td className="border px-4 py-2">
                {getAnxietyLevel(anxietyScore)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Depression</td>
              <td className="border px-4 py-2">{depressionScore}</td>
              <td className="border px-4 py-2">
                {getDepressionLevel(depressionScore)}
              </td>
            </tr>
          </tbody>
        </table>
        {vitalLimit && (
          <div className="mt-4 text-center cursor-pointer">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">
                    <p className={`font-semibold text-lg ${needsConsultation ? 'text-red-600' : 'text-green-600'}`}>
                      {needsConsultation ? msg2 : msg1}
                    </p>
                  </td>
                  <td className="border px-4 py-2">
                    {showExpertButton ? (
                      <button
                        onClick={() => router.push(buttonConfigs[1].route)}
                        className={`${buttonConfigs[1].color} text-white px-6 py-3 rounded-lg shadow-md hover:${buttonConfigs[1].color.replace('500', '600')} transition duration-200`}
                      >
                        {buttonConfigs[1].message}
                      </button>
                    ) : showChatButton ? (
                      <button
                        onClick={() => router.push(buttonConfigs[0].route)}
                        className={`${buttonConfigs[0].color} text-white px-6 py-3 rounded-lg shadow-md hover:${buttonConfigs[0].color.replace('500', '600')} transition duration-200`}
                      >
                        {buttonConfigs[0].message}
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {buttonConfigs.map((button, index) => (
                          <button
                            key={index}
                            onClick={() => router.push(button.route)}
                            className={`${button.color} text-white px-6 py-3 rounded-lg shadow-md hover:${button.color.replace('500', '600')} transition duration-200`}
                          >
                            {button.message}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
