import { Country } from "./Country";

export default function List({ list, filter, onShow }) {
	if (!list) return;

	if (filter.length === 0)
		return (
			<div>
				{list.map((country) => (
					<div key={country.name.common}>{country.name.common}</div>
				))}
			</div>
		);

	const filtered = list.filter((country) =>
		country.name.common.toLowerCase().includes(filter.toLowerCase())
	);
	return (
		<div>
			{filtered.length > 10 ? (
				<div>Too many matches, specify another filter</div>
			) : (
				filtered.map((country) => (
					<div key={country.name.common}>
						{country.name.common}{" "}
						<button onClick={() => onShow(country)}>show</button>
					</div>
				))
			)}
			{filtered.length === 1 ? <Country country={filtered[0]} /> : null}
		</div>
	);
}
