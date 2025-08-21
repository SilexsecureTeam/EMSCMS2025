// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { toast } from "react-hot-toast";
// import PageManagement from "../hooks/management";

// const schema = yup.object().shape({
//   title: yup.string().required("Title is required"),
//   image: yup
//      .mixed()
//      .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
//        if (!value || !value[0]) return true;
//        return value[0].size <= 2_000_000; 
//      }),
//   content: yup.string().required("Content is required"),
//   description: yup.string().required("Description is required"),
//   learning_outcomes: yup
//     .array()
//     .of(yup.string().required("Learning outcome is required"))
//     .min(1, "At least one learning outcome is required"),
//   course_fee: yup.string().required("Course fee is required"),
//   target_audience: yup.string().required("Target audience is required"),
//   entry_requirement: yup.string().required("Entry requirement is required"),
//   curriculum: yup
//     .array()
//     .of(yup.string().required("Curriculum item is required"))
//     .min(1, "At least one curriculum item is required"),
//   course_content: yup.string().required("Course content is required"),
//   learning_experience: yup.string().required("Learning experience is required"),
// });

// const AddProgramPage = () => {
//   const { CreateProgramme } = PageManagement();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     control,
//     watch,
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       title: "",
//       image: null,
//       content: "",
//       description: "",
//       learning_outcomes: [""],
//       course_fee: "",
//       target_audience: "",
//       entry_requirement: "",
//       curriculum: [""],
//       course_content: "",
//       learning_experience: "",
//     },
//   });

//   const {
//     fields: curriculumFields,
//     append: appendCurriculum,
//     remove: removeCurriculum,
//   } = useFieldArray({
//     control,
//     name: "curriculum",
//   });

//   const {
//     fields: learningOutcomeFields,
//     append: appendLearningOutcome,
//     remove: removeLearningOutcome,
//   } = useFieldArray({
//     control,
//     name: "learning_outcomes",
//   });

//   const arrayToNumberedObject = (arr) =>
//     arr.reduce((acc, item, idx) => {
//       if (item && item.trim() !== "") acc[(idx + 1).toString()] = item;
//       return acc;
//     }, {});

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("content", data.content);
//     formData.append("description", data.description);
//     formData.append("course_fee", data.course_fee);
//     formData.append("target_audience", data.target_audience);
//     formData.append("entry_requirement", data.entry_requirement);
//     formData.append("course_content", data.course_content);
//     formData.append("learning_experience", data.learning_experience);

//     data.learning_outcomes.forEach((item) => {
//       if (item && item.trim() !== "") formData.append("learning_outcomes[]", item);
//     });

//     data.curriculum.forEach((item) => {
//       if (item && item.trim() !== "") formData.append("curriculum[]", item);
//     });

//     const imageFile = data.image && data.image[0];
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     toast.promise(
//       CreateProgramme(formData),
//       {
//         loading: "Adding program...",
//         success: (data) => data,
//         error: (err) => err,
//       }
//     );
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-10 px-4">
//       <h1 className="text-2xl font-bold mb-6">Add Program</h1>
//       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//         <div>
//           <input {...register("title")} placeholder="Title" className="w-full px-3 py-2 border rounded" />
//           {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
//         </div>
//         <div>
//           <input
//             type="file"
//             accept="image/*"
//             {...register("image")}
//             className="w-full px-3 py-2 border rounded"
//           />
//           {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
//         </div>
//         <div>
//           <textarea {...register("content")} placeholder="Content" className="w-full px-3 py-2 border rounded" />
//           {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
//         </div>
//         <div>
//           <textarea {...register("description")} placeholder="Description" className="w-full px-3 py-2 border rounded" />
//           {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
//         </div>
//         {/* Learning Outcomes Array */}
//         <div>
//           <label className="block font-medium mb-1">Learning Outcomes</label>
//           {learningOutcomeFields.map((field, idx) => (
//             <div key={field.id} className="flex gap-2 mb-2">
//               <input
//                 {...register(`learning_outcomes.${idx}`)}
//                 placeholder={`Learning outcome ${idx + 1}`}
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeLearningOutcome(idx)}
//                 className="px-2 py-1 bg-red-500 text-white rounded"
//                 disabled={learningOutcomeFields.length === 1}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => appendLearningOutcome("")}
//             className="px-3 py-1 bg-green-600 text-white rounded"
//           >
//             Add Learning Outcome
//           </button>
//           {errors.learning_outcomes && <p className="text-red-500 text-xs">{errors.learning_outcomes.message}</p>}
//         </div>
//         <div>
//           <input {...register("course_fee")} placeholder="Course Fee" className="w-full px-3 py-2 border rounded" />
//           {errors.course_fee && <p className="text-red-500 text-xs">{errors.course_fee.message}</p>}
//         </div>
//         <div>
//           <textarea {...register("target_audience")} placeholder="Target Audience" className="w-full px-3 py-2 border rounded" />
//           {errors.target_audience && <p className="text-red-500 text-xs">{errors.target_audience.message}</p>}
//         </div>
//         <div>
//           <textarea {...register("entry_requirement")} placeholder="Entry Requirement" className="w-full px-3 py-2 border rounded" />
//           {errors.entry_requirement && <p className="text-red-500 text-xs">{errors.entry_requirement.message}</p>}
//         </div>
//         {/* Curriculum Array */}
//         <div>
//           <label className="block font-medium mb-1">Curriculum</label>
//           {curriculumFields.map((field, idx) => (
//             <div key={field.id} className="flex gap-2 mb-2">
//               <input
//                 {...register(`curriculum.${idx}`)}
//                 placeholder={`Curriculum item ${idx + 1}`}
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeCurriculum(idx)}
//                 className="px-2 py-1 bg-red-500 text-white rounded"
//                 disabled={curriculumFields.length === 1}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => appendCurriculum("")}
//             className="px-3 py-1 bg-green-600 text-white rounded"
//           >
//             Add Curriculum Item
//           </button>
//           {errors.curriculum && <p className="text-red-500 text-xs">{errors.curriculum.message}</p>}
//         </div>
//         <div>
//           <textarea {...register("course_content")} placeholder="Course Content" className="w-full px-3 py-2 border rounded" />
//           {errors.course_content && <p className="text-red-500 text-xs">{errors.course_content.message}</p>}
//         </div>
//         <div>
//           <textarea {...register("learning_experience")} placeholder="Learning Experience" className="w-full px-3 py-2 border rounded" />
//           {errors.learning_experience && <p className="text-red-500 text-xs">{errors.learning_experience.message}</p>}
//         </div>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-[#2C473A] text-white py-2 rounded font-semibold hover:bg-[#1e3226]"
//         >
//           {isSubmitting ? "Adding..." : "Add Program"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProgramPage;



