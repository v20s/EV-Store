import React, { useState, useEffect } from "react";
import axios from "axios";

import { CarConfigurator, Header } from "../components/SharedComponents";
import featureImg1 from "../assets/Model3f1.png";
import featureImg2 from "../assets/ModelXSf2.png";
import featureImg3 from "../assets/ModelXSf3.png";
import featureImg4 from "../assets/ModelXSf4.png";
import featureImg5 from "../assets/ModelXSf5.png";
import featureImg6 from "../assets/ModelXSf6.png";
import featureImg7 from "../assets/ModelXSf7.png";


const carImages = {
  blue: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX00,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX00,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX00,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
    ],
    premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX20,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX20,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX20,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$WX20,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSB,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
    ]
  },
  red: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX00,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX00,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX00,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX20,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX20,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX20,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$WX20,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PR01,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ]
  },
  black: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX00,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX00,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX00,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX20,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX20,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX20,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$WX20,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PBSB,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ]
  },
  white: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX00,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX00,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX00,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX20,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX20,$IBE00&view=SIDE&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX20,$IBE00&view=REAR34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$WX20,$IBE00&view=RIMCLOSEUP&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PPSW,$IBE00,$ST1Y&view=INTERIOR&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
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
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODELY/UI/CN_gemini_wheels.png?&"
  },
  premium: {
    name: "Premium (+$7,200)",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODELY/UI/induction_wheels.png?&"
  }
};

function ModelXPage() {
  const [vehicle, setVehicle] = useState(null);
  const [loanResult, setLoanResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/vehicles?model=Model X")
      .then(response => {
        if (response.data.length > 0) {
          setVehicle(response.data[0]);
        } else {
          console.warn("No Model X data found in the database.");
        }
      })
      .catch(error => console.error("Error fetching Model X details:", error));
  }, []);

  const handleFinanceClick = () => {
    if (!vehicle) return;

    const loanRequest = {
      vehicle_price: parseFloat(vehicle.price) || 0,
      province: "ON",
      term_months: 60,
      interest: 5.0,
      down_payment: 5000,
      trade_value: 0,
    };

    axios.post("http://localhost:8080/api/loan/provinceCalculate", loanRequest, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => setLoanResult(response.data))
      .catch((error) => console.error("Loan calculation failed:", error.response?.data || error.message));
  };

  return (
    <CarConfigurator
      modelName="Model X"
      basePrice={vehicle?.price ? Number(vehicle.price) : 0}
      stats={{
        range: vehicle?.range || "509 km",
        topSpeed: vehicle?.topSpeed || "250 km/h",
        zeroTo100: vehicle?.kmh ? `${vehicle.kmh} sec` : "3.9 sec",
      }}
      carImages={carImages}
      colorOptions={colorOptions}
      tireOptions={tireOptions}
      premiumTirePrice={7200}
      featuresImages={[featureImg1, featureImg2, featureImg3, featureImg4, featureImg5, featureImg6, featureImg7]}
      onFinanceClick={handleFinanceClick}
      loanResult={loanResult}
      vehicle={vehicle}
    />
  );
}

export default ModelXPage;