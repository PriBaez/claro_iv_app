import "./App.css";
import { BrowserRouter } from "react-router";
import AppRouter from "./Router";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./shared/components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
