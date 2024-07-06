import React, { useState } from "react";
import "./index.css";
import SliderInput from "./components/base/SliderInput/SliderInput";
import InputFile from "./components/base/InputFile";
import Input from "./components/base/Input";
import validationConfig from "./validators";
import { ErrorType, FormErrors, FormType } from "./types/App.types";
import CalendarComponent from "./components/base/CustomCalendar/CustomCalendar";
import CustomButton from "./components/base/CustomButton";
import { MAX_AGE, MIN_AGE } from "./constants";
import { LetsworkoutApi } from "./api/letsWorkout.api";

const initialFormData: FormType = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  age: MIN_AGE,
  photo: null,
  date: null,
  timeSlot: "",
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormType>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    name: string,
    value: string | number | File | Date | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (
    name: string,
    value: string | number | File | Date | null
  ) => {
    const fieldConfig = validationConfig[name];
    if (!fieldConfig) {
      return;
    }

    let error: ErrorType | undefined = undefined;

    if (fieldConfig.required && !String(value)) {
      error = { message: `${fieldConfig.name} is required.` };
    } else if (
      fieldConfig.pattern &&
      !fieldConfig.pattern.test(String(value))
    ) {
      error = {
        message: fieldConfig.errorMessage,
        example: fieldConfig.example,
      };
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    return error;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((name) => {
      const fieldName = name as keyof FormType;
      const errorField = validateField(fieldName, formData[fieldName]);
      if (errorField) {
        newErrors[fieldName] = errorField;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validatedFormErrors = validateForm();

    if (Object.keys(validatedFormErrors).length === 0) {
      try {
        await LetsworkoutApi.submitForm(formData);
        console.log("Form Data Submitted:", formData);
      } catch (error) {
        console.log(error);
      }
    }
    setFormData(initialFormData);
  };
  return (
    <main className="bg-mainPink min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-[90%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[30%] py-[10%] mx-auto flex flex-col gap-y-12">
        <fieldset>
          <legend className="text-darkBlue font-medium text-2xl mb-8">
            Personal info
          </legend>
          <div className="flex flex-col gap-y-6">
            <Input
              value={formData.firstName}
              setValue={handleChange}
              name="firstName"
              errorMessage={errors.firstName}
              label={"First name"}
            />
            <Input
              value={formData.lastName}
              setValue={handleChange}
              name="lastName"
              errorMessage={errors.lastName}
              label={"Last name"}
            />
            <Input
              value={formData.emailAddress}
              setValue={handleChange}
              name="emailAddress"
              errorMessage={errors.emailAddress}
              label={"Email Address"}
            />
            <SliderInput
              value={formData.age}
              setValue={handleChange}
              minValue={MIN_AGE}
              maxValue={MAX_AGE}
              label="Age"
              name="age"
            />
            <InputFile
              value={formData.photo}
              setValue={handleChange}
              label="Photo"
              name="photo"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-darkBlue font-medium text-2xl mb-8">
            Personal info
          </legend>
          <CalendarComponent
            timeSlot={formData.timeSlot}
            setTimeSlot={handleChange}
            selectedDate={formData.date}
            setSelectedDate={handleChange}
          />
        </fieldset>
        <CustomButton disabled={Object.keys(errors).length === 0} type="submit">
          Send Application
        </CustomButton>
      </form>
    </main>
  );
};

export default App;
