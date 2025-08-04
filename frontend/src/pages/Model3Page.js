import React, { useState, useEffect } from "react";
import axios from "axios";
import { CarConfigurator, Header } from "../components/SharedComponents";
import featureImg1 from "../assets/Model3f1.png";
import featureImg2 from "../assets/Model3f2.png";
import featureImg3 from "../assets/Model3f3.png";
import featureImg4 from "../assets/Model3f4.png";
import featureImg5 from "../assets/Model3f5.png";
import featureImg6 from "../assets/Model3f6.png";
import featureImg7 from "../assets/Model3f7.png";

const carImages = {
  blue: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W38A,$IPB2&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W38A,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W38A,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W38A,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PPSB,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
    ],
    premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W39G,$IPB2&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W39G,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W39G,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W39G,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PPSB,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
        
    ]
  },
  red: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PR01,$W38A,$IPB2&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PR01,$W38A,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PR01,$W38A,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PR01,$W38A,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PR01,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PR01,$W39G,$IPB2&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PR01,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PR01,$W39G,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PR01,$W39G,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PR01,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ]
  },
  black: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W38A,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W38A,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W38A,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W38A,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PBSB,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W39G,$IPB2&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W39G,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W39G,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PBSB,$W39G,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PBSB,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ]
  },
  white: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W38A,$IPB2&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W38A,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W38A,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W38A,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PPSW,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W39G,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W39G,$IPB2&view=STUD_SIDEVIEW&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W39G,$IPB2&view=STUD_REAR34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSW,$W39G,$IPB2&view=STUD_RIMCLOSEUP&model=m3&size=1920&bkba_opt=2&crop=0,0,80,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PPSW,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ]
  }
};

const colorOptions = {
  blue: {
    name: "Deep Blue Metallic",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODEL3/UI/Paint_Blue.png?&"
  },
  red: {
    name: "Ultra Red",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODEL3/UI/Paint_Red.png?&"
  },
  black: {
    name: "Solid Black",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODEL3/UI/Paint_Black.png?&"
  },
  white: {
    name: "Pearl White Multi-Coat",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODEL3/UI/Paint_White.png?&"
  }
};

const tireOptions = {
  standard: {
    name: "Standard (Included)",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODEL3_/UI/Wheel-Swatch_18-in.png?&"
  },
  premium: {
    name: "Premium (+$2,000)",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODEL3_/UI/Wheel-Swatch_19-in.png?&"
  }
};

function Model3Page() {
  const [vehicle, setVehicle] = useState(null);
  const [loanResult, setLoanResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/vehicles?model=Model 3")
      .then((response) => {
        console.log("Full API Response:", response.data);
        if (response.data.length > 0) {
          console.log("Received Price:", response.data[0].price);
          setVehicle(response.data[0]);
        } else {
          console.warn("No Model 3 data found in the database.");
        }
      })
      .catch((error) => console.error("Error fetching Model 3 details:", error));
  }, []);

  const handleFinanceClick = () => {
    if (!vehicle) {
      console.warn("No vehicle data available for loan calculation.");
      return;
    }

    const loanRequest = {
      vehicle_price: parseFloat(vehicle.price) || 0,
      province: "ON",
      term_months: 60,
      interest: 5.0,
      down_payment: 5000,
      trade_value: 0,
    };

    console.log("Sending Loan Request:", loanRequest);

    axios.post("http://localhost:8080/api/loan/provinceCalculate", loanRequest, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log("Loan Calculation Response:", response.data);
      setLoanResult(response.data);
    })
    .catch((error) => console.error("Loan calculation failed:", error.response?.data || error.message));
  };

  return (
    <CarConfigurator
      modelName="Model 3"
      basePrice={vehicle?.price ? Number(vehicle.price) : 0}
      stats={{
        range: vehicle?.range || "N/A",
        topSpeed: vehicle?.topSpeed || "N/A",
        zeroTo100: vehicle?.kmh ? `${vehicle.kmh} sec` : "N/A",
      }}
      carImages={carImages}
      colorOptions={colorOptions}
      tireOptions={tireOptions}
      premiumTirePrice={2000}
      featuresImages={[featureImg1, featureImg2, featureImg3, featureImg4, featureImg5, featureImg6, featureImg7]}
      onFinanceClick={handleFinanceClick}
      loanResult={loanResult}
      vehicle={vehicle}
    />
  );
}

export default Model3Page;