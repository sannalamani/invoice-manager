
import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const Selector = ({ label, name, control, validation, options, defaultOption, error, className }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <Select
            {...field}
            className={`border border-gray-300 p-2 w-full rounded ${className || ""}`}
            options={options}
            // defaultValue={defaultOption}
            value={options.find(option => option.value === field.value) || null} 
            onChange={selectedOption => field.onChange(selectedOption.value)} 
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Selector;