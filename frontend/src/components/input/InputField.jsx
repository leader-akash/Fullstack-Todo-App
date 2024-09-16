

export const InputField = ({ label, type, placeholder, value, onChange, min }) => (
    <div className="mb-4">
        <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            min={min}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
    </div>
);