import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/date-picker.css";
export function CreateAccession() {
  const toast = useToast();
  function validateTitle(value) {
    if (!value) {
      return "Title is required";
    }
    return "";
  }
  function validateSubject(value) {
    if (!value) {
      return "Subject is required";
    }
    return "";
  }
  function validateDescription(value) {
    if (!value) {
      return "Description is required";
    }
    return "";
  }

  function validateURL(value) {
    if (!value) {
      return "URL is required";
    }
    try {
      new URL(value);
    } catch (_) {
      return "Invalid URL";
    }
    return "";
  }
  function validateDate(value) {
    if (!value) {
      return "Date is required";
    }
    try {
      new Date(value);
    } catch (_) {
      return "Invalid Date";
    }
    return "";
  }
  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        dateFormat="YYYY-MM-DD"
        isClearable
        selected={(value && new Date(value)) || null}
        onChange={(val) => {
          onChange(name, val);
        }}
      />
    );
  };
  return (
    <Formik
      initialValues={{
        url: "",
        title: "",
        subject: "",
        description: "",
        date: "",
      }}
      onSubmit={(values, actions) => {
        let success = false;
        fetch(`http://localhost:5000/api/v1/accessions`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            // TODO: Make dynamic based on lang context
            metadata_language: "english",
            url: values.url,
            metadata_title: values.title,
            metadata_subject: values.subject,
            metadata_description: values.description,
            metadata_time: `${new Date(values.date).toISOString().split("T")[0]}T00:00:00`,
          }),
        })
          .then((response) => {
            if (response.status === 201) {
              success = true;
            } else {
              success = false;
            }
            return response.text();
          })
          .then((response_text) => {
            if (!success) {
              console.error(response_text);
              toast({
                title: "Oh no!",
                description: `Something went wrong archiving your url ${response_text}`,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Crawling URL",
                description: `We're crawling your url ${values.url}, it will appear in the archive soon`,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });

        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="url" validate={validateURL}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.url && form.touched.url}>
                <FormLabel>URL</FormLabel>
                <Input {...field} placeholder="https://example.com" />
                <FormErrorMessage>{form.errors.url}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="title" validate={validateTitle}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel mt={2}>Title</FormLabel>
                <Input {...field} />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="subject" validate={validateSubject}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.subject && form.touched.subject}
              >
                <FormLabel mt={2}>Subject</FormLabel>
                <Textarea {...field} />
                <FormErrorMessage mb={2}>
                  {form.errors.subject}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description" validate={validateDescription}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel mt={2}>Description</FormLabel>
                <Textarea {...field} />
                <FormErrorMessage mb={2}>
                  {form.errors.description}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="date" validate={validateDate}>
            {({ form }) => (
              <FormControl isInvalid={form.errors.date && form.touched.date}>
                <FormLabel mt={2}>Date</FormLabel>
                {/* <Input size="md" type="date" {...field} /> */}
                <Box className="dark-theme">
                  <DatePickerField
                    name="date"
                    value={props.values.date}
                    onChange={props.setFieldValue}
                  />
                </Box>
                <FormErrorMessage mb={2}>{form.errors.date}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="cyan"
            isLoading={props.isSubmitting}
            type="submit"
            disabled={!(props.isValid && props.dirty)}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
