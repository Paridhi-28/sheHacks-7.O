import { Icon } from "leaflet";

export default function IconMaker(IconName) {
  return new Icon({
    iconUrl: `/Icon_Images/${IconName}.svg`,
    iconRetinaUrl: `/Icon_Images/${IconName}.svg`,
    iconSize: new L.Point(20, 20),
    className: `${IconName}-icon`,
  });
}
