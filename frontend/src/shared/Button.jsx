export default function Button({ children, ...props }) {
    return (
      <button
        className="px-4 py-2 text-white transition-colors duration-200 bg-purple-600 rounded-md hover:bg-purple-700"
        {...props}
      >
        {children}
      </button>
    )
  }  