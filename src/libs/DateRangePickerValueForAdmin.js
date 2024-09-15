import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { useState } from "react";
import { useEffect } from "react";
// 날짜를 받아와야하는경우, 날짜를 지정하는 경우
export default function DateRangePickerValueForAdmin({
  startDate,
  endDate,
  onDateChange,
  isEdit,
}) {
  // 날짜 유효성 상태
  const [isDateValid, setIsDateValid] = useState(true);
  const [value, setValue] = useState(() => [
    dayjs().subtract(1, "month"),
    dayjs().add(1, "month"),
  ]);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    // 날짜 유효성 검사
    const [start, end] = newValue;
    const isValid = end.isAfter(start);
  };

  useEffect(() => {
    if (isEdit) {
      // 수정하는 거면
      // 문자열을 dayjs 객체로 변환

      const startDay = dayjs(startDate.trim());
      const endDay = dayjs(endDate.trim());

      setValue([startDay, endDay]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    console.log("유효날자", isDateValid);
    // 추가하기
    if (isDateValid) {
      onDateChange(
        value[0].format("YYYY-MM-DD"),
        value[1].format("YYYY-MM-DD")
      );
    }
  }, [isDateValid, value]); //! >> ??? 왜 startDate도 들어가야하지?

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["SingleInputDateRangeField", "SingleInputDateRangeField"]}
      >
        <SingleInputDateRangeField
          label="전시날짜"
          value={value}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
