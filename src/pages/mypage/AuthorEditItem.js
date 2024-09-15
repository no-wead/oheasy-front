import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import { NumericFormat } from "react-number-format";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";

//!---------------- 작가 아이템 수정 및 등록, 프롭으로 구분 필요
// todo 작가 아이템 수정이라면 데이터 불러오는 코드 필요

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 0000-0000"
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

//!----------- isEdit : Boolean 새로작성인지 불러오기인지
//! MyPosterForBusiness에서 조회랑, 새로 만들기 경로 타고 옴
//! isEdit인 경우엔 posterId(작품 id) useEffect사용, 아닌경우 사용x
const AuthorEditItem = () => {
  const location = useLocation();

  // location.state로부터 값 접근
  const { posterId, isEdit } = location.state || { posterId: 0, isEdit: true }; // state가 없는 경우를 대비해 기본값 설정

  const [values, setValues] = React.useState({
    textmask: "", // "(010) 0000-0000"
    numberformat: "1320",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //------------------------------------------------------------
  console.log("작가 컨텐츠 수정인지?" + isEdit);
  const nav = useNavigate();

  // 저장 버튼 활성화
  const [enableNextBtn, setEnableNextBtn] = useState(false);

  const [businessInfoState, setBusinessInfoState] = useState({
    name: "",
    phoneNumber: "",
    explanation: "",
  });

  // 입력이 달라지면 상태 감지
  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setBusinessInfoState({
      ...businessInfoState,
      [e.target.name]: e.target.value,
    });
  };

  // todo 사진 올렸는지도 확인하기
  // 저장버튼 상태 변경
  useEffect(() => {
    console.log("저장 버튼 useEffect");
    if (
      businessInfoState.name.length > 1 &&
      businessInfoState.explanation.length > 3 &&
      businessInfoState.phoneNumber.length > 8
    ) {
      console.log("빈값없음");
      setEnableNextBtn(true); // 다음 버튼 비활성화
    } else {
      console.log("필수 입력 필드가 비어있습니다.");
      setEnableNextBtn(false); // 다음 버튼 비활성화
    }
  }, [businessInfoState]);

  // 작가 아이템 정보 가져오기 isEdit = true 인 경우
  useEffect(() => {
    // 수정의 경우
    if (isEdit) {
      let id = localStorage.getItem("userId");
      console.log(" BusinessInfo작가 id: " + id);

      // 작가 아이템 정보 가져오기
      // onGetAuthorInfoHandler({ id }, (response) => {
      //   console.log(" 작가 개인정보 응답값 받음");
      //   setBusinessInfoState((prevState) => ({
      //     businessNumber: response.data.businessNumber,
      //     company: response.data.company,
      //     owner: response.data.ceo,
      //     id: response.data.id,
      //     phoneNumber: response.data.phone,
      //     email: response.data.email,
      //     password: " ",
      //     authPassword: " ",
      //   }));
      // });
    } else if (!isEdit) {
      console.log("아이템 새 등록 ");
    } else {
      alert("작가 아이템 등록 잘못된 접근입니다. ");
    }
  }, []); //  초기에만 실행

  //사진 첨부
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  //todo 사진 첨부 로직 구성하기

  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, maxWidth: "100%" }, // Set margin and maximum width for each text field
          width: "80%", // Set width of the Box to 80% of its parent
          display: "flex", // Use flexbox display
          justifyContent: "center", // Center items horizontally
          flexDirection: "column", // Arrange items in a column
          alignItems: "center", // Center items vertically
          marginTop: 2, // Margin top of 2 units
        }}
      >
        <Stack spacing={2}>
          <TextField
            name="name"
            id="standard-basic"
            label="작가이름"
            variant="standard"
            onChange={handleChangeState}
            value={businessInfoState.name}
          />
          <TextField
            name="phoneNumber"
            id="standard-number"
            label="전화번호"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleChangeState}
            value={businessInfoState.phoneNumber}
          />
          <TextField
            name="explanation"
            id="outlined-multiline-static"
            label="소개"
            multiline
            rows={10}
            onChange={handleChangeState}
            value={businessInfoState.explanation}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            사진 올리기
            <VisuallyHiddenInput type="file" />
          </Button>
        </Stack>
        <button type="button" class="btn btn-success" disabled={!enableNextBtn}>
          저장
        </button>
      </Box>

      {/*(010) 형식 
       <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">전화번호</InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl> */}
    </div>
  );
};

export default AuthorEditItem;
