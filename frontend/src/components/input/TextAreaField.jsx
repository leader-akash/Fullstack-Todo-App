// Reusable TextAreaField Component
export const TextAreaField = ({ label, value, placeholder, onChange }) => {
    return (
      <div className="flex flex-col">
        <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">{label}</label>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 resize-y"
        />
      </div>
    );
  };
  