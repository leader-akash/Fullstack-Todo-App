// Reusable SelectField Component
export const SelectField = ({ label, value, onChange, options }) => {
    return (
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-medium text-left dark:text-gray-300  mb-2">{label}</label>
        <select
          value={value}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
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
  