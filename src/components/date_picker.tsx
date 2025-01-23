import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/date-picker.css";
import { Box } from "@chakra-ui/react";
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
  return (
    <Box className="dark-theme" mr={2} ml={2}>
      <DatePicker
        dateFormat="YYYY/MM/d"
        isClearable={isClearable}
        selected={selected}
        onChange={onChange}
        showYearDropdown
      />
    </Box>
  );
}
