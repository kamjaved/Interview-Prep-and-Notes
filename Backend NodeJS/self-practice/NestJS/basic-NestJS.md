## 1. Authentication Vs Authorization

**Authentication** verifies the identity of a user. It answers "Who are you?". The backend checks provided credentials (e.g., username/password) against stored data. Upon successful verification, the user is considered authenticated.

**Authorization** determines what an authenticated user is allowed to do. It answers "What can you do?". After authentication, the backend checks the user's roles or permissions against the requested resource or action. For example, an authenticated "admin" might be authorized to delete users, while a regular "user" is not. Authentication precedes authorization.

<br>

## 2. TypeORM `@OneToMany` and `@ManyToOne`

Okay, let's simplify TypeORM's `@OneToMany` and `@ManyToOne` decorators using a simple analogy: **Books and Authors.**

Imagine a library:

**`@OneToMany` (One Author to Many Books):**

-  **Analogy:** One author can write many books.
-  **Technical:** One entity (Author) is related to multiple instances of another entity (Book).
-  **How to remember:** Think "One **to many** things". The "many" side will typically have a foreign key pointing back to the "one" side.
-  **In code (simplified):** In your `Author` entity, you'd have a property decorated with `@OneToMany(() => Book, book => book.author)`, indicating that an author can have a collection of `Book` entities. The `book => book.author` part tells TypeORM how the relationship is defined on the `Book` side (the `Book` has an `author` property).

**`@ManyToOne` (Many Books to One Author):**

-  **Analogy:** Many books can be written by one author.
-  **Technical:** Multiple instances of one entity (Book) are related to a single instance of another entity (Author).
-  **How to remember:** Think "**Many** things to **one**". The side with `@ManyToOne` will hold the foreign key referencing the "one" side.
-  **In code (simplified):** In your `Book` entity, you'd have a property decorated with `@ManyToOne(() => Author, author => author.books)`, indicating that a book belongs to one `Author`. The `@JoinColumn()` decorator is often used here to specify the foreign key column in the `Book` table (e.g., `authorId`). The `author => author.books` part tells TypeORM how the relationship is defined on the `Author` side (the `Author` has a `books` property).

**Key Analogy Points to Avoid Confusion:**

-  **Focus on the perspective:** `@OneToMany` is from the "one" side looking at the "many." `@ManyToOne` is from the "many" side looking at the "one."
-  **Foreign Key Location:** The entity with `@ManyToOne` usually holds the foreign key that links back to the entity in the `@OneToMany` relationship. Think of the book holding the author's ID.

By thinking in terms of "one author to many books" and "many books to one author," you can easily recall which decorator to use and how the relationship is structured in your TypeORM entities. Remember to consider which entity "owns" the relationship (usually the one with the foreign key, marked by `@ManyToOne` and often `@JoinColumn()`).

<br>

let's break down how the tables for `Project` and `User` would likely look in your database schema based on your TypeORM entities.

**1. `project` Table:**

-  **`id` (VARCHAR - Primary Key):** This column will store the unique identifier for each project. It's defined as the primary key in your `Project` entity.
-  **`name` (VARCHAR):** This column will store the name of each project.

**2. `user` Table:**

-  **`id` (VARCHAR - Primary Key):** This column will store the unique identifier for each user. It's defined as the primary key in your `User` entity.
-  **`firstName` (VARCHAR):** Stores the first name of the user.
-  **`lastName` (VARCHAR):** Stores the last name of the user.
-  **`age` (INTEGER):** Stores the age of the user.
-  **`company` (VARCHAR):** Stores the company the user belongs to.
-  **`projectId` (VARCHAR - Foreign Key):** This is the crucial column that establishes the `@ManyToOne` relationship with the `Project` table. It will store the `id` of the `Project` that the user is associated with. This acts as a foreign key referencing the `project(id)` column.

**Relationship:**

The `@OneToMany(() => User, (user) => user.project)` in the `Project` entity and the `@ManyToOne(() => Project, (project) => project.users)` in the `User` entity define a **one-to-many relationship** from the `Project` table to the `User` table.

-  **One Project can have many Users.** This is reflected in the `users` array in the `Project` entity.
-  **Many Users can belong to one Project.** This is reflected in the `project` property and the `projectId` foreign key in the `User` entity.

**In Summary (Conceptual Table Structures):**

Okay, here's a mock example of how the `project` and `user` tables might look after some data has been inserted, based on your schema:

**`project` Table:**

| id      | name              |
| ------- | ----------------- |
| PROJ001 | Alpha Project     |
| PROJ002 | Beta Initiative   |
| PROJ003 | Gamma Development |

**`user` Table:**

