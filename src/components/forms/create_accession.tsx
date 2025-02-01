import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ArchiveDatePicker } from "../date_picker.tsx";
import { useTranslation } from "react-i18next";
import { appConfig } from "../../constants.ts";
interface DatePickerFieldProps {
  name: string;
  value: string | null;
  onChange: (name: string, val: Date | null) => void;
}

export function CreateAccession() {
  const { t, i18n } = useTranslation();
  const toast = useToast();

  const validateURL = (value: string) => {
    try {
      new URL(value);
      return "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return t("create_accession_invalid_url");
    }
  };

  const validateRequired = (value: string, fieldName: string, customValidator?: (val: string) => string) => {
    if (!value) {
      return t(`create_accession_invalid_${fieldName}`);
    }
    return customValidator ? customValidator(value) : "";
  };

  function validateDate(value: string) {
    if (!value) {
      return "Date is required";
    }
    try {
      new Date(value);
      return "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return t("create_accession_invalid_date");
    }
  }

  const DatePickerField = ({ name, value, onChange }: DatePickerFieldProps) => {
    return (
      <ArchiveDatePicker
        isClearable={false}
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
      onSubmit={async (values, actions) => {
        try {
          const response = await fetch(`${appConfig.apiURL}accessions`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              metadata_language: i18n.language === "en" ? "english" : "arabic",
              url: values.url,
              metadata_title: values.title,
              metadata_subject: values.subject,
              metadata_description: values.description,
              metadata_time: `${new Date(values.date).toISOString().split("T")[0]}T00:00:00`,
            }),
          });

          const responseText = await response.text();

          if (response.status === 201) {
            toast({
              title: "Crawling URL",
              description: t("create_accession_success_description"),
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            console.error(responseText);
            toast({
              title: t("create_accession_error_toast_title"),
              description: `${t("create_accession_error_toast_description")} ${responseText}`,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error(error);
          toast({
            title: t("create_accession_error_toast_title"),
            description: t("create_accession_error_toast_description"),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {(props) => (
        <Form>
          <Field name="url" validate={(val: string) => validateRequired(val, "url", validateURL)}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ({ field, form }: any) => (
                <FormControl isInvalid={form.errors.url && form.touched.url}>
                  <FormLabel>{t("create_accession_url_field_label")}</FormLabel>
                  <Input
                    {...field}
                    placeholder={t("create_accession_url_field_placeholder")}
                  />
                  <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                </FormControl>
              )
            }
          </Field>
          <Field name="title" validate={(val: string) => validateRequired(val, "title")}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                >
                  <FormLabel mt={2}>
                    {t("create_accession_title_field_label")}
                  </FormLabel>
                  <Input {...field} />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )
            }
          </Field>
          <Field name="subject" validate={(val: string) => validateRequired(val, "subject")}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.subject && form.touched.subject}
                >
                  <FormLabel mt={2}>
                    {t("create_accession_subject_field_label")}
                  </FormLabel>
                  <Textarea {...field} />
                  <FormErrorMessage mb={2}>
                    {form.errors.subject}
                  </FormErrorMessage>
                </FormControl>
              )
            }
          </Field>
          <Field name="description" validate={(val: string) => validateRequired(val, "description")}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.description && form.touched.description
                  }
                >
                  <FormLabel mt={2}>
                    {t("create_accession_description_field_label")}
                  </FormLabel>
                  <Textarea {...field} />
                  <FormErrorMessage mb={2}>
                    {form.errors.description}
                  </FormErrorMessage>
                </FormControl>
              )
            }
          </Field>
          <Field name="date" validate={validateDate}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ({ form }: any) => (
                <FormControl isInvalid={form.errors.date && form.touched.date}>
                  <FormLabel mt={2}>
                    {t("create_accession_date_field_label")}
                  </FormLabel>
                  <DatePickerField
                    name="date"
                    value={props.values.date}
                    onChange={props.setFieldValue}
                  />
                  <FormErrorMessage mb={2}>{form.errors.date}</FormErrorMessage>
                </FormControl>
              )
            }
          </Field>
          <Button
            mt={4}
            colorScheme="cyan"
            isLoading={props.isSubmitting}
            type="submit"
            disabled={!(props.isValid && props.dirty)}
          >
            {t("create_accession_submit_field_label")}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
