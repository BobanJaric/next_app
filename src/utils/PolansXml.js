import { formatDate } from "./globalFunctions";

const createPax = (data, origin, dest, nbr) => {
  const [firstName = "", lastName = ""] = data?.name?.split(" ") || [];

  return `<Pax>
        <FirstName>${firstName}</FirstName>
        <SecondName></SecondName>
        <LastName>${lastName}</LastName>
        <Sex>${data?.gender}</Sex>
        <BirthDate>${data?.dob}</BirthDate>
        <BagCount>1</BagCount>
        <Bags />
        <Poe>${origin}</Poe>
        <Pod>${dest}</Pod>
        <Poc></Poc>
        <Nationality>${data?.nationality}</Nationality>
        <BookingRef></BookingRef>
        <UniquePassengerRef></UniquePassengerRef>
        <Seat>${3 + nbr}</Seat>
        <DocType>P</DocType>
        <DocNo>${data?.passport}</DocNo>
        <DocExpire>${data?.doe}</DocExpire>
        <DocIssueCountry>${data?.nationality}</DocIssueCountry>
        <DocIssue>${data?.doi}</DocIssue>
    </Pax>`;
};

export const PolandXml = (data) => {
  const { pax, callsign, destApt, originApt, fltData, paxNbr, operator } = data;
  const { startDate, depTime, arrTime } = fltData;

  const xmlHeader = `<Paxlst xmlns="http://pnr.strazgraniczna.pl/custom/portal/pax">`;
  const xmlFooter = `</Paxlst>`;

  const xmlSender = `
    <Flight>
        <Carrier>${operator?.iata}</Carrier>
        <FlightNo>${callsign}</FlightNo>
        <DepAirport>${originApt?.icao}</DepAirport>
        <ArrAirport>${destApt?.icao}</ArrAirport>
        <Std>${formatDate(startDate)}T${depTime}:00</Std>
        <Sta>${formatDate(startDate)}T${arrTime}:00</Sta>
    </Flight>
    <Sender>${operator?.iata}</Sender>`;

  const count = Math.min(parseInt(paxNbr, 10) || 1, pax.length);

  const paxDetails = pax
    .slice(0, count)
    .map((paxItem, index) =>
      createPax(paxItem, originApt?.icao, destApt?.icao, index + 1)
    )
    .join("");

  return xmlHeader + xmlSender + paxDetails + xmlFooter;
};