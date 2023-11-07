import { useState } from "react";

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);
const Statistics = ({ good, neutral, bad }) => {
	if (good === 0 && neutral === 0 && bad === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<div>
			<h1>Statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="Good" value={good} />
					<StatisticLine text="Neutral" value={neutral} />
					<StatisticLine text="Bad" value={bad} />
					<StatisticLine
						text="Total Feedback"
						value={good + neutral + bad}
					/>
					<StatisticLine
						text="Average"
						value={(good - bad) / (good + neutral + bad)}
					/>
					<StatisticLine
						text="Positive"
						value={(good / (good + neutral + bad)) * 100 + "%"}
					/>
				</tbody>
			</table>
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>Provide Your Feedback</h1>
			<Button name="good" onClick={() => setGood(good + 1)} />
			<Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
			<Button name="bad" onClick={() => setBad(bad + 1)} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
