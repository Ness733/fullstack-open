import { useState, useEffect } from "react";

import Find from "../components/Find";
import List from "../components/List";
import countriesService from "../services/countries";

function App() {
	const [filter, setFilter] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		countriesService.getAll().then((response) => {
			setCountries(response.data);
		});
	}, []);

	const handleFilter = (event) => {
		let filter = event.target.value;
		setFilter(filter);
	};

	const handleOnShow = (event) => {
		countriesService.getOne(event.name.common).then((response) => {
			setCountries([response.data]);
		});
	};

	return (
		<>
			<Find handleFilter={handleFilter} value={filter} />
			<List filter={filter} list={countries} onShow={handleOnShow} />
		</>
	);
}

export default App;