| id      | firstName | lastName | age | company             | projectId |
| ------- | --------- | -------- | --- | ------------------- | --------- |
| USER001 | Alice     | Smith    | 30  | Tech Solutions Inc. | PROJ001   |
| USER002 | Bob       | Johnson  | 25  | Innovate Labs       | PROJ001   |
| USER003 | Charlie   | Brown    | 35  | Global Corp         | PROJ002   |
| USER004 | Diana     | Garcia   | 28  | Future Forward      | PROJ001   |
| USER005 | Eve       | Miller   | 32  | Stellar Systems     | PROJ003   |
| USER006 | Frank     | Wilson   | 27  | Quantum Leap Co.    | PROJ002   |

**Visualization:**

-  **Project "Alpha Project" (PROJ001)** has three users associated with it: Alice Smith (USER001), Bob Johnson (USER002), and Diana Garcia (USER004). Their `projectId` column in the `user` table points to `PROJ001`.
-  **Project "Beta Initiative" (PROJ002)** has two users: Charlie Brown (USER003) and Frank Wilson (USER006). Their `projectId` is `PROJ002`.
-  **Project "Gamma Development" (PROJ003)** has one user: Eve Miller (USER005), with `projectId` set to `PROJ003`.

This mock data clearly illustrates the one-to-many relationship: one project can have multiple users linked to it through the `projectId` foreign key in the `user` table. Each user, in turn, has a `projectId` indicating the single project they are currently associated with.

<br>

## 3.Basic Refresher Of NestJS

Okay, here's a refresher on NestJS top features compared to Express and raw Node.js, along with popular NestJS CLI commands, suitable for explaining to an interviewer:

**NestJS: The Enterprise-Grade Node.js Framework**

NestJS builds upon Node.js and aims to solve many architectural challenges faced when building scalable and maintainable server-side applications. Here's how it compares:

**Top Features of NestJS Compared to Express & Node.js:**

-  **Modular Architecture:** NestJS enforces a highly modular structure using **modules**. This promotes better organization, reusability, and testability of code compared to the often less structured nature of Express or raw Node.js applications. _Think of it like organizing your app into well-defined boxes with clear responsibilities._
-  **Opinionated Structure & Best Practices:** Unlike the flexibility (and potential for inconsistency) of Express, NestJS provides a clear **architectural pattern** (inspired by Angular) with concepts like controllers, services, and modules. This guides developers towards best practices and leads to more consistent and maintainable codebases. _It gives you a well-defined roadmap for building your application._
-  **TypeScript by Default:** NestJS is built with and strongly encourages the use of **TypeScript**. This brings static typing, improved developer tooling (autocompletion, error detection), and enhanced code maintainability compared to JavaScript-only Express or Node.js. _TypeScript acts as a safety net, catching errors early in development._
-  **Dependency Injection (DI):** NestJS has a built-in **Dependency Injection** system. This makes managing dependencies between different parts of your application easier, promotes loose coupling, and significantly improves testability. _Instead of manually creating objects, NestJS handles it for you, making your components more independent._
-  **Built-in Features:** NestJS comes with many features out-of-the-box that often require third-party middleware or libraries in Express, such as:
   -  **Routing:** A powerful and declarative routing system.
   -  **Middleware:** Easy implementation of request/response middleware.
   -  **Pipes:** For request data validation and transformation.
   -  **Guards:** For request authorization.
   -  **Interceptors:** For logging, transforming responses, etc.
   -  **Testing:** Excellent support for unit and end-to-end testing.
-  **GraphQL and WebSockets Support:** NestJS offers first-class integration with technologies like **GraphQL** and **WebSockets**, making it easier to build modern APIs and real-time applications compared to setting these up from scratch in Express.
-  **CLI Tooling:** The **NestJS CLI** provides a powerful set of commands for scaffolding projects, generating modules, controllers, services, and more. This significantly speeds up development and ensures consistency across the project. _The CLI is like having a built-in project generator and code architect._

**Popular NestJS CLI Commands:**

-  `nest new <project-name>`: Creates a new NestJS project with the specified name. _Starts your project with a well-structured foundation._
-  `nest generate module <module-name>` or `nest g mo <module-name>`: Generates a new module. _Creates a new organizational unit for your features._
-  `nest generate controller <controller-name>` or `nest g co <controller-name>`: Generates a new controller to handle incoming requests. _Creates the entry point for your API endpoints._
-  `nest generate service <service-name>` or `nest g se <service-name>`: Generates a new service to handle business logic. _Separates your concerns and makes your code reusable._
-  `nest generate guard <guard-name>` or `nest g gu <guard-name>`: Generates a new guard for authorization. _Protects your routes based on user roles or permissions._
-  `nest generate pipe <pipe-name>` or `nest g pi <pipe-name>`: Generates a new pipe for data validation and transformation. _Ensures your incoming data is clean and in the correct format._
-  `nest generate interceptor <interceptor-name>` or `nest g in <interceptor-name>`: Generates a new interceptor to handle logic before or after route handlers. _Adds cross-cutting concerns like logging or response modification._
-  `npm run start`: Runs the NestJS application in development mode with live reloading. _Your go-to command for local development._
-  `npm run build`: Builds the NestJS application for production. _Compiles your TypeScript code into JavaScript._
-  `npm run start:dev`: Runs the NestJS application in watch mode for development. _Automatically restarts the server on code changes._
-  `npm run test`: Runs unit and integration tests. _Ensures the quality and reliability of your code._
-  `npm run test:e2e`: Runs end-to-end tests. _Tests your application from an external perspective._

