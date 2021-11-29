import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { PaperProps, Theme, TypographyProps } from "@mui/material";
import { CharState } from "../Trainer.types";

export const paperStyles: PaperProps = {
  elevation: 4,
  sx: {
    minHeight: "100%",
    py: 7,
    px: 5,
  },
};

export const typographyStyles: TypographyProps = {
  lineHeight: 1.3,
  letterSpacing: 1,
  variant: "h5",
};

export const InvisibleInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const getCharCssPropertiesMap = (theme: Theme) => ({
  [CharState.Passed]: css`
    color: ${theme.palette.success.main};
  `,

  [CharState.Active]: css`
    color: ${theme.palette.success.contrastText};
    background-color: ${theme.palette.success.main};
  `,

  [CharState.Error]: css`
    color: ${theme.palette.error.contrastText};
    background-color: ${theme.palette.error.main};
  `,

  [CharState.Pending]: css`
    color: ${theme.palette.text.primary};
  `,
});

type CharProps = {
  theme: Theme;
  state: CharState;
};

export const Char = styled.span<CharProps>`
  ${({ theme, state }) => getCharCssPropertiesMap(theme)[state]};

  padding: 0 1px;
  user-select: none;
`;
