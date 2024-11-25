function ComparisonTable() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feature
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Formik + Yup
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              React Hook Form
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Bundle Size
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ~22.5kB (Formik) + ~44kB (Yup)
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ~8.6kB
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Re-renders
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              On every field change
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Only affected fields
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Setup Complexity
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              More boilerplate, familiar API
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Less code, hook-based API
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Validation
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Schema-based, flexible
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Built-in + schema support
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;