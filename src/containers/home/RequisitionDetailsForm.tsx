import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { DataContext } from "./DataProvider";

const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
};

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: initialValues.requisitionDetails,
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleTab(1);
    },
  });
  // const [initialValues, setInitialValues] = useState(initialValues);

  console.log(DataContext);
  const data = useContext(DataContext);
  console.log(data?.state);
  // const handleUpdateRequisitionDetails = (e :any,x:number) => {
  //   const newRequisitionDetails = {
  //     gender: "",
  //     noOfOpenings: 0,
  //     requisitionTitle: "New Title",
  //     urgency: "0",
  // };
  // const [selectedValue, setSelectedValue] = useState("");

  // const handleSelectChange = (value: any) => {
  //   setSelectedValue(value);
  //   data?.setState((prevState) => ({
  //     ...prevState,
  //     requisitionDetails: newRequisitionDetails,
  //   }));
  // };
  const [newRequisitionDetails, setNewRequisitionDetails] = useState({
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  });
  useEffect(() => {
    data?.setState((prevState) => ({
      ...prevState,
      requisitionDetails: newRequisitionDetails,
    }));
    console.log("hello", data?.state);
  }, [newRequisitionDetails]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => {
            const value = e.target.value;
            setFieldValue("requisitionTitle", value); // Update the Formik field value
            setNewRequisitionDetails((prevDetails) => ({
              ...prevDetails,
              requisitionTitle: value,
            }));
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />

        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value === "") {
              // Handle empty input (you can set it to 0 or any other default value)
              const newValue = 0;
              setFieldValue("noOfOpenings", newValue); // Update the Formik field value
              setNewRequisitionDetails((prevDetails) => ({
                ...prevDetails,
                noOfOpenings: newValue,
              }));
            } else {
              // Parse the input value as an integer
              const parsedValue = parseInt(value, 10);
              if (!isNaN(parsedValue)) {
                // Ensure the parsed value is not NaN
                const newValue = Math.max(1, parsedValue); // Ensure the value is at least 1
                setFieldValue("noOfOpenings", newValue); // Update the Formik field value
                setNewRequisitionDetails((prevDetails) => ({
                  ...prevDetails,
                  noOfOpenings: newValue,
                }));
              }
            }
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />

        {/* <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10); // Parse the input value as an integer
            setFieldValue("noOfOpenings", value); // Update the Formik field value
            setNewRequisitionDetails((prevDetails) => ({
              ...prevDetails,
              noOfOpenings: value,
            }));
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        /> */}

        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(e: any) => {
            setFieldValue("gender", e); // Update the Formik field value
            setNewRequisitionDetails((prevDetails) => ({
              ...prevDetails,
              gender: e,
            }));
          }}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />

        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(selectedValue: string) => {
            setFieldValue("urgency", selectedValue);
            setNewRequisitionDetails((prevDetails) => ({
              ...prevDetails,
              urgency: selectedValue,
            }));
          }}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />

        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
