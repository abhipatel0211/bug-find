import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import * as Yup from "yup";
import { IJobDetails } from "../../interface/forms";
import { DataContext } from "./DataProvider";

const initialValues = {
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: initialValues.interviewSettings,
    validationSchema: Yup.object().shape({
      interviewDuration: Yup.string().required("Interviw Duration required"),
      interviewLanguage: Yup.string().required(
        "interview Language is required"
      ),
      interviewMode: Yup.string().required("interview Mode is required"),
      // jobPosition: Yup.string().required("Job position is required"),
    }),
    onSubmit: (values) => {
      alert("Form successfully submitted");
    },
  });
  const data = useContext(DataContext);
  const [newInterViewSettings, setNewInterViewSettings] = useState({
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  });
  useEffect(() => {
    data?.setState((prevState) => ({
      ...prevState,
      interviewSettings: newInterViewSettings,
    }));
  }, [newInterViewSettings]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(e: any) => {
            setFieldValue("interviewMode", e);
            setNewInterViewSettings((prevDetails) => ({
              ...prevDetails,
              interviewMode: e,
            }));
          }}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(e: any) => {
            setFieldValue("interviewDuration", e);
            setNewInterViewSettings((prevDetails) => ({
              ...prevDetails,
              interviewDuration: e,
            }));
          }}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(e: any) => {
            setFieldValue("interviewLanguage", e);
            setNewInterViewSettings((prevDetails) => ({
              ...prevDetails,
              interviewLanguage: e,
            }));
          }}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
