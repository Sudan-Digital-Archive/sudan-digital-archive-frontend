import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/date-picker.css";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ArchiveDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  isClearable?: boolean;
}
export function ArchiveDatePicker({
  isClearable = true,
  onChange,
  selected,
}: ArchiveDatePickerProps) {
  const { i18n} = useTranslation();
  return (
    <Box className="dark-theme" mr={2} ml={2}>
      <DatePicker
        dateFormat={i18n.language === "ar" ? "yyyy/MM/dd" : "MM/dd/yyyy"}
        // doesn't work with right to left sad face
        isClearable={i18n.language === "ar" ? false: isClearable}
        selected={selected}
        onChange={onChange}
        showYearDropdown
        dropdownMode="select"
        locale={i18n.language === "ar" ? "ar" : "en"}
        placeholderText={i18n.language === "ar" ? "اختر تاريخ" : "Select date"}
      />
    </Box>
  );
}
