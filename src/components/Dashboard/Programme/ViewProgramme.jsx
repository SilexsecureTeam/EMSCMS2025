import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageManagement from "../../../hooks/management";

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2 text-[#2C473A]">{title}</h2>
    <div className="bg-green-50 rounded-lg p-4 text-gray-800">{children}</div>
  </div>
);

const ViewProgramme = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getPrograms } = PageManagement();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      setLoading(true);
      try {
        const programs = await getPrograms();
        const found = programs.find((p) => String(p.slug) === String(slug));
        setProgram(found || null);
      } catch (err) {
        setProgram(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
    // eslint-disable-next-line
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-red-600 font-semibold">Programme not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2 bg-[#2C473A] text-white rounded hover:bg-[#1e3226] shadow"
      >
        ← Back to Programmes
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {program.image && (
            <img
              src={typeof program.image === "string" ? program.image : ""}
              alt={program.title}
              className="w-full md:w-80 h-56 object-cover rounded-xl border"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-[#2C473A]">{program.title}</h1>
            <div className="text-lg text-gray-600 mb-4">{program.description}</div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="bg-green-100 px-3 py-1 rounded">ID: {program.id}</span>
              <span className="bg-green-100 px-3 py-1 rounded">Slug: {program.slug}</span>
              <span className="bg-green-100 px-3 py-1 rounded">Fee: {program.course_fee}</span>
            </div>
          </div>
        </div>

        <Section title="About This Programme">
          <div>{program.content}</div>
        </Section>

        <div className="grid md:grid-cols-2 gap-8">
          <Section title="Target Audience">
            <div>{program.target_audience}</div>
          </Section>
          <Section title="Entry Requirement">
            <div>{program.entry_requirement}</div>
          </Section>
        </div>

        <Section title="Learning Outcomes">
          <ul className="list-disc pl-6 space-y-1">
            {Array.isArray(program.learning_outcomes)
              ? program.learning_outcomes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              : program.learning_outcomes &&
                Object.values(program.learning_outcomes).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
          </ul>
        </Section>

        <Section title="Curriculum">
          <ol className="list-decimal pl-6 space-y-1">
            {Array.isArray(program.curriculum)
              ? program.curriculum.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              : program.curriculum &&
                Object.values(program.curriculum).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
          </ol>
        </Section>

        <Section title="Course Content">
          <div>{program.course_content}</div>
        </Section>

        <Section title="Learning Experience">
          <div>{program.learning_experience}</div>
        </Section>
      </div>
    </div>
  );
};

export default ViewProgramme;