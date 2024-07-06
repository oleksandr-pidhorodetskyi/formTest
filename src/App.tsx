import React from "react";
import "./index.css";
import SliderInput from "./components/base/SliderInput/SliderInput";
import InputFile from "./components/base/InputFile";
import Input from "./components/base/Input";

const App: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [sliderInput, setSliderInput] = React.useState(30);
  const [file, setFile] = React.useState<File | null>(null);
  return (
    <main className="bg-mainPink min-h-screen w-full">
      <div className="max-w-[30%] py-[10%] mx-auto flex flex-col gap-y-12">
        <section>
          <h3 className="text-darkBlue font-medium text-2xl mb-8">
            Personal info
          </h3>
          <div className="flex flex-col gap-y-6">
            <Input
              value={input}
              setValue={setInput}
              name="firstName"
              // errorMessage={"error"}
              label={"First name"}
            />
            <Input
              value={input}
              setValue={setInput}
              name="lastName"
              // errorMessage={"error"}
              label={"Last name"}
            />
            <Input
              value={input}
              setValue={setInput}
              name="emailAddress"
              // errorMessage={"error"}
              label={"Email Address"}
            />
            <SliderInput
              value={sliderInput}
              setValue={setSliderInput}
              minValue={8}
              maxValue={100}
              label="Age"
              name="age"
            />
            <InputFile
              value={file}
              setValue={setFile}
              label="Photo"
              name="photo"
            />
          </div>
        </section>
        <section>
          <h3 className="text-darkBlue font-medium text-2xl">Personal info</h3>
        </section>
      </div>
    </main>
  );
};

export default App;
