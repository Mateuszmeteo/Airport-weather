import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeteoApp = () => {
  const [metarData, setMetarData] = useState(null);
  const [tafData, setTafData] = useState(null);
  const [airportCode, setAirportCode] = useState('EPWA');

  const handleInputChange = event => {
    setAirportCode(event.target.value);
  };

  useEffect(() => {
    const apiKey = '012085f5358b416c835ab51945';

    // Pobieranie danych METAR
    axios.get(`https://api.checkwx.com/metar/${airportCode}?x-api-key=${apiKey}`)
      .then(response => {
        setMetarData(response.data.data[0]);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych METAR:', error);
      });

    // Pobieranie danych TAF
    axios.get(`https://api.checkwx.com/taf/${airportCode}?x-api-key=${apiKey}`)
      .then(response => {
        setTafData(response.data.data[0]);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych TAF:', error);
      });
  }, [airportCode]);

  return (
    <div>
      <h1>Weather App</h1>
      <label htmlFor="airportCode">Kod lotniska: </label>
      <input
        type="text"
        id="airportCode"
        value={airportCode}
        onChange={handleInputChange}
      />
      {/* Wyświetlanie danych METAR */}
      {metarData && (
        <div>
          <h2>Dane METAR dla lotniska {airportCode}:</h2>
          <pre>{metarData}</pre>
        </div>
      )}
      {/* Wyświetlanie danych TAF */}
      {tafData && (
        <div>
          <h2>Dane TAF dla lotniska {airportCode}:</h2>
          <pre>{tafData}</pre>
        </div>
      )}
      {/* Wyświetlanie danych METAR */}
{metarData && (
  <div>
    <h2>Dane METAR dla lotniska {airportCode}:</h2>
    <pre>{metarData}</pre>
    {/* Odczytanie innych pól METAR i wyświetlenie ich */}
    <p>Temperatura: {metarData.temperature}</p>
    <p>Wiatr: {metarData.wind}</p>
    {/* Dodaj więcej informacji według potrzeb */}
  </div>
)}

{/* Wyświetlanie danych TAF */}
{tafData && (
  <div>
    <h2>Dane TAF dla lotniska {airportCode}:</h2>
    <pre>{tafData.raw_text}</pre>
    {/* Odczytanie innych pól TAF i wyświetlenie ich */}
    <p>Trend: {tafData.forecast}</p>
    <p>Warunki widzialności: {tafData.visibility}</p>
    {/* Dodaj więcej informacji według potrzeb */}
  </div>
)}
    </div>

  );
};

export default MeteoApp;
