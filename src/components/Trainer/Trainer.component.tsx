import React, { useCallback } from "react";
import TrainerInput from "./TrainerInput/TrainerInput.component";
import { SessionStatus, TrainerSessionObservable } from "./utils/Session";
import {
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import SessionProvider from "../../providers/TrainerSession.provider";
import Control from "./Control/Control.component";
import { SessionInfo } from "../../store/statistics/statistics.types";
import { useStore } from "../../providers/Store.provider";

const session = new TrainerSessionObservable();

const Trainer = () => {
  const store = useStore();
  const media = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const reset = useCallback(
    () => session.reset(SessionStatus.Pending),
    [session]
  );

  session.beforeFinish = () => {
    const sessionInfo: SessionInfo = {
      text: session.model.content,
      accuracy: session.statistics.accuracy.formatted,
      charsPerMinute: +session.statistics.chars.perMinute.toFixed(),
      timestamp: Date.now(),
    };

    store.statistics.addSessionInfo(sessionInfo);
  };

  return (
    <SessionProvider session={session}>
      <Stack direction={media ? "column" : "row"} gap={4}>
        <Box flex={1}>
          <TrainerInput />
        </Box>
        <Stack rowGap={3}>
          <Control>
            <Button onClick={session.start} fullWidth>
              Новая сессия
            </Button>
          </Control>

          <Control>
            <Button onClick={reset} color={"warning"} fullWidth>
              Сброс
            </Button>
          </Control>

          <Control>
            <Typography variant={"subtitle1"} textAlign={"center"}>
              Символов в минуту: <br />
              {session.statistics.chars.perMinute.toFixed()}
            </Typography>
          </Control>

          <Control>
            <Typography variant={"subtitle1"} textAlign={"center"}>
              Точность: <br />
              {session.statistics.accuracy.formatted}
            </Typography>
          </Control>

          <Control>
            <Typography variant={"subtitle1"} textAlign={"center"}>
              Последний символ: <br />
              {session.model.lastChar || "Space"}
            </Typography>
          </Control>
        </Stack>
      </Stack>
    </SessionProvider>
  );
};

export default observer(Trainer);
