enum RoleTypes {
	admin = 'admin',
	editor = 'editor',
	viewer = 'viewer',
}

// type Role = RoleTypes;

const roleColor: Record<RoleTypes, string> = {
	admin: 'red',
	editor: 'blue',
	viewer: 'green',
};

type Payments = {
	amount: number;
	status: string;
};

function UserBadge({ role }: { role: Role }) {
	return <span style={{ color: roleColor[role] }}>{role}</span>;
}

type UnknownKeyValue = {
	[key: string]: string | boolean | number;
};

const unknwonRecordTypes: Record<string, string | boolean | number | Payments> =
	{
		name: 'Morgan',
		age: 25,
		middleName: 'Doe',
		email: 'johndoe1243@gmail.com',
		isActive: true,
		payments: {
			amount: 121,
			status: 'paid',
		},
	};
