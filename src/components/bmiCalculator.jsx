import { useState } from "react";

const BmiCalculator = () => {
  const [weight, setWeight] = useState(75);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight > 0 && heightFeet > 0) {
      const totalInches = Number(heightFeet) * 12 + Number(heightInches);
      const heightInMeters = totalInches * 0.0254;
      const calculatedBmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      setBmi(calculatedBmi);
    }
  };

  const getStatus = (bmiValue) => {
    if (bmiValue < 18.5) return { text: "Underweight", color: "text-blue-500" };
    if (bmiValue >= 18.5 && bmiValue <= 24.9)
      return { text: "Normal weight", color: "text-green-500" };
    if (bmiValue >= 25 && bmiValue <= 29.9)
      return { text: "Overweight", color: "text-orange-500" };
    return { text: "Obese", color: "text-red-500" };
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-black rounded-2xl shadow-2xl dark:shadow-xl p-8 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white m-10 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight">
        Fitness Calculator
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
        Find out where you stand with your BMI.
      </p>

      <form onSubmit={calculateBMI} className="space-y-6">
        {/* Weight Input (Slider) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Weight
            </label>
            <span className="text-sm font-bold text-orange-500">
              {weight} kg
            </span>
          </div>
          <input
            type="range"
            min="40"
            max="150"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>

        {/* Height Input (Feet and Inches) */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Feet
            </label>
            <select
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
            >
              {[4, 5, 6, 7].map((ft) => (
                <option key={ft} value={ft}>
                  {ft} ft
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Inches
            </label>
            <select
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inc) => (
                <option key={inc} value={inc}>
                  {inc} in
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all active:scale-[0.98] mt-2"
        >
          Calculate My BMI
        </button>
      </form>

      {bmi && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-center border border-gray-100 dark:border-gray-700/50 animate-fade-in transition-all">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
            Your BMI Result
          </p>
          <p className="text-6xl font-black my-3 text-gray-900 dark:text-white">
            {bmi}
          </p>
          <div
            className={`inline-block px-4 py-1.5 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 mt-2`}
          >
            <p className={`text-md font-bold ${getStatus(bmi).color}`}>
              {getStatus(bmi).text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
