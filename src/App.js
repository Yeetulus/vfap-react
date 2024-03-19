import './App.css';
import {PageRouter} from "./routing/page-router";
import './styles/global.scss';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <>
          <ToastContainer/>
          <PageRouter/>
      </>
      );
}

export default App;
