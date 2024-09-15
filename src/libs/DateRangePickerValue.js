import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { useState } from "react";
import { useEffect } from "react";
// 날짜를 받아와야하는경우, 날짜를 지정하는 경우
export default function DateRangePickerValue({
  startDate,
  endDate,
  onDateChange,
  isEdit,
}) {
  // 날짜 유효성 상태
  const [isDateValid, setIsDateValid] = useState(true);
  const [value, setValue] = useState(() => [dayjs(), dayjs().add(1, "month")]);
  console.log("dateRangePicker 안" + value);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    // 날짜 유효성 검사
    const [start, end] = newValue;
    const isValid = end.isAfter(start);
    console.log("날짜 전" + isValid);
    setIsDateValid(isValid); // 부모 컴포넌트에 유효성 결과 전달
    console.log("날짜 후" + isValid);

    if (isDateValid) {
      console.log("날짜들어옴");
      onDateChange(
        value[0].format("YYYY-MM-DD"),
        value[1].format("YYYY-MM-DD")
      );
    }
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
    // isEdit 은 수정이 아닐경우 추가하기
    console.log("유효날자", isDateValid);
    if (!isEdit) {
      if (isDateValid) {
        onDateChange(
          value[0].format("YYYY-MM-DD"),
          value[1].format("YYYY-MM-DD")
        );
      }
    }
  }, [isDateValid, value]); //! >> ??? 왜 startDate도 들어가야하지?

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["SingleInputDateRangeField", "SingleInputDateRangeField"]}
      >
        <div className="SingleInputDateRangeFieldCustom">
          <SingleInputDateRangeField
            format="YYYY-MM-DD"
            label="전시 희망 날짜"
            value={value}
            onChange={handleDateChange}
            sx={{
              ".MuiInputBase-root": {
                paddingRight: 0, // 오른쪽 패딩 제거
              },
            }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
