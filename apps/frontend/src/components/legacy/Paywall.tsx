"use client";

export function Paywall() {
  return (
    <div className="paywall flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-gradient-to-r from-yellow-100 to-yellow-300 rounded shadow-lg m-4">
      <h2 className="text-3xl font-bold mb-4 text-yellow-800">Unlock Premium Tools</h2>
      <p className="mb-6 text-lg text-yellow-900">Get access to advanced games, quizzes, and AI practice.</p>
      <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105">
        Upgrade to Premium
      </button>
    </div>
  );
}
