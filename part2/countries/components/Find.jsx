export default function Find({ value, handleFilter }) {
	return (
		<div>
			find countries <input value={value} onChange={handleFilter} />
		</div>
	);
}
