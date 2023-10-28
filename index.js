mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-118.243683, 34.052235],
  zoom: 9,
});

function metros() {
  let data = fetch("https://api.metro.net/LACMTA/vehicle_positions/all")
    .then((response) => {
      let first = response.json();
      return first;
    })
    .then((metros) => {
      metros.forEach((element) => {
        new mapboxgl.Marker({ color: "red" })
          .setLngLat([element.position.longitude, element.position.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(element.vehicle.vehicle_id))
          .addTo(map);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
metros();

setInterval(() => {
  return metros();
}, 10000);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");
