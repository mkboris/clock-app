import styled from "styled-components";
import { getDayOfYear, getWeek } from "date-fns";
import Loader from "./Loader";

const StyledDateTimeInfo = styled.section`
  backdrop-filter: blur(20.3871px);
  background: ${({ timeOfDay }) =>
    timeOfDay === "day" ? "rgba(255, 255, 255, 0.75)" : "rgba(0, 0, 0, 0.75)"};
`;

const Container = styled.div`
  max-width: 68.75rem;
  margin: 0 auto;
  padding-inline: 1.625rem;
  padding-block: 3rem;
  display: grid;
  gap: 1rem;

  @media (min-width: 26.875rem) {
    gap: 3.125rem;
  }

  @media (min-width: 37.5rem) {
    padding-block: 6.125rem;
    grid-template-columns: 1fr 1fr;
    padding-inline: 4rem;
  }

  @media (min-width: 51.875rem) {
    padding-block: 4.625rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  @media (min-width: 26.875rem) {
    gap: 3rem;
  }

  @media (min-width: 51.875rem) {
    gap: 2.625rem;
    padding-right: 5.875rem;

    &::after {
      position: absolute;
      right: 0;
      content: "";
      display: block;
      width: 1px;
      height: 100%;
      background: ${({ timeOfDay }) =>
        timeOfDay === "day" ? "var(--clr-dark-gray)" : "var(--clr-white)"};
      mix-blend-mode: normal;
      opacity: 0.25;
    }
  }
`;

const InfoContainer2 = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 26.875rem) {
    gap: 3rem;
  }

  @media (min-width: 51.875rem) {
    padding-left: 3rem;
    gap: 2.625rem;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;

  @media (min-width: 37.5rem) {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
  }
`;

const InfoProperty = styled.p`
  font-weight: var(--fw-regular);
  font-size: var(--fs-xxs);
  line-height: 2.8;
  letter-spacing: var(--ls-smd);
  text-transform: uppercase;
  color: ${({ timeOfDay }) =>
    timeOfDay === "day" ? "var(--clr-dark-gray)" : "var(--clr-white)"};
  white-space: nowrap;

  @media (min-width: 26.875rem) {
    line-height: 1.8;
    letter-spacing: var(--ls-md);
  }
`;

const InfoValue = styled.p`
  font-weight: var(--fw-bold);
  font-size: var(--fs-xxl);
  text-align: right;
  white-space: pre-wrap;
  color: ${({ timeOfDay }) =>
    timeOfDay === "day" ? "var(--clr-dark-gray)" : "var(--clr-white)"};

  @media (min-width: 26.875rem) {
    text-align: left;
  }
`;

const InfoErr = styled.p`
  font-weight: var(--fw-bold);
  font-size: var(--fs-lg);
  white-space: pre-wrap;
  color: ${({ timeOfDay }) =>
    timeOfDay === "day" ? "var(--clr-dark-gray)" : "var(--clr-white)"};
`;

function DateTimeInfo({ timeData, timeLoading, timeError }) {
  const date = timeData ? new Date(timeData.timestamp * 1000) : null;
  const currentHour = date ? date.getHours() : 12;
  const timeOfDay = currentHour >= 6 && currentHour < 18 ? "day" : "night";

  return (
    <StyledDateTimeInfo $timeofday={timeOfDay}>
      <Container>
        <InfoContainer $timeofday={timeOfDay}>
          <InfoGroup>
            <InfoProperty $timeofday={timeOfDay}>Current timezone</InfoProperty>
            {timeLoading ? (
              <Loader />
            ) : timeError || !timeData ? (
              <InfoErr>Error fetching data</InfoErr>
            ) : (
              <InfoValue $timeofday={timeOfDay}>{timeData.zoneName}</InfoValue>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoProperty $timeofday={timeOfDay}>Day of the year</InfoProperty>
            {date ? (
              <InfoValue $timeofday={timeOfDay}>{getDayOfYear(date)}</InfoValue>
            ) : (
              <InfoErr>Error fetching data</InfoErr>
            )}
          </InfoGroup>
        </InfoContainer>

        <InfoContainer2>
          <InfoGroup>
            <InfoProperty $timeofday={timeOfDay}>Day of the week</InfoProperty>
            {date ? (
              <InfoValue $timeofday={timeOfDay}>{date.getDay()}</InfoValue>
            ) : (
              <InfoErr>Error fetching data</InfoErr>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoProperty $timeofday={timeOfDay}>Week number</InfoProperty>
            {date ? (
              <InfoValue $timeofday={timeOfDay}>{getWeek(date)}</InfoValue>
            ) : (
              <InfoErr>Error fetching data</InfoErr>
            )}
          </InfoGroup>
        </InfoContainer2>
      </Container>
    </StyledDateTimeInfo>
  );
}

export default DateTimeInfo;
