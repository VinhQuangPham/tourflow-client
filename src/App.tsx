import "./ContextAPI/TourFlowProvider";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TourDetail from "./Components/TourDetail";
import { TourFlowProvider } from "./ContextAPI/TourFlowProvider";
import CustomerProfile from "./Components/CustomerProfile";
import PostTour from "./Components/PostTour";

const App = () => {
  return (
    <TourFlowProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tourdetail" element={<TourDetail />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/post_tour" element={<PostTour />} />
        </Routes>
      </Router>
    </TourFlowProvider>
  );
};

export default App;
