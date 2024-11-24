import React from 'react';

const Input = ({ label, type, name, register, validation, error, className }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        className={`border border-gray-300 p-1 w-full rounded ${className || ""}`}
        type={type}
        name={name}
        {...register(name, validation)} 
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;