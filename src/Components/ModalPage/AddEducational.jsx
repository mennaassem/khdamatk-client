 
import { useFormik } from "formik";
import * as yup from "yup";
import { sendDataToEducation } from "../../Services/api-profile";
 



export default function AddEducational({ closeModal, onAdd }) {
 // Validation Schema
  const validationSchema = yup.object({
    university: yup.string().required("School name is required"),
    specialization: yup.string().required("Field of study is required"),
    degree: yup.string().required("Degree is required"),
    description: yup.string().required("Description is required"),
    from: yup.date().required("Start date is required"),
    to: yup.date().required("End date is required"),
  });
const formik = useFormik({
  initialValues: {
    university: "",       // ← بدل undefined خلي string فاضي
    specialization: "",
    degree: "",
    description: "",
    from: "",
    to: ""
  },
  validationSchema,
  onSubmit: async (values) => {
    try {
      const response = await sendDataToEducation(values);
      onAdd(response); // نبعت البيانات للأب
      closeModal(); // نقفل المودال بعد الإرسال
    } catch (error) {
      console.log(error);
      // ممكن هنا تعملي setErrors لو في errors من الباك
    }
  }
});


 return (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-8  shadow-lg">

      <h2 className="text-2xl font-semibold mb-6">
        Add educational
      </h2>

      {/* <form className="space-y-6">

        <input
          type="text"
          name="university"
          placeholder="university"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
        />

        <input
          type="text"
          name="specialization"
          placeholder="specialization"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
        />

        <input
          type="text"
          name="degree"
          placeholder="degree"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
        />

        <textarea
          name="description"
          placeholder="description"
          rows="4"
          className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
        ></textarea>

        <div className="flex gap-6">

          <div className="flex-1">
            <label className="block mb-2 text-sm">
              From
            </label>

            <input
              type="date"
              name="from"
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-sm">
              To
            </label>

            <input
              type="date"
              name="to"
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

        </div>

        <div className="flex justify-end gap-6 pt-4">

          <button
            type="submit"
            className="text-purple-600 font-medium"
          >
            Save
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="text-gray-600"
          >
            Close
          </button>

        </div>

      </form> */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">

  <input
    type="text"
    name="university"
    placeholder="university"
    value={formik.values.university}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
  />
  {formik.touched.university && formik.errors.university && (
    <div className="text-red-500 text-sm">{formik.errors.university}</div>
  )}

  <input
    type="text"
    name="specialization"
    placeholder="specialization"
    value={formik.values.specialization}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
  />
  {formik.touched.specialization && formik.errors.specialization && (
    <div className="text-red-500 text-sm">{formik.errors.specialization}</div>
  )}

  <input
    type="text"
    name="degree"
    placeholder="degree"
    value={formik.values.degree}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
  />
  {formik.touched.degree && formik.errors.degree && (
    <div className="text-red-500 text-sm">{formik.errors.degree}</div>
  )}

  <textarea
    name="description"
    placeholder="description"
    rows="4"
    value={formik.values.description}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
  />
  {formik.touched.description && formik.errors.description && (
    <div className="text-red-500 text-sm">{formik.errors.description}</div>
  )}

  <div className="flex gap-6">
    <div className="flex-1">
      <label className="block mb-2 text-sm">From</label>
      <input
        type="date"
        name="from"
        value={formik.values.from}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
      />
      {formik.touched.from && formik.errors.from && (
        <div className="text-red-500 text-sm">{formik.errors.from}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block mb-2 text-sm">To</label>
      <input
        type="date"
        name="to"
        value={formik.values.to}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
      />
      {formik.touched.to && formik.errors.to && (
        <div className="text-red-500 text-sm">{formik.errors.to}</div>
      )}
    </div>
  </div>

  <div className="flex justify-end gap-6 pt-4">
    <button type="submit" className="text-purple-600 font-medium">Save</button>
    <button type="button" onClick={closeModal} className="text-gray-600">Close</button>
  </div>

</form>

    </div>

  </div>

)
}