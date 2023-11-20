export default function Persons({ persons, filter, onRemove }) {
	return (
		<div>
			{filter.length === 0
				? persons.map((person) => (
						<div key={person.name}>
							{person.name} {person.number}{" "}
							<button onClick={() => onRemove(person.id)}>
								delete
							</button>
						</div>
				  ))
				: persons.map((person) => {
						if (
							person.name
								.toLowerCase()
								.includes(filter.toLowerCase())
						) {
							return (
								<div key={person.name}>
									{person.name} {person.number}{" "}
									<button onClick={() => onRemove(person.id)}>
										delete
									</button>
								</div>
							);
						}
				  })}
		</div>
	);
}
