import styled from "styled-components";
import { format } from "date-fns";

import Button from "./Button";
import Loader from "./Loader";
import moon from "../assets/shared/icon-moon.svg";
import sun from "../assets/shared/icon-sun.svg";

const StyledClockDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;

  @media (min-width: 26.875rem) {
    gap: clamp(5rem, 10vw, 24rem);
  }

  @media (min-width: 51.875rem) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GreetingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const GreetingText = styled.p`
  font-weight: var(--fw-regular);
  font-size: var(--fs-md);
  line-height: 1.6;
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
  color: var(--clr-white);

  @media (min-width: 26.875rem) {
    letter-spacing: var(--ls-lg);
  }
`;

const GreetingSpan = styled.span`
  display: none;

  @media (min-width: 26.875rem) {
    display: inline;
  }
`;

const Time = styled.h1`
  color: var(--clr-white);
`;

const CurrentTime = styled.time`
  font-weight: var(--fw-bold);
  font-size: var(--fs-xxxl);
  letter-spacing: var(--ls-xs);

  @media (min-width: 26.875rem) {
    letter-spacing: var(--ls-sm);
  }
`;

const TimeZone = styled.span`
  font-weight: var(--fw-light);
  font-size: var(--fs-xl);
  text-transform: uppercase;
`;

const Location = styled.p`
  font-weight: var(--fw-bold);
  font-size: var(--fs-lg);
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
  color: var(--clr-white);

  @media (min-width: 26.875rem) {
    letter-spacing: var(--ls-xl);
  }
`;

const Weather = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WeatherText = styled.span`
  font-weight: var(--fw-bold);
  font-size: var(--fs-lg);
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
  color: var(--clr-white);
`;

function ClockDisplay({
  onToggleExpanded,
  onToggleQuote,
  timeData,
  timeLoading,
  timeError,
  locationData,
  locationLoading,
  locationError,
  weatherData,
  weatherLoading,
  weatherError,
}) {
  const formattedTime = timeData?.formatted
    ? new Date(timeData.formatted)
    : null;

  const formattedTimeString = formattedTime
    ? format(formattedTime, "HH:mm")
    : "";

  const greeting =
    formattedTime?.getHours() >= 5 && formattedTime?.getHours() < 12
      ? "Good Morning"
      : formattedTime?.getHours() >= 12 && formattedTime?.getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <StyledClockDisplay>
      <ClockContainer>
        <GreetingContainer>
          <img
            src={
              formattedTime?.getHours() >= 5 && formattedTime?.getHours() < 18
                ? sun
                : moon
            }
            alt="Time of Day Icon"
          />
          <GreetingText>
            {greeting}
            <GreetingSpan>, it&apos;s currently</GreetingSpan>
          </GreetingText>
        </GreetingContainer>

        <Time>
          {timeLoading ? (
            <Loader />
          ) : timeError ? (
            "Error fetching time"
          ) : (
            <>
              <CurrentTime dateTime={timeData?.formatted}>
                {formattedTimeString}
              </CurrentTime>
              <TimeZone> {timeData?.abbreviation}</TimeZone>
            </>
          )}
        </Time>

        <Location>
          {locationLoading ? (
            <Loader />
          ) : locationError || !locationData ? (
            "Location unavailable"
          ) : (
            `in ${locationData.city}, ${locationData.country_name}`
          )}
        </Location>

        {weatherLoading ? (
          <Loader />
        ) : weatherError ? (
          <WeatherText>Weather unavailable</WeatherText>
        ) : (
          <Weather>
            {weatherData && (
              <>
                <img
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                />
                <WeatherText>
                  {weatherData.current.temp_c}°C,{" "}
                  {weatherData.current.condition.text}
                </WeatherText>
              </>
            )}
          </Weather>
        )}
      </ClockContainer>

      <Button
        onToggleExpanded={onToggleExpanded}
        onToggleQuote={onToggleQuote}
      />
    </StyledClockDisplay>
  );
}

export default ClockDisplay;
