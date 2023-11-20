export default function PersonForm({
	name,
	number,
	nameChange,
	numberChange,
	handleClick,
}) {
	return (
		<form onSubmit={handleClick}>
			<div>
				name: <input value={name} onChange={nameChange} />
			</div>
			<div>
				number: <input value={number} onChange={numberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}
