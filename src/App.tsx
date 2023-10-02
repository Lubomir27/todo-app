import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./App.css";
import { skSK } from "@mui/x-date-pickers/locales";
import { sk } from "date-fns/locale";
import SignUp from "./components/forms/InsuranceForm";

function App() {
  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={sk}
        localeText={
          skSK.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <SignUp />
      </LocalizationProvider>
    </>
  );
}

export default App;
