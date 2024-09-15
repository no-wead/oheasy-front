import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateDate } from "@mui/x-date-pickers/internals";

import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";

import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useEffect } from "react";

// 캘린더
//calendarLabel : 박스에 표시할 이름
export default function DatePickerOpenTo({ calendarType, onDateChange }) {
  console.log(calendarType); // 캘린더 유형 로깅
  const [isDateValid, setIsDateValid] = useState(true); // 날짜 유효성 상태 관리
  const [value, setValue] = useState(dayjs());

  // 날짜 변경 처리 함수
  const handleDateChange = (newValue) => {
    if (calendarType == "startDate") {
      setValue(newValue);
      onDateChange(newValue.startOf("month").format("YYYY-MM-DD"));
    } else if (calendarType === "endDate") {
      setValue(newValue);
      onDateChange(newValue.endOf("month").format("YYYY-MM-DD"));
    }
  };
  useEffect(() => {
    if (calendarType == "startDate") {
      onDateChange(dayjs().format("YYYY-MM-DD"));
    } else if (calendarType === "endDate") {
      onDateChange(dayjs().format("YYYY-MM-DD"));
    }
  }, []);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateFormats={{ monthShort: `M` }}
    >
      <DemoContainer components={["DatePicker", "DatePicker", "DatePicker"]}>
        <DatePicker
          format="YYYY-MM"
          label={calendarType === "startDate" ? "시작" : "종료"}
          views={["month", "year"]}
          value={value} // 현재 값
          onChange={handleDateChange} // 변경시 핸들러 호출
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

const locations = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

// 위치 셀렉트
// todo 비즈니스 메인에도 이벤트함수 반영하기
export function SelectSizesExample({
  size,
  type,
  selectedLocation,
  onLocationChange,
}) {
  let selectComponentStyle = {
    maxWidth: "100px", // 최대 가로 길이를 200px로 설정
  };
  let selectComponent;

  switch (size) {
    case "large":
      selectComponent = (
        <Form.Select size="lg">
          <option>Large select</option>
        </Form.Select>
      );
      break;
    case "default":
      if (type === "location") {
        selectComponent = (
          <Form.Select
            name="address"
            style={selectComponentStyle}
            value={selectedLocation}
            onChange={onLocationChange}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Form.Select>
        );
      } else {
        selectComponent = (
          <Form.Select>
            <option>Default select</option>
          </Form.Select>
        );
      }
      break;
    case "small":
      selectComponent = (
        <Form.Select size="sm">
          <option>Small select</option>
        </Form.Select>
      );
      break;
    default:
      selectComponent = <p>선택 옵션이 유효하지 않습니다.</p>;
  }

  return (
    <>
      {selectComponent}
      <br />
    </>
  );
}
