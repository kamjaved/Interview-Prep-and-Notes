export interface ProjectData {
	id: string;
	name: string;
	users: UserData[];
}
export interface UserData {
	id: string;
	firstName: string;
	lastName: string;
	projects?: ProjectData;
}
