import axios from "axios";
import { useState, useEffect } from "react";

const Images = [
  { image: require("../Image/HM_Parking.png") },
  { image: require("../Image/CE_Parking.png") },
  { image: require("../Image/ECC_Parking.png") },
  { image: require("../Image/Bank_Parking.png") },
];

// axios.get('https://localhost:5001/pins/')
//   .then(response => {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(error => {
//     // handle error
//     console.log(error);
//   });

export function fetchtest() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:5001/pins"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    console.log(data);
  }, []);
}



export const markers = [
  {
    id: 1,
    coordinate: {
      latitude: 13.727285,
      longitude: 100.775076,
    },
    title: "HM Parking",
    description: "Available",
    image: Images[0].image,
  },
  {
    id: 2,
    coordinate: {
      latitude: 13.727268,
      longitude: 100.776149,
    },
    title: "A Parking",
    description: "Available",
    image: Images[1].image,
  },
  {
    id: 3,
    coordinate: {
      latitude: 13.72916,
      longitude: 100.776006,
    },
    title: "ECC Parking",
    description: "X Available",
    image: Images[2].image,
  },
  {
    id: 4,
    coordinate: {
      latitude: 13.72864,
      longitude: 100.77685,
    },
    title: "Bank Parking",
    description: "Full",
    image: Images[3].image,
  },
];

export const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

export const mapStandardStyle = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
