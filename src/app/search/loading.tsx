const Loading = () => {
  return (
    <ul className="divide-y divide-gray-200 bg-white shadow-md rounded-b-md py-4">
      {new Array(3).fill(null).map((_, i) => (
        <li
          key={i}
          className="flex space-x-4 mx-auto w-full animate-pulse px-8 py-4"
        >
          <div className="rounded-lg bg-gray-300 h-40 w-40" />

          <div className="flex-1 w-full space-y-4 py-1">
            <div className="w-full bg-gray-300 rounded h-10" />

            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-4/5" />
              <div className="h-4 bg-gray-300 rounded w-4/5" />
              <div className="h-4 bg-gray-300 rounded w-4/5" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Loading;
