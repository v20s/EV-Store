import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

// Avatars (adjust URLs or sizes as desired)
const BOT_AVATAR = "https://cdn-icons-png.flaticon.com/512/4712/4712105.png";
const USER_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to the EV store!", sender: "bot" },
    { text: "Can I know your email please?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("askEmail");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);

  // ----------------------------------------
  // Hard-coded features for each model
  // ----------------------------------------
  const features = {
    "Model 3": [
      // Main feature list
      {
        name: "Model 3, Upgraded",
        desc: "Refined with more range, an all-new premium interior and a noticeably quieter ride."
      },
      {
        name: "Easy to Use",
        desc: "Drive, navigate and charge your Tesla with ease. An intuitive 15.4” center touchscreen display keeps drive features, in-car navigation and your favorite songs, movies and more just a few taps away."
      },
      {
        name: "Charging that Works Anywhere",
        desc: "Plug in and recharge your Tesla wherever you are. While on the road, in-car navigation will automatically route you to charging options, and the Tesla app allows you to check your charge, view nearby Superchargers and more."
      },
      {
        name: "Your Tesla Adapts to You",
        desc: "When you walk up, your Tesla will automatically unlock the driver door, adjust to your preferred driving settings and sync your music. Just get in and go."
      },
      {
        name: "No More Clutter",
        desc: "Access everything on a crisp, ultra-responsive 15.4” center touchscreen. Use it to control driving features and cabin settings. For a hands-free experience, do it all using voice commands."
      },
      {
        name: "Built for Safety",
        desc: "Designed to meet global 5-star safety requirements, our vehicles are engineered to be the safest on the road. Active safety features like Automatic Emergency Braking come standard at no extra cost."
      },
      {
        name: "Improve Your Drive",
        desc: `50,000+ Superchargers Globally\nMobile Service\nDog Mode\nCamp Mode\nTesla Arcade & Theatre\nOver-the-Air Updates\nSentry Mode\nVoice Commands\nDriver Profiles\nKey Sharing\nIn-Car Navigation\nPreconditioning\nScheduled Departure`
      },

      // Additional compare features
      {
        name: "All New Interior",
        desc: "Enjoy an all-new interior that features a sleek, minimalist styling with a premium look and feel. The cabin is quieter than ever thanks to wrap-around acoustic glass, and includes new features like ambient lighting and ventilated seats."
      },
      {
        name: "Dual Displays",
        desc: "Navigate, stream and play all from the high-resolution 15.4” center touchscreen, now brighter than ever. Backseat passengers can enjoy climate controls and entertainment on our new 8” second-row display."
      },
      {
        name: "Studio-Quality Sound",
        desc: "A Tesla-designed premium audio system with up to 17 speakers (AWD/Performance) or 9 speakers (RWD). Includes native support for Spotify, Apple Music and Tidal."
      },
      {
        name: "Stay Connected",
        desc: "Upgraded microphones for crystal-clear calls, improved cellular & dual-band Wi-Fi, and Ultra-Wide Band for better Phone Key performance."
      },
      {
        name: "Wireless Charger",
        desc: "Easily charge two phones at once on a non-slip, contoured surface. The integrated center console offers deep storage and multiple USB-C ports."
      },
      {
        name: "Glass Roof",
        desc: "An expansive Glass Roof provides passengers with a brighter, more spacious experience and a seamless view of the sky. Infrared and UV light is effectively blocked to reduce heat and glare."
      }
    ],

    "Model S": [
      // Main feature list
      {
        name: "All-Wheel Drive",
        desc: "Independent front and rear motors for improved performance and traction, with no scheduled maintenance needed for the lifetime of ownership."
      },
      {
        name: "Basic Autopilot",
        desc: "Steer, accelerate and brake automatically within your lane. Includes emergency braking, collision warning, and blind-spot monitoring."
      },
      {
        name: "Easy Charging",
        desc: "Charge anywhere there's electricity. Top off with the 110V Mobile Connector or install a 220V Tesla Wall Connector for faster home charging. Gain up to 322 km in 15 minutes on the Supercharger network."
      },
      {
        name: "Sentry Mode",
        desc: "Continuously monitors the environment around the car. Uses external cameras to detect potential threats when left unattended."
      },
      {
        name: "Adaptive Suspension",
        desc: "Reacts to road conditions and driver inputs hundreds of times per second. Automatically adjusts ride height for maximum comfort and range."
      },
      {
        name: "Real Storage",
        desc: "793 liters of cargo space including a front trunk. Rear seats fold flat at the press of a button for maximum flexibility."
      },
      {
        name: "Tesla Mobile App",
        desc: "Remotely control and monitor your Tesla with Phone Key, range & charging status, climate control, GPS location, and more."
      },

      // Additional compare features
      {
        name: "Three Displays",
        desc: "An adjustable 17” main display, plus a second driver display and a third second-row screen. 2200 x 1300 resolution, true colors, and exceptional responsiveness."
      },
      {
        name: "Tri-Zone Climate Controls",
        desc: "Airflow and temperature are controlled entirely through the displays without physical vents. Cabin Overheat Protection keeps interiors cool, and pre-conditioning warms the cabin in cold weather."
      },
      {
        name: "Yoke Steering",
        desc: "No stalks, no shifting. A stalkless steering yoke puts the focus on driving, with Full Self-Driving Visualization front and center."
      },
      {
        name: "22-Speaker Audio",
        desc: "A 22-speaker, 960-watt system offers top-tier sound quality. New microphones enable Active Road Noise Reduction."
      },
      {
        name: "Glass Roof",
        desc: "A new, lightweight glass roof allows more light into the cabin while blocking infrared and UV light, reducing heat and glare even in direct sun."
      }
    ],

    "Model X": [
      // Main feature list
      {
        name: "All-Wheel Drive",
        desc: "Independent front and rear motors for improved performance and traction, with no scheduled maintenance needed for the lifetime of ownership."
      },
      {
        name: "Basic Autopilot",
        desc: "Steer, accelerate and brake automatically within your lane. Includes emergency braking, collision warning, and blind-spot monitoring."
      },
      {
        name: "Easy Charging",
        desc: "Charge anywhere there's electricity. Top off with the 110V Mobile Connector or install a 220V Tesla Wall Connector for faster home charging. Gain up to 322 km in 15 minutes on the Supercharger network."
      },
      {
        name: "Sentry Mode",
        desc: "Continuously monitors the environment around the car. Uses external cameras to detect potential threats when left unattended."
      },
      {
        name: "Adaptive Suspension",
        desc: "Reacts to road conditions and driver inputs hundreds of times per second. Automatically adjusts ride height for maximum comfort and range."
      },
      {
        name: "Real Storage",
        desc: "793 liters of cargo space including a front trunk. Rear seats fold flat at the press of a button for maximum flexibility."
      },
      {
        name: "Tesla Mobile App",
        desc: "Remotely control and monitor your Tesla with Phone Key, range & charging status, climate control, GPS location, and more."
      },

      // Additional compare features
      {
        name: "Panoramic Windshield",
        desc: "A seamless view of the sky above with optimized solar tinting. The largest all-glass panoramic windshield in production."
      },
      {
        name: "Interior Layouts",
        desc: "Offers five, six, and seven-seat configurations for a functional and comfortable cabin experience."
      },
      {
        name: "Three Displays",
        desc: "An adjustable 17” main display, plus a second driver display and a third second-row screen for gaming, movies, and more."
      },
      {
        name: "Game from Anywhere",
        desc: "Play games on the in-car touchscreens via Tesla Arcade. Wireless controller compatibility allows gaming from any seat."
      },
      {
        name: "Tri-Zone Climate Controls",
        desc: "Airflow and temperature are controlled through the displays without physical vents. Cabin Overheat Protection and pre-conditioning keep the interior comfortable year-round."
      },
      {
        name: "Yoke Steering",
        desc: "A stalkless steering yoke for a clean, modern driving experience—no shifting required."
      },
      {
        name: "22-Speaker Audio",
        desc: "A 22-speaker, 960-watt system for the best listening experience, with new microphones enabling Active Road Noise Reduction."
      }
    ]
  };
  // ----------------------------------------

  // Helper to add messages
  const addMessage = (text, sender = "bot") => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  // Re-usable: simulate user input (so button-click & text-based flow use the same logic)
  const simulateUserMessage = (msg) => {
    addMessage(msg, "user");
    processUserInput(msg);
  };

  // Send typed input
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    addMessage(userMsg, "user");
    setInput("");
    processUserInput(userMsg);
  };

  // Core conversation logic (unchanged except for referencing the new `features` above)
  const processUserInput = async (userMsg) => {
    const lowerMsg = userMsg.toLowerCase();

    if (step === "askEmail") {
      setUserEmail(userMsg);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/users/email/${userMsg}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = res.data;
        setUserName(user.firstName);
        addMessage(`Hello ${user.firstName}! How can I help you today?`);
      } catch (error) {
        console.error("Error fetching user by email:", error);
        addMessage("I couldn't find your email, but let's continue anyway!");
      }
      // Go to main menu
      setStep("mainOptions");
      return;
    }

    if (step === "mainOptions") {
      if (lowerMsg.includes("available cars")) {
        setStep("askCarModel");
      } else if (lowerMsg.includes("order status")) {
        addMessage("Fetching your order history...");
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get("http://localhost:8080/api/orders/my-orders/user", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.data || res.data.length === 0) {
            addMessage("You have no orders yet.");
          } else {
            res.data.forEach(order => {
              const status = order.orderStatus || "Unknown";
              const orderedVehicles = order.items?.map(item => `#${item.vehicleId}`).join(", ");
              addMessage(`Order #${order.orderId} [${orderedVehicles}] is currently: ${status}`);
            });
          }
        } catch (err) {
          addMessage("Sorry, I couldn't fetch your orders right now.");
        }
        setStep("mainOptions");
      } else if (lowerMsg.includes("something else")) {
        addMessage("Sure, please describe your issue or question in a few words.");
        setStep("askIssue");
      } else {
        addMessage("Please select an option below.");
      }
      return;
    }

    if (step === "askIssue") {
      addMessage("Thank you! A representative will contact you shortly via your email.");
      setStep("mainOptions");
      return;
    }

    if (step === "askCarModel") {
      if (lowerMsg.includes("model 3")) {
        setSelectedCar("Model 3");
        await fetchCarDetails("Model 3");
      } else if (lowerMsg.includes("model s")) {
        setSelectedCar("Model S");
        await fetchCarDetails("Model S");
      } else if (lowerMsg.includes("model x")) {
        setSelectedCar("Model X");
        await fetchCarDetails("Model X");
      } else {
        addMessage("Please select a valid model.");
      }
      return;
    }

    if (step === "afterCar") {
      if (lowerMsg.includes("feature")) {
        setStep("featureList");
      } else if (lowerMsg.includes("no")) {
        addMessage("Got it! Anything else you need?");
        setStep("mainOptions");
        setSelectedCar(null);
      } else {
        addMessage("Please choose 'Feature' or 'No' if done.");
      }
      return;
    }

    if (step === "featureList") {
      if (lowerMsg.includes("no")) {
        addMessage("Hope this was helpful! Anything else you need?");
        setSelectedCar(null);
        setStep("mainOptions");
      } else {
        const feats = features[selectedCar] || [];
        const found = feats.find(f => lowerMsg === f.name.toLowerCase());
        if (found) {
          addMessage(found.desc);
        } else {
          addMessage("I didn't recognize that feature.");
        }
        addMessage("Want another feature? Pick from below or say 'No'.");
      }
      return;
    }
  };

  // Fetch car details from backend
  const fetchCarDetails = async (modelName) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/vehicles?model=${encodeURIComponent(modelName)}`);
      if (res.data && res.data.length > 0) {
        const car = res.data[0];
        addMessage(`Model: ${car.model}\nPrice: $${car.price}\nPerformance: ${car.topSpeed}\nRange: ${car.range}\nYear: ${car.year}`);
        setStep("afterCar");
      } else {
        addMessage(`I couldn't find any ${modelName} in our database.`);
        setStep("mainOptions");
      }
    } catch (err) {
      console.error("Error fetching car details:", err);
      addMessage("Sorry, I had trouble fetching that car's info.");
      setStep("mainOptions");
    }
  };

  // Toggle open/close
  const toggleChatbot = () => setOpen(prev => !prev);

  // End chat
  const handleEndChat = () => {
    setMessages([{ text: "Chat ended. Thank you for visiting!", sender: "bot" }]);
    // or setOpen(false) if you want to close
  };

  // Menu / UI Renders
  const renderMainOptions = () => {
    if (step !== "mainOptions") return null;
    return (
      <div className="options-container">
        <button className="fun-button" onClick={() => simulateUserMessage("Available Cars")}>
          🚗 Available Cars
        </button>
        <button className="fun-button" onClick={() => simulateUserMessage("Order Status")}>
          📦 Order Status
        </button>
        <button className="fun-button" onClick={() => simulateUserMessage("Something else")}>
          ❓ Something else
        </button>
      </div>
    );
  };

  const renderCarModelOptions = () => {
    if (step !== "askCarModel") return null;
    return (
      <div className="options-container">
        <button className="fun-button" onClick={() => simulateUserMessage("Model 3")}>
          🚘 Model 3
        </button>
        <button className="fun-button" onClick={() => simulateUserMessage("Model S")}>
          🚀 Model S
        </button>
        <button className="fun-button" onClick={() => simulateUserMessage("Model X")}>
          🛩 Model X
        </button>
      </div>
    );
  };

  const renderFeaturePrompt = () => {
    if (step !== "afterCar") return null;
    return (
      <div className="options-container">
        <button className="fun-button" onClick={() => simulateUserMessage("Feature")}>
          🔎 Feature
        </button>
        <button className="fun-button" onClick={() => simulateUserMessage("No")}>
          ❌ No
        </button>
      </div>
    );
  };

  const renderFeatureOptions = () => {
    if (step !== "featureList" || !selectedCar) return null;
    const feats = features[selectedCar] || [];
    if (feats.length === 0) return null;

    return (
      <div className="options-container">
        {feats.map((f, idx) => (
          <button
            key={idx}
            className="fun-button"
            onClick={() => simulateUserMessage(f.name)}
          >
            {f.name}
          </button>
        ))}
        <button className="fun-button" onClick={() => simulateUserMessage("No")}>
          No (Done)
        </button>
      </div>
    );
  };

  return (
    <>
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-nit4h0k25e2SUr2iqW-DppyUXRPXijjpQ&s"
          alt="Chat"
        />
      </button>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
            <div>
              <button className="end-chat-button" onClick={handleEndChat}>
                End Chat
              </button>
              <button className="chatbot-close-button" onClick={toggleChatbot}>
                ×
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => {
              const isBot = msg.sender === "bot";
              return (
                <div key={idx} className={`message-row ${isBot ? "bot" : "user"}`}>
                  <div className="avatar">
                    <img
                      src={isBot ? BOT_AVATAR : USER_AVATAR}
                      alt={isBot ? "Bot" : "User"}
                    />
                  </div>
                  <div className="message-bubble">
                    {msg.text.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Conditionally render UI elements */}
            {renderMainOptions()}
            {renderCarModelOptions()}
            {renderFeaturePrompt()}
            {renderFeatureOptions()}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;