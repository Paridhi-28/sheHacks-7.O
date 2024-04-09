import { useState, useEffect } from "react";
import "../../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import IconMaker from "./Icon/Icons";
import { Box } from "@chakra-ui/react";

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

function StatusIcon(status) {

  if (status.toLowerCase().includes("missing")) {
    return IconMaker("Person_Missing");
  } else if (status.toLowerCase().includes("collision")) {
    return IconMaker("Collision");
  } else if (status.toLowerCase().includes("carjacking")) {
    return IconMaker("Car_Jacking");
  } else if (status.toLowerCase().includes("crowd control")) {
    return IconMaker("Crowd_Control");
  } else if (status.toLowerCase().includes("media advisory")) {
    return IconMaker("Media_Advisory");
  } else if (status.toLowerCase().includes("elopee")) {
    return IconMaker("Elopee");
  } else if (status.toLowerCase().includes("fire")) {
    return IconMaker("Fire");
  } else if (status.toLowerCase().includes("firearm discharge")) {
    return IconMaker("Firearm_Discharge");
  } else if (status.toLowerCase().includes("hazard")) {
    return IconMaker("Hazard");
  } else if (status.toLowerCase().includes("industrial accident")) {
    return IconMaker("Industrial_Accident");
  } else if (status.toLowerCase().includes("person with a gun")) {
    return IconMaker("Person_With_A_Gun");
  } else if (status.toLowerCase().includes("road closures")) {
    return IconMaker("Road_Closures");
  } else if (status.toLowerCase().includes("shooting")) {
    return IconMaker("Shooting");
  } else if (status.toLowerCase().includes("sound of gunshot")) {
    return IconMaker("Sound_Of_GunShot");
  } else if (status.toLowerCase().includes("sudden death")) {
    return IconMaker("Sudden_Death");
  } else if (status.toLowerCase().includes("suspicious incident")) {
    return IconMaker("Suspicious_Incident");
  } else if (status.toLowerCase().includes("unknown trouble")) {
    return IconMaker("Unknown_Trouble");
  } else if (status.toLowerCase().includes("update")) {
    return IconMaker("Update");
  } else {
    return IconMaker("Unknown");
  }
}

// https://stackblitz.com/@kboul
export default function Map(tweets) {
  const [geoData, setGeoData] = useState({ lat: 43.6532, lng: -79.3832 });

  const center = [geoData.lat, geoData.lng];

  return (
    <>
      <Box>
        <MapContainer
          center={center}
          zoom={4}
          style={{ height: "60vh", width: "100%", zIndex: "0" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {tweets.props.map((value, key) => {
            if (value.LocationGoeCode.length != 0) {
              return (
                <Marker
                  position={[
                    value.LocationGoeCode[0],
                    value.LocationGoeCode[1],
                  ]}
                  icon={StatusIcon(value.Status)}
                  key={key}
                >
                  <Popup>
                    <b>Situation:</b> {value.Status}
                    {value.Name && (
                      <>
                        <br />
                        <b>Name: </b> {value.Name}
                      </>
                    )}
                    {value.Age && (
                      <>
                        <br />
                        <b>Age: </b> {value.Age}
                      </>
                    )}
                    <br />
                    <b>Tweeted Time:</b> {value.TweetedTime}
                    <br />
                    <b>Description: </b>
                    {value.Description}
                    {value.ImageUrl && value.ImageUrl != "No Image" && (
                      <>
                        <br />
                        <b>Image: </b> <br />
                        <img
                          style={{
                            width: "20em",
                            height: "20em",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            margin: "0",
                          }}
                          src={value.ImageUrl}
                          alt="Person Image"
                        />
                      </>
                    )}
                  </Popup>
                </Marker>
              );
            }
          })}
          <ChangeView coords={center} />
        </MapContainer>
      </Box>
    </>
  );
}
