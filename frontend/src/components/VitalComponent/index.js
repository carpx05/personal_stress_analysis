import { API_URL } from "@/constants";
import { useState } from "react";

export default function VitalsForm() {
  const [vitalsData, setVitalsData] = useState({
    hr: "",
    resp: "",
    spo2: "",
    temp: "",
  });
  const [result, setResult] = useState("");
  const [showDassButton, setShowDassButton] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !vitalsData.hr ||
      !vitalsData.resp ||
      !vitalsData.spo2 ||
      !vitalsData.temp
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      localStorage.setItem("vitalsData", JSON.stringify(vitalsData));

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vitalsData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      const resultData = await response.json();

      if (resultData.status === "success") {
        localStorage.setItem("vitalLimit", resultData.health_status);
        setResult("Prediction: " + resultData.health_status);
        setShowDassButton(true);
        window.location.href = "/dass";
      } else {
        setResult("Error: " + resultData.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setResult("Error occurred: " + error.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Check if the value is a positive number
    if (value === "" || Number(value) >= 0) {
      setVitalsData({
        ...vitalsData,
        [e.target.name]: value,
      });
    }
  };

  return (
    <div className="pt-20 bg-gray-100 flex flex-col justify-center gap-14 min-h-screen">
      <div>
        <h1 className="text-4xl text-blue-500 font-bold text-center">
          Vitals Page
        </h1>
      </div>
      <div className="flex justify-center">
        <form
          id="vitalsForm"
          className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="hr"
              className="block text-blue-500 font-semibold mb-2"
            >
              Heart Rate:
            </label>
            <input
              type="number"
              id="hr"
              name="hr"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={vitalsData.hr}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="resp"
              className="block text-blue-500 font-semibold mb-2"
            >
              Respiratory Rate:
            </label>
            <input
              type="number"
              id="resp"
              name="resp"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={vitalsData.resp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="spo2"
              className="block text-blue-500 font-semibold mb-2"
            >
              SpO2 Level:
            </label>
            <input
              type="number"
              id="spo2"
              name="spo2"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={vitalsData.spo2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="temp"
              className="block text-blue-500 font-semibold mb-2"
            >
              Body Temperature:
            </label>
            <input
              type="number"
              id="temp"
              name="temp"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={vitalsData.temp}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit Vitals
          </button>
        </form>
      </div>

      {/* Display the result */}
      <div>
        <h2
          id="result"
          className="text-3xl font-bold text-center text-blue-500"
        >
          {result}
        </h2>
      </div>

      {/* Show DASS button if prediction is successful */}
      {showDassButton && (
        <div id="dass-button" className="mt-6 flex justify-center">
          <a
            href="/dass"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Proceed to DASS Assessment
          </a>
        </div>
      )}
    </div>
  );
}
