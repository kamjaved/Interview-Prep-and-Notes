Lets break down the authentication and authorization implementation in NestJS step by step, including both the current JWT authentication and how to add role-based authorization.

### 1. JWT Authentication Implementation

#### Step 1: Install Required Packages

```bash
npm install @nestjs/jwt jsonwebtoken @types/jsonwebtoken
```

#### Step 2: Create Auth Guard

First, create the authentication guard (auth.guard.ts):

```typescript
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// Convert HTTP context to GraphQL context
		const ctx = GqlExecutionContext.create(context).getContext();

		// Check if Authorization header exists
		if (!ctx.headers.authorization) {
			throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
		}

		// Validate token and set user in context
		ctx.user = await this.validateToken(ctx.headers.authorization);
		return true;
	}

	private async validateToken(auth: string) {
		if (auth.split(' ')[0] !== 'Bearer') {
			throw new HttpException(
				'Invalid token format',
				HttpStatus.UNAUTHORIZED
			);
		}

		const token = auth.split(' ')[1];
		try {
			return jwt.verify(token, 'secret'); // Replace 'secret' with your JWT_SECRET
		} catch (err) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
	}
}
```

### Explanation:

-  The `AuthGuard` implements CanActivate interface which is NestJS's way of protecting routes

-  `GqlExecutionContext` is used because this is a GraphQL application - it converts the regular HTTP context to GraphQL context

-  The guard checks for the presence of an Authorization header and validates the JWT token
-  If valid, it attaches the decoded user to the context for later use
-  If invalid, it throws appropriate HTTP exceptions

#### Step 3: Using the Guard

Apply the guard using `@UseGuards` decorator:

```typescript
@UseGuards(new AuthGuard())
@Query(() => [Post])
async getAllPost() {
  return this.postService.getAllPost();
}
```

### 2. Adding Role-Based Authorization

#### Step 1: Create Role Enum

```typescript
export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
}
```

#### Step 2: Create Role Decorator

```typescript
import { SetMetadata } from '@nestjs/common';
import { UserRole } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

### Explanation:

-  We define possible user roles using an enum
-  The `Roles` decorator uses NestJS's metadata system to attach role requirements to routes/resolvers
-  `SetMetadata` stores this information which can be retrieved later by guards

#### Step 3: Create Role Guard

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		);

		if (!requiredRoles) {
			return true;
		}

		const ctx = GqlExecutionContext.create(context);
		const user = ctx.getContext().user;

		return requiredRoles.some((role) => user.roles?.includes(role));
	}
}
```

### Explanation:

-  The `RoleGuard` uses NestJS's `Reflector` to read metadata set by our `Roles` decorator
-  It checks if the authenticated user has any of the required roles
-  The guard runs after the `AuthGuard`, so we can safely access the user from context
-  If no roles are specified, access is granted by default

#### Step 4: Combine Guards

Updated resolver with both authentication and role-based authorization:

```typescript
/post/opst.resolver.ts;
@Resolver(() => Post)
export class PostResolver {
	constructor(private postService: PostService) {}

	@UseGuards(AuthGuard, RoleGuard)
	@Roles(UserRole.ADMIN)
	@Query(() => [Post])
	async getAllPosts() {
		return this.postService.getAllPost();
	}

	@UseGuards(AuthGuard, RoleGuard)
	@Roles(UserRole.USER, UserRole.ADMIN)
	@Query(() => Post)
	async getPost(@Args('id') id: string) {
		return this.postService.getPost(id);
	}
}
```

### Explanation:

-  Guards are applied using the @UseGuards() decorator
-  Multiple guards can be chained - they execute in order
-  `@Roles()` decorator specifies which roles can access each endpoint
-  The `getAllPosts` query is admin-only
-  The `getPost` mutation can be accessed by both users and admins

### Usage Example:

1. **Generate JWT Token** (in your auth service):

```typescript
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async login(user: any) {
		const payload = {
			userId: user.id,
			email: user.email,
			roles: [UserRole.USER], // or UserRole.ADMIN
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
```

2. **Make API Requests**:

```graphql
# Headers
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
}

# Query
query {
  getAllPosts {
    id
    title
  }
}
```

### Key Points:

1. The `AuthGuard` validates the JWT token in the Authorization header
2. The `RoleGuard` checks if the user has the required role
3. Use `@UseGuards(AuthGuard, RoleGuard)` to apply both guards
4. Use `@Roles(UserRole.ADMIN)` to specify required roles
5. Guards are executed in the order they are listed in `@UseGuards()`
6. The JWT token should include the user's roles in its payload

This implementation provides both authentication and role-based authorization, allowing you to protect your endpoints and restrict access based on user roles.

Similar code found with 1 license type
