import { ButtonHTMLAttributes } from "react";
import * as tokens from "@wire/tokens/dist/javascript/variables";
import icon from "../../assets/AndroidLogo.svg";

export type DemmoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  state?: "default" | "success" | "error";
};

export const DemoButton = ({
  children,
  label,
  state = "default",
  ...props
}: DemmoButtonProps) => {
  const uniqueId = "DemoButton" + Math.random().toString(36).substring(7);
  return (
    <>
      <style>
        {`
          #${uniqueId} {
            color: ${tokens.ButtonsConfirmColorFont};
            background-color: ${tokens.ButtonsConfirmColorDefault};
            font-size: ${tokens.ButtonsConfirmFontSize};
            line-height: ${tokens.ButtonsConfirmLineHeight};
            border-radius: ${tokens.ButtonsConfirmBorderRadius};
            padding: ${tokens.ButtonsConfirmSpacingInner} ${tokens.ButtonsConfirmSpacingOuter};
            opacity: ${tokens.ButtonsConfirmOpacity};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: ${tokens.ButtonsConfirmSpacingInner};
          }
          #${uniqueId}.error {
            background-color: ${tokens.ButtonsConfirmColorError};
          }
          #${uniqueId}.success {
            background-color: ${tokens.ButtonsConfirmColorSuccess};
          }
          #${uniqueId}:hover, #${uniqueId}:active, #${uniqueId}:focus {
            background-color: ${tokens.ButtonsConfirmColorHover};
          }

        `}
      </style>
      <button
        {...props}
        id={uniqueId}
        className={`${state === "error" ? "error" : state === "success" ? "success" : ""}`}
      >
        <img src={icon} alt="Android Logo" />
        {label ? label : children}
      </button>
    </>
  );
};
