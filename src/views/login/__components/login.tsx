import React from "react";
import {
  FormContainer,
  HeaderContainer,
  InputContainer,
  StyledButton,
} from "../style/style";

import TextStyle from "../../../components/TextStyle";
import InputText from "../../../components/InputText";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Colors from "../../../constant/colors";
import { useLoginHooks } from "./useLoginHooks";

const LoginSection: React.FC = () => {
  const {
    handleSubmit,
    email,
    setEmail,
    errors,
    showPassword,
    password,
    setPassword,
    togglePasswordVisibility,
    onClickSwitchPage,
  } = useLoginHooks();

  return (
    <FormContainer>
      <HeaderContainer>
        <TextStyle variant="custom" customSize={"60px"} marginTop={2}>
          Login
        </TextStyle>
      </HeaderContainer>
      <InputContainer onSubmit={handleSubmit}>
        {/* -- Email -- */}
        <InputText
          label="Email"
          id="outlined-multiline-static"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          endIcon={<AlternateEmailIcon />}
          error={Boolean(errors.email)}
          helperText={errors.email}
          isEndIconDisabled
        />
        {/* -- Password -- */}
        <InputText
          label="Password"
          id="outlined-password-input"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endIcon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          onEndIconClick={togglePasswordVisibility}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            background: Colors.teal.default,
          }}
        >
          Login
        </StyledButton>
        <TextStyle variant="h6" align="center">
          Doesn't have account?{" "}
          <span
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onClickSwitchPage}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#1565c0")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#1976d2")
            }
          >
            Click Here
          </span>
        </TextStyle>
      </InputContainer>
    </FormContainer>
  );
};

export default LoginSection;
