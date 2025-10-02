import "@mantine/core/styles.css";
import { Center, MantineProvider, Stack, Title } from "@mantine/core";
import { theme } from "./theme";
import WordleGame from "./components/WordleGame";

export default function App() {
  return <MantineProvider defaultColorScheme='dark'>
    <Center style={{ height: '100vh' }}>
      <Stack>
        {/* <Title>Wordle With Friends</Title> */}
        <WordleGame />
      </Stack>
    </Center>
  </MantineProvider>;
}
