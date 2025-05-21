import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
	query GetProjects {
		projects {
			id
			name
			users {
				id
				firstName
				lastName
			}
		}
	}
`;
