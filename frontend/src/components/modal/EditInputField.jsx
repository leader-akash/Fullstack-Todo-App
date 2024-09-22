export const EditInputField = ({ label, type, placeholder, value, onChange, min }) => (
    <div className="mb-4">
        <label className="block text-left text-sm font-medium text-black  mb-1">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            min={min}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
    </div>
);

// Reusable SelectField Component
export const EditSelectField = ({ label, value, onChange, options }) => {
    return (
      <div className="flex flex-col">
        <label className="text-black text-sm font-medium text-left   mb-2">{label}</label>
        <select
          value={value}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {/* Dynamically rendering options */}
          <option value="">Select an option</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Reusable TextAreaField Component
export const EditTextAreaField = ({ label, value, placeholder, onChange }) => {
    return (
      <div className="flex flex-col">
        <label className="text-black text-left text-sm font-medium    mb-2">{label}</label>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>
    );
  };
  
  