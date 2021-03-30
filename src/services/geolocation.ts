const geolocationAPI = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const api = {
    getCurrentCoords() {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      );
    },
  };
  return api;
};

export default geolocationAPI();
