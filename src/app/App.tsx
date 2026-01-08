import { BrowserRouter, Routes, Route } from "react-router";
import { WeatherProvider } from "../shared/context/WeatherContext";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { DetailPage } from "../pages/DetailPage";

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:locationId" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
