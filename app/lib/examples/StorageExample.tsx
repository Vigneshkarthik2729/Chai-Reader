/**
 * Example: Using storage abstraction
 */

"use client";

import { useState } from "react";
import { useStorage } from "@/app/lib/hooks";

export function StorageExample() {
  const { value: savedName, setValue: setSavedName, loading } = useStorage(
    "user-name",
    ""
  );
  const [inputValue, setInputValue] = useState("");

  const handleSave = async () => {
    await setSavedName(inputValue);
    setInputValue("");
  };

  const handleClear = async () => {
    await setSavedName(null);
  };

  if (loading) {
    return <div>Loading storage...</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-4">Storage Example</h3>

      {savedName && (
        <div className="mb-4 p-2 bg-green-100 rounded">
          <p>Saved Name: {savedName}</p>
        </div>
      )}

      <div className="space-y-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a name"
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>

          {savedName && (
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        💡 This data persists on both web (localStorage) and mobile (Capacitor
        Storage)
      </p>
    </div>
  );
}
