// // src/components/FormComponent.tsx
// import { ChangeEvent, FormEvent, useState } from 'react';
// import { useFormValidator, ValidationFn } from '../hooks/useFormValidator';

// interface FormField {
//   name: string;
//   label: string;
//   type: string;
//   rules: ValidationFn[];
// }

// interface FormComponentProps {
//   formId: string;
//   fields: FormField[];
//   onSubmit: (values: { [key: string]: string }) => void;
// }

// const FormComponent: React.FC<FormComponentProps> = ({ formId, fields, onSubmit }) => {
//   const initialValues = fields.reduce((acc, field) => ({
//     ...acc,
//     [field.name]: '',
//   }), {} as { [key: string]: string });

//   const [values, setValues] = useState(initialValues);
//   const { errors, validateField, validateForm } = useFormValidator();

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//     validateField(name, value, fields.find((field) => field.name === name)?.rules || []);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formFields = fields.reduce((acc, field) => ({
//       ...acc,
//       [field.name]: { value: values[field.name] || '', rules: field.rules },
//     }), {});
//     if (validateForm(formFields)) {
//       onSubmit(values);
//     }
//   };

//   return (
//     <form id={formId} onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       {fields.map((field) => (
//         <div key={field.name} className="mb-4">
//           <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//             {field.label}
//           </label>
//           <input
//             type={field.type}
//             id={field.name}
//             name={field.name}
//             value={values[field.name] || ''}
//             onChange={handleChange}
//             className={`mt-1 block w-full border rounded-md p-2 ${
//               errors[field.name] ? 'border-red-500' : 'border-gray-300'
//             }`}
//           />
//           {errors[field.name] && (
//             <span className="text-red-500 text-sm mt-1" aria-live="polite">
//               {errors[field.name]}
//             </span>
//           )}
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default FormComponent;