import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import PageManagement from "../hooks/management";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  image: yup
    .mixed()
    .test("fileSize", "Image must be less than or equal to 2MB", (value) => {
      if (!value || !value[0]) return true;
      return value[0].size <= 2_000_000;
    }), content: yup
      .array()
      .of(yup.string().required("Content item is required"))
      .min(1, "At least one content item is required"),
  description: yup.string().required("Description is required"),
  learning_outcomes: yup
    .array()
    .of(yup.string().required("Learning outcome is required"))
    .min(1, "At least one learning outcome is required"),
  course_fee: yup.string().required("Course fee is required"),
  target_audience: yup.string().required("Target audience is required"),
  entry_requirement: yup
    .array()
    .of(yup.string().required("Entry requirement is required"))
    .min(1, "At least one entry requirement is required"),
  curriculum: yup
    .array()
    .of(yup.string().required("Curriculum item is required"))
    .min(1, "At least one curriculum item is required"),
  course_content: yup
    .array()
    .of(yup.string().required("Course content item is required"))
    .min(1, "At least one course content item is required"),
  learning_experience: yup
    .array()
    .of(yup.string().required("Learning experience is required"))
    .min(1, "At least one learning experience is required"),
});

const AddProgramPage = () => {
  const { CreateProgramme } = PageManagement();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      image: null,
      content: [""],
      description: "",
      learning_outcomes: [""],
      course_fee: "",
      target_audience: "",
      entry_requirement: [""],
      curriculum: [""],
      course_content: [""],
      learning_experience: [""],
    },
  });

  // Field arrays
  const { fields: curriculumFields, append: appendCurriculum, remove: removeCurriculum } = useFieldArray({ control, name: "curriculum" });
  const { fields: learningOutcomeFields, append: appendLearningOutcome, remove: removeLearningOutcome } = useFieldArray({ control, name: "learning_outcomes" });
  const { fields: entryRequirementFields, append: appendEntryRequirement, remove: removeEntryRequirement } = useFieldArray({ control, name: "entry_requirement" });
  const { fields: courseContentFields, append: appendCourseContent, remove: removeCourseContent } = useFieldArray({ control, name: "course_content" });
  const { fields: learningExperienceFields, append: appendLearningExperience, remove: removeLearningExperience } = useFieldArray({ control, name: "learning_experience" });
  const { fields: contentFields, append: appendContent, remove: removeContent } = useFieldArray({ control, name: "content" });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("course_fee", data.course_fee);
    formData.append("target_audience", data.target_audience);

    // Handle arrays
    data.learning_outcomes.forEach((item) => item && formData.append("learning_outcomes[]", item));
    data.curriculum.forEach((item) => item && formData.append("curriculum[]", item));
    data.entry_requirement.forEach((item) => item && formData.append("entry_requirement[]", item));
    data.course_content.forEach((item) => item && formData.append("course_content[]", item));
    data.learning_experience.forEach((item) => item && formData.append("learning_experience[]", item));
    data.content.forEach((item) => item && formData.append("content[]", item));

    const imageFile = data.image && data.image[0];
    if (imageFile) formData.append("image", imageFile);

    toast.promise(CreateProgramme(formData), {
      loading: "Adding program...",
      success: (data) => data,
      error: (err) => err,
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Add Program</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Title */}
        <div>
          <input {...register("title")} placeholder="Title" className="w-full px-3 py-2 border rounded" />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>
        {/* Image */}
        <div>
          <input type="file" accept="image/*" {...register("image")} className="w-full px-3 py-2 border rounded" />
          {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
        </div>
        {/* Description */}
        <div>
          <textarea {...register("description")} placeholder="Description" className="w-full px-3 py-2 border rounded" />
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        {/* === Dynamic Arrays === */}
        {/* Content */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          {contentFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`content.${idx}`)} placeholder={`Content item ${idx + 1}`} className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeContent(idx)} className="px-2 py-1 bg-red-500 text-white rounded" disabled={contentFields.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendContent("")} className="px-3 py-1 bg-green-600 text-white rounded">+ Add Content</button>
          {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
        </div>

        {/* Learning Outcomes */}
        <div>
          <label className="block font-medium mb-1">Learning Outcomes</label>
          {learningOutcomeFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`learning_outcomes.${idx}`)} placeholder={`Learning outcome ${idx + 1}`} className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeLearningOutcome(idx)} className="px-2 py-1 bg-red-500 text-white rounded" disabled={learningOutcomeFields.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendLearningOutcome("")} className="px-3 py-1 bg-green-600 text-white rounded">+ Add Learning Outcome</button>
          {errors.learning_outcomes && <p className="text-red-500 text-xs">{errors.learning_outcomes.message}</p>}
        </div>

        {/* Entry Requirements */}
        <div>
          <label className="block font-medium mb-1">Entry Requirements</label>
          {entryRequirementFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`entry_requirement.${idx}`)} placeholder={`Entry requirement ${idx + 1}`} className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeEntryRequirement(idx)} className="px-2 py-1 bg-red-500 text-white rounded" disabled={entryRequirementFields.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendEntryRequirement("")} className="px-3 py-1 bg-green-600 text-white rounded">+ Add Entry Requirement</button>
          {errors.entry_requirement && <p className="text-red-500 text-xs">{errors.entry_requirement.message}</p>}
        </div>

        {/* Curriculum */}
        <div>
          <label className="block font-medium mb-1">Curriculum</label>
          {curriculumFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`curriculum.${idx}`)} placeholder={`Curriculum item ${idx + 1}`} className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeCurriculum(idx)} className="px-2 py-1 bg-red-500 text-white rounded" disabled={curriculumFields.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendCurriculum("")} className="px-3 py-1 bg-green-600 text-white rounded">+ Add Curriculum Item</button>
          {errors.curriculum && <p className="text-red-500 text-xs">{errors.curriculum.message}</p>}
        </div>

        {/* Course Content */}
        <div>
          <label className="block font-medium mb-1">Course Content</label>
          {courseContentFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`course_content.${idx}`)} placeholder={`Course content ${idx + 1}`} className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeCourseContent(idx)} className="px-2 py-1 bg-red-500 text-white rounded" disabled={courseContentFields.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendCourseContent("")} className="px-3 py-1 bg-green-600 text-white rounded">+ Add Course Content</button>
          {errors.course_content && <p className="text-red-500 text-xs">{errors.course_content.message}</p>}
        </div>

        {/* Learning Experience */}
        <div>
          <label className="block font-medium mb-1">Learning Experience</label>
          {learningExperienceFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input {...register(`learning_experience.${idx}`)} placeholder={`Learning experience ${idx + 1}`} className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeLearningExperience(idx)} className="px-2 py-1 bg-red-500 text-white rounded" disabled={learningExperienceFields.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendLearningExperience("")} className="px-3 py-1 bg-green-600 text-white rounded">+ Add Learning Experience</button>
          {errors.learning_experience && <p className="text-red-500 text-xs">{errors.learning_experience.message}</p>}
        </div>

        {/* Course Fee */}
        <div>
          <input {...register("course_fee")} placeholder="Course Fee" className="w-full px-3 py-2 border rounded" />
          {errors.course_fee && <p className="text-red-500 text-xs">{errors.course_fee.message}</p>}
        </div>
        {/* Target Audience */}
        <div>
          <textarea {...register("target_audience")} placeholder="Target Audience" className="w-full px-3 py-2 border rounded" />
          {errors.target_audience && <p className="text-red-500 text-xs">{errors.target_audience.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#2C473A] text-white py-2 rounded font-semibold hover:bg-[#1e3226]">
          {isSubmitting ? "Adding..." : "Add Program"}
        </button>
      </form>
    </div>
  );
};

export default AddProgramPage;
