import { PolandXml } from "./PolansXml";
import { formatDateNaslov, formatTime } from "./globalFunctions";

export const createXml = (data, values) => {
    const {
      paxNbr,
      arrTime,
      depTime,
      captain,
      copilot,
      stw,
      date,
      ac,
      destIcao,
      originIcao,
      operator
    } = values;

    const today = formatDateNaslov(new Date());
    const time = formatTime(new Date());

    let callS = ac.callsign;

    const dataFlt = {
      originApt: data !== undefined ? data[0] : "",
      destApt: data !== undefined ? data[1] : "",
      fltData: {
        startDate: date,
        origin: originIcao,
        destination: destIcao,
        captain: captain,
        copilot: copilot,
        stw: stw,
        arrTime: arrTime,
        depTime: depTime,
      },
      pax: values.pax,
      callsign: callS,
      operator:operator,
      etd: time,
      paxNbr: paxNbr,
    };

    const xmltext = PolandXml(dataFlt);
    const filename =
      "PAX_"+operator.iata+"_" + callS + "_" + "codeName" + "_" + today + "_" + time + ".xml";
    const pom = document.createElement("a");
    const bb = new Blob([xmltext], { type: "text/plain" });

    pom.setAttribute("href", window.URL.createObjectURL(bb));
    pom.setAttribute("download", filename);

    pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(":");

    pom.click();
  };