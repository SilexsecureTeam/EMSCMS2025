import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PageManagement from '../hooks/management';
import { toast } from 'react-hot-toast';
import enroll from '../assets/enroll.png';

const EmsForm = () => {
  const [loading, setLoading] = useState(false);
  const { downloadEnrollPdf } = PageManagement();
  
  // Placeholder for enrolData (assuming single item with id, or null if not available)
  // Replace '1' with the actual ID if known, or pass via props/context
  const enrolData = [{ id: 1, pdf_file: 'enrollment/form.pdf' }]; // Static for demo; update as needed

  const handleDownloadPdf = async (id) => {
    if (!id) {
      toast.error('No PDF available for download');
      return;
    }
    try {
      setLoading(true);
      await toast.promise(downloadEnrollPdf(id), {
        pending: 'Downloading...',
        success: 'PDF downloaded',
        error: (error) => error.response?.data?.message || 'Failed to download PDF',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to download PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Image */}
      <img src={enroll} alt="Enroll" className="w-full h-auto mb-4" />

      {/* Instructions */}
      <div className="my-10 lg:px-15 md:px-10 px-5">
        <h2 className="text-lg font-bold poppins mb-2">Instruction:</h2>
        <ol className="list-decimal poppins list-inside">
          <li className="poppins font-medium">
            When completing this form, kindly use BLOCK LETTERS.
          </li>
          <li className="poppins font-medium">
            Completed forms should be submitted to
            <a
              href="mailto:admissions@etiquettemanagementschool.com?subject=Enrollment Form Submission"
              className="text-blue-600 underline hover:text-blue-800 ml-1"
            >
              admissions@etiquettemanagementschool.com
            </a>
          </li>
          <li className="poppins font-medium">
            Attach a photocopy of the employee's means of identification to this form.
          </li>
          <li className="poppins font-medium">
            Employers are expected to participate in a scheduled consultation session to provide detailed insights into their staffing needs and specific requirements.
          </li>
          <li className="poppins font-medium">
            Employers must ensure that nominated staff members are available for interviews and assessments as part of the admissions process.
          </li>
          <li className="poppins font-medium">
            Attach proof of processing fee payment to this form.
          </li>
          <li className="poppins font-medium">
            For further inquiries, please contact
            <a
              href="tel:+2347048406083"
              className="text-blue-600 underline hover:text-blue-800 ml-1"
            >
              +234 704 840 6083
            </a>.
          </li>
        </ol>
      </div>

      {/* Download Form Section */}
      <div className="relative mt-7 mb-14 lg:px-15 md:px-10 px-5">
        <h2 className="text-xl font-semibold poppins mb-2">Download Form</h2>
        <div className="border-2 max-w-80 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors group">
          {enrolData.length > 0 && enrolData[0].pdf_file ? (
            <button
              onClick={() => handleDownloadPdf(enrolData[0].id)}
              className="block w-full h-full"
              disabled={loading}
            >
              <Download className="mx-auto h-12 w-12 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
              <p className="text-sm text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">
                Download Form
              </p>
              <p className="text-xs text-gray-500">PDF format</p>
            </button>
          ) : (
            <a href="/form.pdf" download className="block w-full h-full">
              <Download className="mx-auto h-12 w-12 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
              <p className="text-sm text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">
                Download Form
              </p>
              <p className="text-xs text-gray-500">PDF format</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmsForm;