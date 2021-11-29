import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useStore } from "../../providers/Store.provider";

const Statistics = () => {
  const store = useStore();
  const sessions = store.statistics.sessions;

  return (
    <Container>
      <Stack mt={10}>
        {sessions.length ? (
          [...sessions].reverse().map((session) => (
            <Accordion key={session.timestamp}>
              <AccordionSummary>
                <Typography variant={"h5"}>
                  Сессия {new Date(session.timestamp).toLocaleString()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography gutterBottom>{`Текст: ${session.text}`}</Typography>
                <Typography gutterBottom>
                  {`Слов в минуту: ${session.charsPerMinute}`}
                </Typography>
                <Typography>{`Точность: ${session.accuracy}`}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box>Сессий пока не было.</Box>
        )}
      </Stack>
    </Container>
  );
};

export default Statistics;
