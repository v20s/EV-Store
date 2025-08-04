import React, { useState, useEffect } from "react"; 
import axios from "axios";

import { CarConfigurator } from "../components/SharedComponents";
import featureImg1 from "../assets/ModelXSf1.png";
import featureImg2 from "../assets/ModelXSf2.png";
import featureImg3 from "../assets/ModelXSf3.png";
import featureImg4 from "../assets/ModelXSf4.png";
import featureImg5 from "../assets/ModelXSf5.png";
import featureImg6 from "../assets/ModelXSf6.png";
import featureImg7 from "../assets/ModelXSf7.png";

const carImages = {
  blue: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS91,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS91,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS91,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS91,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
    ],
    premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS11,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS11,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS11,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$WS11,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSB,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
    ]
  },
  red: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS91,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS91,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS91,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS91,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS11,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS11,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS11,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS11,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ]
  },
  black: {
    standard: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS91,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS91,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS91,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS91,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS11,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS11,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS11,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$WS11,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PBSB,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ]
  },
  white: {
    standard: [
       "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS91,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
       "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS91,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
       "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS91,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
       "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS91,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
       "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
      ],
      premium: [
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS11,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS11,$IBE00&view=SIDE&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS11,$IBE00&view=REAR34&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$WS11,$IBE00&view=RIMCLOSEUP&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&",
        "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PPSW,$IBE00,$ST06&view=INTERIOR&model=ms&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&"
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
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODELS/UI/ui_swat_whl_tempest.png?&"
  },
  premium: {
    name: "Premium (+$5,900)",
    image:
      "https://digitalassets.tesla.com/co1n/image/upload/f_auto,q_auto/prod/static_assets/MODELS/UI/21Arachnid.png?&"
  }
};
function ModelSPage() {
  const [vehicle, setVehicle] = useState(null);
  const [loanResult, setLoanResult] = useState(null);

  useEffect(() => {
      axios.get("http://localhost:8080/api/vehicles?model=Model S")
          .then(response => {
              console.log(" Full API Response:", response.data); //  Check full response
              if (response.data.length > 0) {
                  console.log(" Received Price:", response.data[0].price, typeof response.data[0].price);
                  setVehicle(response.data[0]); 
              } else {
                  console.warn("No Model S data found in the database.");
              }
          })
          .catch(error => console.error(" Error fetching Model S details:", error));
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

    console.log(" Sending Loan Request:", loanRequest);

    axios
      .post("http://localhost:8080/api/loan/provinceCalculate", loanRequest, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT Token
        },
      })
      .then((response) => {
        console.log(" Loan Calculation Response:", response.data);
        setLoanResult(response.data);
      })
      .catch((error) => console.error(" Loan calculation failed:", error.response?.data || error.message));
  };

  return (
      <CarConfigurator
	  
        modelName="Model S"
		basePrice={vehicle?.price ? Number(vehicle.price) : 0}


		
        stats={{
          range: vehicle?.range || "N/A",
          topSpeed: vehicle?.topSpeed || "N/A",
          zeroTo100: vehicle?.kmh ? `${vehicle.kmh} sec` : "N/A", // 
        }}
        carImages={carImages} // 
        colorOptions={colorOptions} // 
        tireOptions={tireOptions} // 
        premiumTirePrice={5900} // 
        featuresImages={[
          featureImg1, featureImg2, featureImg3, featureImg4,
          featureImg5, featureImg6, featureImg7
        ]}
        onFinanceClick={handleFinanceClick} // 
        loanResult={loanResult} // 
		vehicle={vehicle} // 

      />
    );




}

export default ModelSPage;