import "../styles/EditText.css";
import React from "react";
// hint 는 흐리게 보이는 text 입력
const EditText = React.forwardRef(
  ({ name, hint, onChange, whatType }, editRef) => {
    const handleChange = (e) => {
      // let { value } = e.target;
      // if (whatType === "number") {
      //   let formattedPhoneNumber = value.replace(/[^\d]/g, ""); // 숫자가 아닌 문자 제거
      //   // 숫자만 남은 문자열을 특정 포맷에 맞게 조정
      //   if (formattedPhoneNumber.length > 3 && formattedPhoneNumber.length <= 7) {
      //     formattedPhoneNumber = `${formattedPhoneNumber.slice(
      //       0,
      //       3
      //     )}-${formattedPhoneNumber.slice(3)}`;
      //   } else if (formattedPhoneNumber.length > 7) {
      //     formattedPhoneNumber = `${formattedPhoneNumber.slice(
      //       0,
      //       3
      //     )}-${formattedPhoneNumber.slice(3, 7)}-${formattedPhoneNumber.slice(
      //       7,
      //       11
      //     )}`;
      //   }
      //   // 이벤트 객체를 직접 수정하기보다는 새로운 이벤트 객체를 생성하여 value를 변경합니다.
      //   e = { ...e, target: { ...e.target, value: formattedPhoneNumber } };
      // }

      // 부모 컴포넌트의 onChange 핸들러 호출
      onChange(e);
    };

    return (
      <>
        <input
          ref={editRef}
          name={name}
          placeholder={hint}
          onChange={handleChange}
          type={whatType}
        />
      </>
    );
  }
);
export default EditText;
