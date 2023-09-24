import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";
import { DataContext } from "./DataProvider";

const initialValues = {
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
};

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik<IJobDetails>({
    initialValues: initialValues.jobDetails,
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
      // jobPosition: Yup.string().required("Job position is required"),
    }),
    onSubmit: (values) => {
      handleTab(2);
    },
  });
  const data = useContext(DataContext);
  const [newjobDetails, setNewjobDetails] = useState({
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  });
  useEffect(() => {
    data?.setState((prevState) => ({
      ...prevState,
      jobDetails: newjobDetails,
    }));
  }, [newjobDetails]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => {
            const value = e.target.value;
            setFieldValue("jobTitle", value); // Update the Formik field value
            setNewjobDetails((prevDetails) => ({
              ...prevDetails,
              jobTitle: value,
            }));
          }}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => {
            const value = e.target.value;
            setFieldValue("jobDetails", value); // Update the Formik field value
            setNewjobDetails((prevDetails) => ({
              ...prevDetails,
              jobDetails: value,
            }));
          }}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => {
            const value = e.target.value;
            setFieldValue("jobLocation", value); // Update the Formik field value
            setNewjobDetails((prevDetails) => ({
              ...prevDetails,
              jobLocation: value,
            }));
          }}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
