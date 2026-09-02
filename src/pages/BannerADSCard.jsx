import React from "react";
// Sobe uma pasta (..) e entra na pasta images:
import bannerPapayaImg from "../images/BannerPapaya.png";
import './BannerADSCard.css'; 

export default function BannerADSCard() {
  return (
    <div className="banner-top">
      <img width="1020" height= "auto" justify-align-center src={bannerPapayaImg} alt="Banner Papaya" />
    </div>
  );
}