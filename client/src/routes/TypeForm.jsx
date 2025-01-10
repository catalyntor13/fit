import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import { FormularForm } from "../services/FormularForm";
import { useParams } from "react-router-dom";


export function TypeForm() {
  const [step, setStep] = useState(1);
  const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
  const { antrenor } = useParams();



  const nextStep = async () => {
    // Validate current step before moving to the next step
    const valid = await trigger(step === 1 ? "nume" : step === 2 ? "varsta" : "gen");
    if (valid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const { mutate } = useMutation({
    mutationFn: FormularForm,
    onSettled: reset,
     onSuccess: () => {
       alert('Formularul a fost trimis cu success');
     }
 });

 function onSubmit(data) {
  // Append antrenor to the form data
  const formDataWithCoachId = { ...data, antrenor };
  mutate(formDataWithCoachId);
}

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <div>
        {step === 1 && (
          <div className="transition-all duration-700 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Nume</h2>
            <input
              type="text"
              id="nume"
              placeholder="Introdu numele complet"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("nume", {
                required: 'Numele trebuie completat',
                validate: (value) => value.trim() !== "" || 'Numele nu poate fi gol'
              })}
            />
            <button
              type="button"
              onClick={nextStep}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Continuă
            </button>
            {errors.nume && (
              <p className="mt-2 text-sm text-red-600">{errors.nume.message}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="transition-all duration-500 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Care este vârsta ta?</h2>
            <input
              type="text"
              id="varsta"
              placeholder="Introdu vârsta"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("varsta", {
                required: 'Varsta trebuie completata',
                validate: (value) => value.trim() !== "" || 'Acest camp nu poate fi gol'
              })}
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Înapoi
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Continuă
              </button>
            </div>
            {errors.varsta && (
              <p className="mt-2 text-sm text-red-600">{errors.varsta.message}</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="transition-all duration-500 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Gen</h2>
            <input
              type="text"
              id="gen"
              placeholder="Introdu genul"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("gen", {
                required: 'Genul trebuie completat',
                 validate: (value) => value.trim() !== "" || 'Acest camp nu poate fi gol'
              })}
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Înapoi
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Trimite
              </button>
            </div>
            {errors.gen && (
              <p className="mt-2 text-sm text-red-600">{errors.gen.message}</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
