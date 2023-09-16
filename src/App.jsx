import { Container } from "@mui/material";
import "./App.css";
import MainContent from "./components/MainContent";
function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Container maxWidth='xl'>
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