By highlighting these features and commands, you can effectively communicate the benefits and developer experience of using NestJS compared to more basic Node.js frameworks like Express.

<br/>

## 4. Dependency Injection in Breif Explanation

You're right, Dependency Injection (DI) can be a bit abstract at first! Let's break it down with an example and finish with a helpful analogy.

**The Problem Without DI (Tight Coupling):**

Imagine a `UserService` that needs to send emails. Without DI, the `UserService` might directly create an instance of an `EmailService` inside its own code:

```typescript
class EmailService {
	sendEmail(to: string, subject: string, body: string) {
		console.log(`Sending email to ${to}: ${subject} - ${body}`);
		// Actual email sending logic
	}
}

class UserService {
	private emailService: EmailService;

	constructor() {
		this.emailService = new EmailService(); // UserService creates its own dependency
	}

	createUser(email: string, name: string) {
		// Create user in database
		console.log(`User ${name} created with email: ${email}`);
		this.emailService.sendEmail(email, 'Welcome!', 'Thanks for joining!');
	}
}

const userService = new UserService();
userService.createUser('test@example.com', 'John Doe');
```

**Problems with this approach:**

-  **Tight Coupling:** `UserService` is tightly coupled to `EmailService`. If you want to use a different email service (e.g., for testing or a different provider), you have to modify the `UserService` code directly.
-  **Difficult Testing:** To test `UserService`, you also indirectly test the real `EmailService`. It's hard to isolate the `UserService`'s logic and mock or stub the email sending part.
-  **Reduced Reusability:** `UserService` is less reusable because it always depends on the specific `EmailService` implementation.

**The Solution with Dependency Injection:**

With DI, instead of the `UserService` creating its own dependencies, these dependencies are "injected" into the `UserService` from the outside:

```typescript
class EmailService {
	sendEmail(to: string, subject: string, body: string) {
		console.log(`(DI) Sending email to ${to}: ${subject} - ${body}`);
		// Actual email sending logic
	}
}

class UserService {
	private emailService: EmailService;

	// EmailService is injected through the constructor
	constructor(emailService: EmailService) {
		this.emailService = emailService;
	}

	createUser(email: string, name: string) {
		// Create user in database
		console.log(`(DI) User ${name} created with email: ${email}`);
		this.emailService.sendEmail(
			email,
			'Welcome!',
			'(DI) Thanks for joining!'
		);
	}
}

// Somewhere else in your application (often a DI container or framework):
const emailService = new EmailService();
const userService = new UserService(emailService); // Injecting the dependency

userService.createUser('test@example.com', 'Jane Doe');
```

**Key Changes:**

-  The `UserService` no longer creates the `EmailService` instance itself.
-  The `EmailService` is passed into the `UserService`'s constructor as an argument.

**Benefits of Dependency Injection:**

-  **Loose Coupling:** `UserService` now depends on an _abstraction_ (the `EmailService` interface/class) rather than a concrete implementation. You can easily swap out different `EmailService` implementations without modifying `UserService`.
-  **Easier Testing:** You can easily mock or stub the `EmailService` when testing `UserService`, allowing you to isolate its behavior.
-  **Increased Reusability:** `UserService` becomes more reusable because it can work with any object that adheres to the `EmailService` "contract."
-  **Improved Maintainability:** Changes to `EmailService` are less likely to directly impact `UserService`.

**The Analogy: The Appliance Repairman**

Imagine you have a broken washing machine (`UserService`) that needs a specific part, say a new motor (`EmailService`).

-  **Without DI (Tight Coupling):** The repairman (`UserService`) goes to the store and buys a specific brand and model of motor (`new EmailService()`). If that specific motor is unavailable or you want a different type, the repairman has to go back, get a different one, and might even need to modify the washing machine to fit it. The repairman is tightly bound to that specific motor.

-  **With DI:** You (the DI container/framework) provide the necessary motor (`emailService`) to the repairman (`UserService`). You can give the repairman any motor that fits the washing machine's requirements (any class that implements the `EmailService` "contract"). The repairman doesn't care _where_ the motor came from or its specific brand; they just need a working motor to do their job. This makes the repairman more flexible and easier to work with, regardless of the specific motor being used.

In essence, Dependency Injection is about shifting the responsibility of creating and managing dependencies from the class that _uses_ them to an external entity (often a framework or a dedicated container). This leads to more flexible, testable, and maintainable code.

<br/>
