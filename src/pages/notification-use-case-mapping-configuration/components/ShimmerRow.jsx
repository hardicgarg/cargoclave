import React from 'react';

const ShimmerRow = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-11"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );
};

export default ShimmerRow;