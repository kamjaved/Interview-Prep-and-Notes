Okay, let's craft a step-by-step guide to setting up a basic Microfrontend architecture with React and TypeScript, leveraging Webpack's Module Federation.

**Conceptual Overview:**

We'll create a simple setup with a **Container App** (the main shell) and two **Remote Apps** (the microfrontends) built with React and TypeScript. The Container will dynamically load components exposed by the Remotes using Module Federation.

**Step 1: Project Setup and Structure**

We'll use a monorepo structure for simplicity in this example, but remember that independent repositories are often preferred for larger teams.

```
microfrontend-demo/
├── container-app/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx      (Container's entry point)
│   │   ├── components/
│   │   └── ...
│   ├── webpack.config.js
│   ├── package.json
│   ├── tsconfig.json
├── remote-app-one/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx      (Remote 1's entry point)
│   │   ├── components/
│   │   └── ...
│   ├── webpack.config.js
│   ├── package.json
│   ├── tsconfig.json
├── remote-app-two/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx      (Remote 2's entry point)
│   │   ├── components/
│   │   └── ...
│   ├── webpack.config.js
│   ├── package.json
│   ├── tsconfig.json
├── package.json         (Root package.json)
├── tsconfig.json        (Root tsconfig.json)
```

**Initialize the Monorepo (Optional):**

You can use `npm init -y` in the root directory to create a basic `package.json`. For TypeScript, you can create a root `tsconfig.json` with basic compiler options.

**Step 2: Setting up React and TypeScript in Each App**

Navigate into each app's directory (`container-app`, `remote-app-one`, `remote-app-two`) and run the following:

```bash
npm init -y
npm install react react-dom
npm install -D typescript @types/react @types/react-dom @babel/core @babel/preset-env @babel/preset-react babel-loader
```

Create a basic `tsconfig.json` in each app:

```json
{
	"compilerOptions": {
		"target": "ESNext",
		"module": "ESNext",
		"jsx": "react-jsx",
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"strict": true,
		"skipLibCheck": true,
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"outDir": "./dist"
	},
	"include": ["./src"],
	"exclude": ["node_modules"]
}
```

Create a basic `.babelrc` in each app:

```json
{
	"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**Basic `index.html` in each `public` folder:**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>App</title>
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>
```

**Basic `src/App.tsx` in each app:**

```typescript
import React from 'react';

const App = () => {
	return (
		<div>
			<h1>Hello from App</h1>
		</div>
	);
};

export default App;
```

**Basic `src/bootstrap.tsx` in each app:**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
}
```

**Step 3: Webpack Configuration for Module Federation**

Now, let's configure Webpack in each application to enable Module Federation.

**Container Application (`container-app/webpack.config.js`):**

```javascript
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dependencies } = require('./package.json');

module.exports = {
	entry: './src/bootstrap.tsx',
	mode: 'development', // Or 'production'
	devtool: 'inline-source-map',
	devServer: {
		port: 3000,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /bootstrap\.tsx$/,
				loader: 'ignore-loader', // Prevent container's bootstrap from being exposed
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container', // Unique name for the container
			remotes: {
				// Define remote microfrontends and their locations
				'mfe-app-one': 'mfeAppOne@http://localhost:3001/remoteEntry.js',
				'mfe-app-two': 'mfeAppTwo@http://localhost:3002/remoteEntry.js',
			},
			shared: {
				...dependencies,
				react: { singleton: true, requiredVersion: dependencies['react'] },
				'react-dom': {
					singleton: true,
					requiredVersion: dependencies['react-dom'],
				},
				// Add other shared libraries (e.g., react-router-dom, state management)
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: 'http://localhost:3000/', // Public URL for container's assets
	},
};
```

**Remote Microfrontend Application One (`remote-app-one/webpack.config.js`):**

```javascript
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dependencies } = require('./package.json');

module.exports = {
	entry: './src/bootstrap.tsx',
	mode: 'development', // Or 'production'
	devtool: 'inline-source-map',
	devServer: {
		port: 3001,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /bootstrap\.tsx$/,
				loader: 'ignore-loader', // Prevent remote's bootstrap from being exposed
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'mfeAppOne', // Unique name for this remote
			exposes: {
				// Define the modules this MFE wants to expose
				'./MyComponent': './src/components/MyComponent',
				// You can expose more components, utilities, etc.
			},
			shared: {
				...dependencies,
				react: { singleton: true, requiredVersion: dependencies['react'] },
				'react-dom': {
					singleton: true,
					requiredVersion: dependencies['react-dom'],
				},
				// Share other common libraries
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: 'http://localhost:3001/', // Public URL for MFE's assets
		library: { type: 'var', name: 'mfeAppOne' }, // Expose as a global variable
	},
};
```

**Remote Microfrontend Application Two (`remote-app-two/webpack.config.js`):**

This configuration will be very similar to `remote-app-one`, just with different names and ports:

```javascript
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dependencies } = require('./package.json');

