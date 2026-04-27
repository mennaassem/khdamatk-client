 
import { useFormik } from "formik";
import * as yup from "yup";
import { sendDataToEducation } from "../../Services/api-profile";

export default function AddEducational({ closeModal, onAdd }) {

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
      university: "",
      specialization: "",
      degree: "",
      description: "",
      from: "",
      to: ""
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        console.log("FORM VALUES:", values);

        const payload = {
          schoolName: values.university,
          fieldOfStudy: values.specialization,
          degree: values.degree,
          description: values.description,
          startDate: values.from,
          endDate: values.to
        };

        console.log("DATA SENT:", payload);

const res = await sendDataToEducation(payload);

// امسحي كل اللي عندك وخلي الجديد فقط
onAdd([res.data || payload]);

closeModal();

      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-lg">

        <h2 className="text-2xl font-semibold mb-6">
          Add educational
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          <input
            type="text"
            name="university"
            placeholder="university"
            value={formik.values.university}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-b py-2"
          />

          <input
            type="text"
            name="specialization"
            placeholder="specialization"
            value={formik.values.specialization}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-b py-2"
          />

          <input
            type="text"
            name="degree"
            placeholder="degree"
            value={formik.values.degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-b py-2"
          />

          <textarea
            name="description"
            placeholder="description"
            rows="4"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-gray-200 p-3"
          />

          <div className="flex gap-6">

            <input
              type="date"
              name="from"
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border-b py-2"
            />

            <input
              type="date"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border-b py-2"
            />

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button type="submit" className="text-purple-600 font-bold">
              Save
            </button>

            <button type="button" onClick={closeModal} className="text-gray-600">
              Close
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}