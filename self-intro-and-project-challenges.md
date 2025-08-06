# **1. Interview Self-Introduction:**

Hi, my name is Kamran Javed and i am a full stack developer and I have around 6+ years of experience as a web developer. My core expertise lies in building responsive and dynamic web applications using ReactJS, TypeScript, and NestJS. Over the years, I’ve worked extensively with REST APIs, GraphQL, and micro-frontend architectures, contributing to both frontend and scalable backend services.

My Previous Porject was based on a insurance policy marketplace, where I'm primarily focused on the payment system integration and backend integrations with core payment API. Currently i am working on a conversational Chatbot Agent which let users to find their employees data y user sintruction how they want.

Apart from my mainstream tech stack, I enjoy exploring emerging technologies like Blockchain and Generative AI. In fact, I’ve had some hands-on experience with LangChain.js and the OpenAI API to build intelligent assistants.

I’m also certified in Microsoft Azure and GitHub Copilot, and in menatime i also make sure to stay up to date with the latest trends in web development.

# **2. Project Challenges:**

### 2.1 Agentic AI Converstaional Chatbot

I built a multi-tool AI assistant using React, TypeScript, Node.js,
LangChainJS & LangGrpahJS a full-stack agentic system Chatbot designed
to understand natural language and take real actions using the right tools.

At its core, I have used GPT-4o-mini LLM and for persistent memory I used
Langgraph checkpoint with PostgresSaver which allowing it to maintain
context across long conversations.

I designed a custom PromptManager that smartly analyzes user input picks the right tool whether it's querying employees from DB or performing real-time currency conversions for employess from Different Countries or pulling or fetching current data from the web using the Tavily API.
On the frontend, I built a sleek & simple React + Vite app that interacts with the backend agent and renders structured responses from markdown format using `react-markdown` library (like employee data) into polished, user-friendly components like tables or cards for a seamless experience.

### 2.2 AI Purposal Factory:

In AI Purposal project, I mainly focused on the frontend side for both the strawman and generic modules especially around the document templating usinf libraray `docxtemplator` for `PPT & DOCX` and `html-pdf` for `PDF` export features. I was responsible for building the UI where users could select the export format and trigger the download. I also implemented the logic to ensure the exported documents followed the right structure, branding, and templating requirements.

On the backend, I worked on fetching and assembling data for a given document using its document ID from CosmosDB. When a user requested to export a document like a strawman proposal we would process raw content from various file types such as DOCX, PDF & PPTX. This was done using avascript libraries like docx and node-pptx.

One of the critical parts of our pipeline was text chunking. We used `LangChain's RecursiveCharacterTextSplitter` to break large documents into smaller, manageable chunks. I tuned the chunk size (aproxx 4000) and overlap (aproxx 400) parameters to improve both the quality of AI outputs and the accuracy of document generation. Each chunk was tagged with metadata like filename or page number to trace back content when needed.

Overall, my role bridged both frontend and backend ensuring a reliable export experience and robust document processing logic using a mix of modern web technologies and Python scripting.

### 2.3 Insurance Policy Marketplace project:

While working on the Insurance Policy Marketplace project, one of the key challenges we faced was the high loading time on the payment page. Since we were dealing with around 20 to 25 different insurance brands, each with its own configuration for style, layout, and business rules, the system was initially loading all brand configurations upfront which obviously impacted performance.

To tackle this, I implemented a dynamic config loading approach where we load only the selected brand’s configuration at runtime. That alone brought significant improvement in the initial load time. Additionally, I optimized the frontend bundles using Webpack’s `CompressionWebPackPlugin` and `BundleAnalyzer`. I split the bundles into smaller chunks, enabled gzip compression, and in the production environment, this helped reduce the load time down to just a few milliseconds.

On the backend side, one of the most critical improvements I worked on was optimizing our calls to the core payment API. Initially, every time a brand was loaded, it would call the core API, which was both costly and introduced latency. Also, failures meant going through multiple layers BFF, orchestration layer, and the core team to debug.

To solve this, I implemented an in-memory caching layer in our NestJS-based BFF, with a robust retry mechanism. On server startup, the app would prefetch and cache all brand and payment configs using exponential backoff retries. This ensured all critical configs were available upfront, and if anything failed, we’d know immediately making debugging and tracing much easier and reliable.

This combination of dynamic loading on the frontend and intelligent caching with retry logic on the backend really helped stabilize performance and improve the overall developer and user experience.

<br>

# **3. Common Technical Question in Interview:**

#### Q- HOW YOU ENSURE SECURITY WHILE DEVELOPING BACKEND ?

Security is something I always take seriously, especially while working with Node.js and Express & Nestjs. Over the years, I’ve followed a set of best practices to make sure the backend stays robust and safe.

For example, during my time at Innofied, I was working on a cab booking application where user data and session security were critical. Instead of relying on traditional cookie-based sessions, I used JWT for secure token-based authentication. This not only reduced the risk of session hijacking but also gave us better control over token expiration and validation.

On the API side, I made sure to apply strong input validation and sanitization using libraries like `express-validator` and for NestJS i prefer `class-validator` this helped in preventing common issues like SQL injection and **XSS attacks**. I also ensured we had proper `CORS policies` in place, and of course, enforced HTTPS for secure communication between the frontend and backend.i also prefer to use `express-rate-limit` pacakege to limit rate at perticular session to prevent **DOS attack**

In Insurance Policy Marketplace project we used HMAC to prevent alteration for sending payment details (user card details) to core API `(if someone alters the message, the HMAC won't match & HMAC Proves the message was generated by someone who knows the secret)`

So overall, whether it's authentication, data validation, or secure transport, I always aim to keep the backend clean, secure, and production-ready.
