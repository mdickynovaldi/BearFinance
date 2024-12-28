"use client";

import React, { useState, useEffect } from "react";
import { X, Menu, Sun, Moon } from "lucide-react";
import { ModeToggle } from "./toogle-dark-mode";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MinimalistDrawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed top-6 right-6 z-30 p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800"
        aria-label="Toggle drawer"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out dark:bg-opacity-70"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer */}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 h-full overflow-y-auto">
          <button
            onClick={toggleDrawer}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors duration-300"
            aria-label="Close drawer"
          >
            <X size={24} />
          </button>
          <div className="mt-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MinimalistDrawer;
