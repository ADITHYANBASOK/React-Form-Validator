import { useState } from 'react';
import FormikForm from './components/FormikForm';
import ReactHookForm from './components/ReactHookForm';
import ComparisonTable from './components/ComparisonTable';

function App() {
  const [formikSubmissions, setFormikSubmissions] = useState(0);
  const [rhfSubmissions, setRhfSubmissions] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Form Validation Comparison
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Formik + Yup</h2>
            <FormikForm 
              onSuccessfulSubmit={() => setFormikSubmissions(prev => prev + 1)}
            />
            <div className="mt-4 text-sm text-gray-600">
              Submissions: {formikSubmissions}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">React Hook Form</h2>
            <ReactHookForm 
              onSuccessfulSubmit={() => setRhfSubmissions(prev => prev + 1)}
            />
            <div className="mt-4 text-sm text-gray-600">
              Submissions: {rhfSubmissions}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ComparisonTable />
        </div>
      </div>
    </div>
  );
}

export default App;