export  const Spinner = () => (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  export const DotSpinner = () => (
    <div className="flex space-x-2 justify-center items-center h-24">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  );

  export const LoadingMessage = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-4"></div>
      <p className="text-sm text-gray-400">Loading crew data...</p>
    </div>
  );