import { Upload, X, Download } from "lucide-react";
import enroll from "../assets/program.jpg";

const Hire = () => {
  return (
    <div>
      {/* Hero Image */}
      <img
        src={enroll}
        alt="Enroll"
        className="w-full h-[70vh] object-cover mb-4"
      />

      {/* Instructions Section */}
      {/* <div className="lg:px-15 md:px-10 px-5 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Application Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm leading-relaxed">
          <li>
            Please complete this form using <strong>BLOCK LETTERS</strong>.
          </li>
          <li>
            Submit the completed form to:{" "}
            <a
              href="mailto:admissions@etiquettemangementschool.com"
              className="text-indigo-600 underline"
            >
              admissions@etiquettemangementschool.com
            </a>
          </li>
          <li>
            Attach a clear photocopy of the employee’s valid means of
            identification.
          </li>
          <li>
            Include proof of payment for the processing fee with your
            submission.
          </li>
          <li>
            For inquiries, please call:{" "}
            <a href="tel:+2347048406083" className="text-indigo-600 underline">
              +234 704 840 6083
            </a>
          </li>
        </ol>
      </div> */}
    </div>
  );
};

export default Hire;
