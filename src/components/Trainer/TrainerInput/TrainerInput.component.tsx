import React, { FormEventHandler, useCallback, useRef } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import {
  InvisibleInput,
  Char,
  paperStyles,
  typographyStyles,
} from "./TrainerInput.styles";
import { observer } from "mobx-react-lite";
import { useTrainerSession } from "../../../providers/TrainerSession.provider";

const TrainerInput = () => {
  const session = useTrainerSession();
  const text = session.model.content;

  const theme = useTheme();

  const inputEl = useRef<HTMLInputElement>(null);

  const onInput: FormEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const nativeEvent: InputEvent = e.nativeEvent as InputEvent;
      const char = nativeEvent.data ?? "Backspace";
      session.processInput(char);
    },
    [session]
  );

  return (
    <Box height={"100%"}>
      <Paper {...paperStyles}>
        <Typography {...typographyStyles}>
          {text.split("").map((letter, index) => (
            // Found nothing better than index for key
            <Char
              key={index}
              theme={theme}
              state={session.currentCharState(index)}
            >
              {letter}
            </Char>
          ))}
        </Typography>

        <InvisibleInput
          type="text"
          onInput={onInput}
          ref={inputEl}
          autoFocus
          onBlur={({ target }) => target.focus()}
        />
      </Paper>
    </Box>
  );
};

export default observer(TrainerInput);
