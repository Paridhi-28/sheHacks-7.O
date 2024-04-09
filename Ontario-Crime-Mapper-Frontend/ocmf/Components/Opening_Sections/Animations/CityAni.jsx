"use client"
import Lottie from "react-lottie";
import CityA from "./CityA.json";

export default function CityAni(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CityA,
  };

  return (
    <Lottie
      isClickToPauseDisabled={true}
      options={defaultOptions}
    />
  );
}
