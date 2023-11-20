import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notificacion";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personsService.getAll().then((response) => {
			setPersons(response.data);
		});
	}, []);

	const handleClick = (event) => {
		event.preventDefault();
		let newPerson = { name: newName, number: newNumber };
		if (persons.find((person) => person.name === newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				personsService
					.update(
						persons.find((person) => person.name === newName).id,
						newPerson
					)
					.then((response) => {
						setPersons(
							persons.map((person) =>
								person.id !== response.data.id
									? person
									: response.data
							)
						);
						setSuccessMessage(
							`Updated ${newName} with new number: ${newNumber}`
						);
						setTimeout(() => {
							setSuccessMessage(null);
						}, 5000);
					})
					.catch(() => {
						setErrorMessage(
							`Information of ${newName} has already been removed from server`
						);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
					});
			}

			return;
		}
		personsService.create(newPerson).then((response) => {
			setPersons(persons.concat(response.data));
		});
		setSuccessMessage(`Added ${newName}`);
		setTimeout(() => {
			setSuccessMessage(null);
		}, 5000);

		setNewName("");

		setNewNumber("");
	};

	const handleOnChange = (event) => {
		let tempName = event.target.value;

		setNewName(tempName);
	};

	const handleOnChangeNumber = (event) => {
		let tempNum = event.target.value;
		setNewNumber(tempNum);
	};

	const handleOnChangeFilter = (event) => {
		let tempFilter = event.target.value;
		setFilter(tempFilter);
	};

	const handleOnRemove = (event) => {
		let person = persons.find((person) => person.id === event);
		if (window.confirm(`Delete ${person.name} ?`)) {
			personsService.remove(event);
			setPersons(persons.filter((person) => person.id !== event));
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>

			<Notification message={successMessage} type={"success"} />
			<Notification message={errorMessage} type={"error"} />

			<Filter onChangeFilter={handleOnChangeFilter} />

			<h1>Add a new</h1>

			<PersonForm
				name={newName}
				number={newNumber}
				handleClick={handleClick}
				nameChange={handleOnChange}
				numberChange={handleOnChangeNumber}
			/>

			<h1>Numbers</h1>

			<Persons
				persons={persons}
				filter={filter}
				onRemove={handleOnRemove}
			/>
		</div>
	);
};

export default App;
