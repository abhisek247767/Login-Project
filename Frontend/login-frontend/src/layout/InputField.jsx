import React from "react";

export default function InputField({ label, type, value, onChange,name }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}  
        value={value}  
        onChange={onChange}  
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
    </div>
  );
}