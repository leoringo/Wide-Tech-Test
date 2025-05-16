import React from "react";
import {
  FormContainer,
  HeaderContainer,
  InputContainer,
  StyledButton,
} from "../style/style";
import { closeSuccessRegister } from "../loginSlice";

import TextStyle from "../../../components/TextStyle";
import InputText from "../../../components/InputText";
import PopupDialog from "../../../components/Popup";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";

import Colors from "../../../constant/colors";
import { useRegisterHooks } from "./useRegisterHooks";

const RegisterSection: React.FC = () => {
  const {
    handleSubmit,
    payload,
    setPayload,
    errors,
    showPassword,
    togglePasswordVisibility,
    onClickSwitchPage,
    dispatch,
    status
  } = useRegisterHooks();

  return (
    <FormContainer>
      <HeaderContainer>
        <TextStyle variant="custom" customSize={"60px"} marginTop={2}>
          Hello new user!
        </TextStyle>
      </HeaderContainer>
      <InputContainer onSubmit={handleSubmit}>
        {/* -- Name -- */}
        <InputText
          label="Name"
          id="outlined-multiline-static"
          value={payload.name}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              name: e.target.value,
            }))
          }
          endIcon={<BadgeIcon />}
          error={Boolean(errors.name)}
          helperText={errors.name}
          isEndIconDisabled
        />

        {/* -- Email -- */}
        <InputText
          label="Email"
          id="outlined-multiline-static"
          value={payload.email}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              email: e.target.value,
            }))
          }
          endIcon={<AlternateEmailIcon />}
          error={Boolean(errors.email)}
          helperText={errors.email}
          isEndIconDisabled
        />

        {/* -- Password -- */}
        <InputText
          label="Password"
          id="outlined-password-input"
          type={showPassword.password ? "text" : "password"}
          value={payload.password}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              password: e.target.value,
            }))
          }
          endIcon={
            showPassword.password ? <VisibilityOffIcon /> : <VisibilityIcon />
          }
          onEndIconClick={() => togglePasswordVisibility("password")}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        {/* -- Confirm Password -- */}
        <InputText
          label="Confirm Password"
          id="outlined-password-input"
          type={showPassword.confirmPassword ? "text" : "password"}
          value={payload.confirmPassword}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              confirmPassword: e.target.value,
            }))
          }
          endIcon={
            showPassword.confirmPassword ? (
              <VisibilityOffIcon />
            ) : (
              <VisibilityIcon />
            )
          }
          onEndIconClick={() => togglePasswordVisibility("confirm")}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
        />

        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            background: Colors.teal.default,
          }}
        >
          Register
        </StyledButton>
        <TextStyle variant="h6" align="center">
          Already have an account?{" "}
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

      <PopupDialog
        open={status === "success"}
        type="success"
        title="Hooray!"
        description="Successfully Registered!"
        onClose={() => dispatch(closeSuccessRegister())}
      />
    </FormContainer>
  );
};

export default RegisterSection;
