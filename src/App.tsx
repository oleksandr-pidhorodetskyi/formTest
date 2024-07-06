import React, { useState } from "react";
import "./index.css";
import SliderInput from "./components/base/SliderInput/SliderInput";
import InputFile from "./components/base/InputFile";
import Input from "./components/base/Input";
import validationConfig from "./validators";
import { FormErrors, FormType } from "./types/App.types";
import CalendarComponent from "./components/base/CustomCalendar";

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormType>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    age: 30,
    photo: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (name: string, value: string | number | File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (
    name: string,
    value: string | number | File | null
  ) => {
    const fieldConfig = validationConfig[name];
    if (!fieldConfig) {
      return;
    }

    let error = {};

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
  };

  return (
    <main className="bg-mainPink min-h-screen w-full">
      <div className="max-w-[30%] py-[10%] mx-auto flex flex-col gap-y-12">
        <section>
          <h3 className="text-darkBlue font-medium text-2xl mb-8">
            Personal info
          </h3>
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
              minValue={8}
              maxValue={100}
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
        </section>
        <section>
          <h3 className="text-darkBlue font-medium text-2xl mb-8">
            Personal info
          </h3>
          <CalendarComponent />
        </section>
      </div>
    </main>
  );
};

export default App;
