import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";

import GlobalStyles from "./styles/GlobalStyles";
import Quote from "./components/Quote";
import ClockDisplay from "./components/ClockDisplay";
import DateTimeInfo from "./components/DateTimeInfo";

import bgDayMobile from "./assets/mobile/bg-image-daytime.jpg";
import bgDayTablet from "./assets/tablet/bg-image-daytime.jpg";
import bgDayDesktop from "./assets/desktop/bg-image-daytime.jpg";
import bgNightMobile from "./assets/mobile/bg-image-nighttime.jpg";
import bgNightTablet from "./assets/tablet/bg-image-nighttime.jpg";
import bgNightDesktop from "./assets/desktop/bg-image-nighttime.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14rem;
  padding-inline: 1.625rem;
  padding-block-start: ${(props) => (props.$showexpanded ? "5rem" : "2rem")};
  padding-block-end: 2.5rem;
  max-width: 68.75rem;
  margin: 0 auto;

  @media (min-width: 37.5rem) {
    padding-inline: 4rem;
    padding-block-start: ${(props) => (props.$showexpanded ? "9rem" : "5rem")};
    padding-block-end: 64px;
  }

  @media (min-width: 51.875rem) {
    gap: 14.5625rem;
    padding-block-start: 3.375rem;
    padding-block-end: 6.125rem;
  }
`;

const TIMEZONE_API_KEY = import.meta.env.VITE_TIMEZONE_DB_API_KEY;

async function fetchTime(zone) {
  try {
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=zone&zone=${zone}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching time data:", error);
    throw new Error("Failed to fetch time data");
  }
}

async function fetchLocation() {
  try {
    const { data } = await axios.get("https://ipapi.co/json/");
    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw new Error("Failed to fetch location data");
  }
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

async function fetchWeather({ queryKey }) {
  try {
    const [, city] = queryKey;
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}

function App() {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [showQuote, setShowQuote] = useState(true);
  const [showExpanded, setShowExpanded] = useState(false);
  const [userZone, setUserZone] = useState(null);

  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationError,
  } = useQuery({
    queryKey: ["location"],
    queryFn: fetchLocation,
  });

  const weatherQueryKey = locationData
    ? ["weather", locationData.city]
    : ["weather", "default"];

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery({
    queryKey: weatherQueryKey,
    queryFn: fetchWeather,
    enabled: weatherQueryKey[1] !== "default",
  });

  const timeQueryKey = userZone ? ["currentTime", userZone] : ["currentTime"];

  const {
    data: timeData,
    isLoading: timeLoading,
    error: timeError,
  } = useQuery({
    queryKey: timeQueryKey,
    queryFn: () => fetchTime(userZone),
    enabled: !!userZone,
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (locationData?.timezone) {
      setUserZone(locationData.timezone);
    }
  }, [locationData]);

  useEffect(() => {
    if (timeData?.formatted) {
      const hour = new Date(timeData.formatted).getHours();
      setTimeOfDay(hour >= 5 && hour < 18 ? "day" : "night");
    }
  }, [timeData]);

  function toggleExpanded() {
    setShowExpanded((prev) => !prev);
  }

  function toggleQuote() {
    setShowQuote((prev) => !prev);
  }

  const getBackgrounds = () => {
    switch (timeOfDay) {
      case "day":
        return {
          mobile: bgDayMobile,
          tablet: bgDayTablet,
          desktop: bgDayDesktop,
        };
      case "night":
        return {
          mobile: bgNightMobile,
          tablet: bgNightTablet,
          desktop: bgNightDesktop,
        };
      default:
        return {
          mobile: bgDayMobile,
          tablet: bgDayTablet,
          desktop: bgDayDesktop,
        };
    }
  };

  const { mobile, tablet, desktop } = getBackgrounds();

  return (
    <>
      <GlobalStyles bgMobile={mobile} bgTablet={tablet} bgDesktop={desktop} />
      <main>
        <Container $showexpanded={showExpanded}>
          {showQuote && <Quote />}
          <ClockDisplay
            onToggleExpanded={toggleExpanded}
            onToggleQuote={toggleQuote}
            timeData={timeData}
            timeLoading={timeLoading}
            timeError={timeError}
            locationData={locationData}
            locationLoading={locationLoading}
            locationError={locationError}
            weatherData={weatherData}
            weatherLoading={weatherLoading}
            weatherError={weatherError}
          />
        </Container>

        {showExpanded && (
          <DateTimeInfo
            timeData={timeData}
            timeLoading={timeLoading}
            timeError={timeError}
          />
        )}
      </main>
    </>
  );
}

export default App;
