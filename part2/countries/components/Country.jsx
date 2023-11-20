import axios from "axios";
import { useEffect, useState } from "react";

export const Country = ({ country }) => {
	const [weather, setWeather] = useState({});

	const params = {
		appid: import.meta.env.VITE_SOME_KEY,
		q: country.capital[0],
		units: "metric",
	};

	useEffect(() => {
		axios
			.get("https://api.openweathermap.org/data/2.5/weather?", { params })
			.then((response) => {
				setWeather(response.data);
			})
			.catch((error) => {
				console.log(error);
				setWeather({});
			});
	});

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>
			<h2>languages</h2>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt={`flag of ${country.name.common}`}
			/>

			{weather.main && (
				<div>
					<h2>Weather in {country.capital}</h2>
					<div>temperature {weather.main.temp} Celsius</div>
					<img
						src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt={weather.weather[0].description}
					/>
					<div>wind {weather.wind.speed} m/s</div>
				</div>
			)}
		</div>
	);
};
