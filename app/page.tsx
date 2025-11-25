"use client";
import React, { useState } from "react";
import {
  CreditCard,
  ArrowLeft,
  DollarSign,
  Receipt,
  Send,
  Eye,
  Lock,
} from "lucide-react";

export default function ATMMockup() {
  const [screen, setScreen] = useState("welcome");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");

  const handlePinInput = (num: string) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const clearPin = () => setPin("");

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <CreditCard className="w-20 h-20 mb-6 text-blue-600" />
            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
            <p className="text-gray-600 mb-8">
              Please insert your card to begin
            </p>
            <button
              onClick={() => setScreen("pin")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Insert Card
            </button>
          </div>
        );

      case "pin":
        return (
          <div className="flex flex-col h-full p-6">
            <button
              onClick={() => setScreen("welcome")}
              className="flex items-center text-blue-600 mb-6 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex-1 flex flex-col items-center justify-center">
              <Lock className="w-16 h-16 mb-4 text-gray-700" />
              <h2 className="text-xl font-bold mb-2">Enter PIN</h2>
              <p className="text-gray-600 mb-6">
                Please enter your 4-digit PIN
              </p>
              <div className="flex gap-3 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border-2 border-gray-400"
                    style={{
                      backgroundColor:
                        i < pin.length ? "#1e40af" : "transparent",
                    }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePinInput(num.toString())}
                    className="w-16 h-16 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-lg transition"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={clearPin}
                  className="w-16 h-16 bg-red-100 hover:bg-red-200 rounded-lg font-semibold text-sm transition"
                >
                  Clear
                </button>
                <button
                  onClick={() => handlePinInput("0")}
                  className="w-16 h-16 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-lg transition"
                >
                  0
                </button>
                <button
                  onClick={() => pin.length === 4 && setScreen("menu")}
                  className="w-16 h-16 bg-green-100 hover:bg-green-200 rounded-lg font-semibold text-sm transition disabled:opacity-50"
                  disabled={pin.length !== 4}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        );

      case "menu":
        return (
          <div className="flex flex-col h-full p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Main Menu</h2>
              <p className="text-gray-600">Please select a transaction</p>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <button
                onClick={() => setScreen("withdraw")}
                className="bg-blue-50 hover:bg-blue-100 rounded-xl p-6 flex flex-col items-center justify-center transition"
              >
                <DollarSign className="w-12 h-12 mb-3 text-blue-600" />
                <span className="font-semibold">Withdraw Cash</span>
              </button>
              <button
                onClick={() => setScreen("balance")}
                className="bg-green-50 hover:bg-green-100 rounded-xl p-6 flex flex-col items-center justify-center transition"
              >
                <Eye className="w-12 h-12 mb-3 text-green-600" />
                <span className="font-semibold">Check Balance</span>
              </button>
              <button className="bg-purple-50 hover:bg-purple-100 rounded-xl p-6 flex flex-col items-center justify-center transition">
                <Send className="w-12 h-12 mb-3 text-purple-600" />
                <span className="font-semibold">Transfer</span>
              </button>
              <button className="bg-orange-50 hover:bg-orange-100 rounded-xl p-6 flex flex-col items-center justify-center transition">
                <Receipt className="w-12 h-12 mb-3 text-orange-600" />
                <span className="font-semibold">Mini Statement</span>
              </button>
            </div>
            <button
              onClick={() => {
                setScreen("welcome");
                setPin("");
                setAmount("");
              }}
              className="mt-4 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg font-semibold transition"
            >
              Cancel Transaction
            </button>
          </div>
        );

      case "withdraw":
        return (
          <div className="flex flex-col h-full p-6">
            <button
              onClick={() => setScreen("menu")}
              className="flex items-center text-blue-600 mb-6 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h2 className="text-2xl font-bold mb-2">Withdraw Cash</h2>
            <p className="text-gray-600 mb-6">Select or enter amount</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[20, 40, 60, 100, 200, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setScreen("processing")}
                  className="bg-blue-50 hover:bg-blue-100 py-4 rounded-lg font-semibold text-lg transition"
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="mt-auto">
              <label className="block text-sm font-medium mb-2">
                Other Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => amount && setScreen("processing")}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                disabled={!amount}
              >
                Confirm
              </button>
            </div>
          </div>
        );

      case "balance":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="bg-green-50 rounded-full p-6 mb-6">
              <DollarSign className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Available Balance</h2>
            <p className="text-5xl font-bold text-green-600 mb-8">$2,847.50</p>
            <button
              onClick={() => setScreen("menu")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Menu
            </button>
          </div>
        );

      case "processing":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-6"></div>
            <h2 className="text-xl font-bold mb-2">Processing...</h2>
            <p className="text-gray-600">
              Please wait while we process your transaction
            </p>
            <button
              onClick={() => setScreen("success")}
              className="mt-8 text-blue-600 hover:text-blue-700"
            >
              (Complete Transaction)
            </button>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="bg-green-100 rounded-full p-6 mb-6">
              <svg
                className="w-16 h-16 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">
              Transaction Successful
            </h2>
            <p className="text-gray-600 mb-8">
              Please collect your cash and card
            </p>
            <button
              onClick={() => {
                setScreen("welcome");
                setPin("");
                setAmount("");
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Complete
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4 text-black">
      <div className="relative">
        {/* ATM Body */}
        <div
          className="bg-gray-700 rounded-3xl p-8 shadow-2xl"
          style={{ width: "480px" }}
        >
          {/* Screen */}
          <div
            className="bg-white rounded-xl overflow-hidden shadow-inner mb-6"
            style={{ height: "600px" }}
          >
            {renderScreen()}
          </div>

          {/* Card Slot */}
          <div className="bg-gray-900 h-3 rounded-full mb-4"></div>

          {/* Keypad indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 bg-gray-600 rounded"></div>
            ))}
          </div>

          {/* Cash Dispenser */}
          <div className="bg-gray-900 h-12 rounded-lg"></div>
        </div>

        {/* Bank Logo */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-xl shadow-lg">
          BANK ATM
        </div>
      </div>
    </div>
  );
}
