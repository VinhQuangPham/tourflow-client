import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { Tour } from "../index";
import ModalBookTour from "./ModalBookTour";
import "../styles/TourDetail.css";

const TourDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tourId = searchParams.get("id");
  const [tour, setTour] = useState<Tour>();
  const [tourPlan, setTourPlan] = useState<string[]>([]);
  const [imgs, setImgs] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookTour, setBookTour] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchData = async (tourId: any) => {
    const url = `http://localhost:5175/api/tour/${tourId}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setTour(result);
    } catch (error) {
      console.log("Got error in TourDetail: ", error);
    }
  };
  const fetchTourImgs = async (tourId: any) => {
    const url = `http://localhost:5175/api/img/${tourId}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setImgs(result);
    } catch (error) {
      console.log("Got error in fetchTourImgs: ", error);
    }
  };

  useEffect(() => {
    fetchData(tourId);
    fetchTourImgs(tourId);
  }, [tourId]);

  useEffect(() => {
    setTourPlan(tour?.tourPlans ?? []);
  }, [tour]);
  useEffect(() => {}, [bookTour]);
  const backgroundStyle1 = {
    backgroundImage: `url(${imgs[0]})`,
  };
  const backgroundStyle2 = {
    backgroundImage: `url(${imgs[1]})`,
    backgroundSize: "cover", // Optionally, adjust how the image fits
    backgroundPosition: "center",
  };
  const formatDate = (dateString: string): string => {
    if (dateString == "") return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div id="tourdetail_container">
      <NavigationBar />
      <div id="tourdetail_banner" style={backgroundStyle1}>
        <h1 id="header_banner">{tour?.city}</h1>
      </div>
      <div id="plan">
        <h1 id="header">Moments to fill with you on those fleeting days....</h1>
        {tourPlan.map((text, index) => {
          if (index % 2 == 0) {
            return (
              <div key={index} className={`tour_plan_box odd_box`}>
                <h5>Day {index + 1}</h5>
                {text}
              </div>
            );
          } else {
            return (
              <div key={index} className={`tour_plan_box even_box`}>
                <h5>Day {index + 1}</h5>
                {text}
              </div>
            );
          }
        })}
      </div>
      <div id="tour_infor">
        <div id="item_1">
          <div id="tourinfor_banner" style={backgroundStyle2}>
            <h3>Tokyo</h3>
          </div>
        </div>
        <div id="item_2">
          <div id="sub_item2_1">
            <div className="textline-container">
              <div className="textline">
                <h4>Departure</h4>
                <h5>{tour?.departureLocation}</h5>
              </div>
              <div className="textline">
                <h4>From</h4>
                <h5>{formatDate(tour?.startDate ?? "")}</h5>
                <h4>To</h4>
                <h5>{formatDate(tour?.endDate ?? "")}</h5>
              </div>
              <div className="textline">
                <h4>Price</h4>
                <h5>{tour?.price}</h5>
              </div>
              <div className="textline">
                <h4>Available slots</h4>
                <h5>{tour?.availableSlots}</h5>
              </div>
            </div>
          </div>
          {!sessionStorage.getItem("jwt") ? (
            <div id="sub_item2_2">
              <div
                id="book_now"
                onClick={() => {
                  handleOpenModal();
                  console.log("book now");
                }}
              >
                Book now
              </div>
            </div>
          ) : (
            <div id="sub_item2_2">
              <div
                id="book_now"
                onClick={() => {
                  console.log("book immediately");
                  console.log(tour);
                  setBookTour(!bookTour);
                }}
              >
                Book now
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalBookTour
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      ></ModalBookTour>
      <div id="book_tour_content" className={bookTour ? "active" : "inactive"}>
        <h3>Book now</h3>
      </div>
      <div id="footer"></div>
    </div>
  );
};

export default TourDetail;
