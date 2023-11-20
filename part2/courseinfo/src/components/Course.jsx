const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>;

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</>
);

const Course = ({ course }) => {
	return (
		<>
			<h1>Web development curriculum</h1>
			{course.map((course) => (
				<div key={course.id}>
					<Header course={course.name} />
					<Content parts={course.parts} />
					<Total
						sum={course.parts
							.map((part) => part.exercises)
							.reduce((a, b) => a + b)}
					/>
				</div>
			))}
		</>
	);
};

export default Course;
