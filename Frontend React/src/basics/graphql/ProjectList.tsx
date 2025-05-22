import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from './projectData';

const ProjectList = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return <p>Loading Projects....</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<div>
				<h2>ProjectList </h2>
			</div>
			<ul>
				{data &&
					data?.projects?.map((project) => (
						<li key={project.id}>{project.name}</li>
					))}
			</ul>
		</>
	);
};

export default ProjectList;