module.exports = {
	entry: './src/bootstrap.tsx',
	mode: 'development', // Or 'production'
	devtool: 'inline-source-map',
	devServer: {
		port: 3002,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /bootstrap\.tsx$/,
				loader: 'ignore-loader', // Prevent remote's bootstrap from being exposed
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'mfeAppTwo', // Unique name for this remote
			exposes: {
				// Define the modules this MFE wants to expose
				'./AnotherComponent': './src/components/AnotherComponent',
				// You can expose more components, utilities, etc.
			},
			shared: {
				...dependencies,
				react: { singleton: true, requiredVersion: dependencies['react'] },
				'react-dom': {
					singleton: true,
					requiredVersion: dependencies['react-dom'],
				},
				// Share other common libraries
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: 'http://localhost:3002/', // Public URL for MFE's assets
		library: { type: 'var', name: 'mfeAppTwo' }, // Expose as a global variable
	},
};
```

**Explanation of Webpack Configuration (Focus on Module Federation):**

-  **`ModuleFederationPlugin`:** This is the core plugin for enabling Module Federation.
   -  **`name`:** A unique identifier for each application (container or remote). This name is used for referencing and exposing modules.
   -  **`remotes` (in Container):** Defines the locations of the remote microfrontends. The key (`mfe-app-one`) is the name used in the container's code to import remote modules. The value (`mfeAppOne@http://.../remoteEntry.js`) specifies the global variable name exposed by the remote and the URL of its manifest file (`remoteEntry.js`).
   -  **`exposes` (in Remotes):** Defines the internal modules within the remote that it wants to make available for consumption by other applications. The key (`./MyComponent`) is the public name used for import by consumers, and the value (`./src/components/MyComponent`) is the local path to the module.
   -  **`shared`:** Lists the dependencies that should be shared between the container and remotes (and between remotes themselves). This prevents loading multiple copies of the same library, improving performance and reducing bundle size.
      -  **`singleton: true`:** Ensures that only one instance of the shared library (like `react` and `react-dom`) is loaded in the browser, even if different microfrontends request different versions (Webpack tries to negotiate compatible versions).
      -  **`requiredVersion`:** Specifies the minimum version of the shared library that this application requires.
   -  **`output.publicPath`:** Specifies the base URL for the application's assets. This is important for resolving dynamically loaded chunks.
   -  **`output.library` (in Remotes):** Configures how the remote application is exposed as a library. `type: 'var'` and `name: 'mfeAppOne'` (or `mfeAppTwo`) make the remote's `remoteEntry.js` accessible via this global variable.
   -  **`ignore-loader`:** Used to prevent the `bootstrap.tsx` files (which are the entry points for rendering within their own context) from being included in the exposed modules.

**Step 4: Consuming Remote Components in the Container**

Now, let's see how the container application can use the components exposed by the remote microfrontends.

**`container-app/src/App.tsx`:**

```typescript
import React, { Suspense } from 'react';

// Declare module for remote components (TypeScript needs this)
declare module 'mfe-app-one/MyComponent' {
	const MyComponent: React.ComponentType;
	export default MyComponent;
}

declare module 'mfe-app-two/AnotherComponent' {
	const AnotherComponent: React.ComponentType;
	export default AnotherComponent;
}

const RemoteComponentOne = React.lazy(() => import('mfe-app-one/MyComponent'));
const RemoteComponentTwo = React.lazy(
	() => import('mfe-app-two/AnotherComponent')
);

const App = () => {
	return (
		<div>
			<h1>Container App</h1>
			<Suspense fallback={<div>Loading Component One...</div>}>
				<RemoteComponentOne />
			</Suspense>
			<hr />
			<Suspense fallback={<div>Loading Component Two...</div>}>
				<RemoteComponentTwo />
			</Suspense>
		</div>
	);
};

export default App;
```

**Explanation:**

-  **`declare module 'mfe-app-one/MyComponent'`:** TypeScript needs module declarations for the dynamically loaded remote modules. This tells TypeScript that a module with this name exists and exports a React component.
-  **`React.lazy()` and `Suspense`:** These React features are used for code splitting and lazy loading of the remote components. The container doesn't load the remote component code until it's actually needed, improving initial load time. The `fallback` prop provides a placeholder while the component is being loaded.
-  **`import('mfe-app-one/MyComponent')`:** This dynamic import statement tells Webpack to fetch and load the `MyComponent` exposed by the `mfe-app-one` remote at runtime. The `'mfe-app-one'` part matches the name defined in the container's `remotes` configuration, and `'./MyComponent'` matches the key in the remote's `exposes` configuration.

**Step 5: Running the Applications**

You'll need to run each application's Webpack development server separately. In each app's directory (`container-app`, `remote-app-one`, `remote-app-two`), run:

```bash
npx webpack serve --config webpack.config.js
```

Make sure they run on the specified ports (container on 3000, remote-app-one on 3001, remote-app-two on 3002).

Now, if you navigate to `http://localhost:3000` in your browser, you should see the Container App, and the components from the remote microfrontends will be loaded dynamically.

**Step 6: Communication Strategies**

Here's a brief overview of different communication methods in the context of this setup:

-  **Props:** If the Container directly renders a component from a Remote, it can pass data down as props like a regular React component. For example, if `RemoteComponentOne` accepts a `name` prop:

   ```typescript
   // Container App
   <Suspense fallback={<div>Loading Component One...</div>}>
   	<RemoteComponentOne name="From Container" />
   </Suspense>;

   // Remote App One (MyComponent.tsx)
   import React from 'react';

   interface Props {
   	name?: string;
   }

   const MyComponent: React.FC<Props> = ({ name }) => {
   	return (
   		<div>
   			<h3>Component One</h3>
   			<p>Hello {name || 'Remote User'}!</p>
   		</div>
   	);
   };

   export default MyComponent;
   ```

-  **Custom Events (DOM Events):** The Container and Remotes can dispatch and listen to custom DOM events on a shared ancestor (e.g., `window` or a specific element in the Container).

   ```typescript
   // Remote App One (dispatching an event)
   window.dispatchEvent(
   	new CustomEvent('userLoggedIn', { detail: { userId: '123' } })
   );

   // Container App (listening for the event)
   useEffect(() => {
   	const handleUserLoggedIn = (event: CustomEvent) => {
   		console.log('User logged in:', event.detail);
   		// Update container state
   	};
   	window.addEventListener('userLoggedIn', handleUserLoggedIn);
   	return () => {
   		window.removeEventListener('userLoggedIn', handleUserLoggedIn);
   	};
   }, []);
   ```
