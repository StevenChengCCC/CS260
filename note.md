# final review

## HTTP service
- **What is the Internet?**
  - It’s a massive, global system of connected networks and devices.
  - It works like many cables (often wireless) connecting computers worldwide.
  - A deeper understanding of how it works helps when building web apps.

- **IP Addresses & Domain Names**
  - Each device on the internet is found by an IP address (e.g. `128.187.16.184`).
  - Domain names (e.g. `byu.edu`) are easier to remember and map to IP addresses via DNS.
  - **Tools**:
    - **dig** (e.g. `dig byu.edu`) to find IP addresses.
    - **whois** to get info about domain ownership.

- **Internet Routing (Traceroute)**
  - Data travels in hops (routers/servers) to reach its destination.
  - `traceroute byu.edu` shows each hop.
  - Routes can change every time you run traceroute because the path is dynamically chosen.

- **TCP/IP Model**
  - **Application layer** (HTTP, SMTP, FTP) – user-level functionality.
  - **Transport layer** (TCP) – breaks data into packets and ensures reliable delivery.
  - **Internet layer** (IP) – finds the device and maintains the connection route.
  - **Link layer** – physical network connections (Ethernet, Wi-Fi, etc.).

- **Web Servers**
  - A web server hosts HTTP-based services.
  - Early “monolithic” servers had everything installed on one machine.
  - Modern approach:
    - Use libraries in languages like Go or Node.js to serve HTTP directly.
    - Multiple small services (microservices) run on different ports, with a gateway in front.

- **Microservices & Serverless**
  - **Microservices**: Each service has a single, focused purpose; scale each one independently.
  - **Serverless**: You just write a function that speaks HTTP, and a provider automatically scales it.

- **Domain Names & DNS**
  - A domain name can have multiple IP addresses for redundancy.
  - A root domain = secondary-level domain + TLD (e.g., `google.com`).
  - **Subdomains** (e.g. `blog.cs260.click`) can map to different IP addresses.
  - **DNS records**:
    - **A record** maps a domain name directly to an IP.
    - **CNAME record** is a domain alias, mapping one domain to another.
  - **TTL** (time to live) sets how long DNS info is cached.
  - You **lease** domains; you must pay to register or renew them.

- **Frontend vs. Backend**
  - **Frontend**: The browser’s files (HTML, CSS, JS).
  - **Backend**: A web service that provides data or runs logic (storing data, security, etc.).
  - The browser uses **fetch** to call backend endpoints (URLs).

- **URLs**
  - Format: `<scheme>://<domain>:<port>/<path>?<parameters>#<anchor>`
  - Example: `https://byu.edu:443/cs/260/student?filter=accepted#summary`
    - **scheme** = https  
    - **domain** = byu.edu  
    - **port** = 443  
    - **path** = /cs/260/student  
    - **parameters** = filter=accepted  
    - **anchor** = summary
  - **URL vs URN vs URI**: Usually we deal with URLs for web apps.

- **Ports**
  - Needed with an IP address to identify a specific service on a device.
  - Common ports: **80** (HTTP), **443** (HTTPS), **22** (SSH).
  - Ports below 1024 are “well-known” system ports.
  - Multiple services can run on one server if each uses a different port.

- **HTTP Internals**
  - **Requests**: contain a verb (GET, POST, PUT, DELETE), path, headers, and optional body.
  - **Responses**: contain a status code (200, 404, 500, etc.), headers, and optional body.
  - **Common verbs**: GET (read), POST (create), PUT (update), DELETE (remove).
  - **Headers** (e.g. `Content-Type`, `Authorization`, `Cookie`) carry extra data.
  - **Cookies** let a server store data on the client browser for stateful sessions.

- **Fetch API (Frontend)**
  - Modern JS (in the browser) method for making HTTP requests.
  - Returns a promise; `.json()` converts the response to a JS object.
  - Example:
    ```js
    fetch('https://quote.cs260.click')
      .then(response => response.json())
      .then(data => console.log(data));
    ```

- **Node.js Web Service**
  - Node lets you run JavaScript on the server side.
  - A basic HTTP server:
    ```js
    const http = require('http');
    http.createServer((req, res) => {
      // ...
    }).listen(8080);
    ```
  - Or use **Express** for easier routing and middleware.

- **Express Framework**
  - **Routing**:
    ```js
    app.get('/store/:storeName', (req, res) => {
      res.send({ name: req.params.storeName });
    });
    ```
  - **Middleware**: Functions that process requests before the main route handles them.
  - **Error handling**: Special middleware that catches errors and returns an HTTP response.

- **SOP & CORS**
  - **Same Origin Policy (SOP)**: Browser security that allows requests only from the same domain.
  - **CORS**: Server can allow specific or all origins with `Access-Control-Allow-Origin` header.

- **Web Service Design**
  - Model your data around the “nouns” of your app (e.g., orders, messages).
  - **Endpoints** typically use REST to leverage HTTP methods (GET, POST, PUT, DELETE).
  - Keep endpoints simple and consistent; focus on resources in URLs.
  - **RPC vs. REST vs. GraphQL**: Different API approaches.

- **Development vs. Production**
  - Keep your **development** environment (local) separate from **production** (public server).
  - Use **deployment scripts** to automate copying and installing dependencies, preventing mistakes.

# Data and authentication services

- **Uploading Files**
  - Use an HTML `<input type="file" />` and `FormData` on the frontend.
  - Use **Multer** or a similar package on the backend to handle file uploads.
  - **Production** tip: Store files in a reliable service (not just your local server storage).

- **Storage Services**
  - Web apps often need to store files (images, uploads, documents, etc.).
  - **Don’t store files directly on your server** because:
    - Server drive space is limited—filling it up can crash your app.
    - Servers should be considered “temporary,” so any files on them can be lost.
    - You need backups. If the server goes down, files stored only on it are lost.
  - **Use a dedicated storage service** (like AWS S3):
    - Unlimited capacity; pay only for what you use.
    - Optimized for global access.
    - Redundant copies of every file (built-in backups).
    - File versioning and metadata support.
    - Option to make files public or keep them private.
  - If you want to use AWS S3 for your Startup project:
    - **Steps**: Create an S3 bucket → Get credentials → Use AWS SDK in your app → Write, list, read, delete files in the bucket.
    - **Never commit your credentials** to GitHub (use config files or environment variables).

---

- **Data Services**
  - Web apps often store complex user or application data.
  - Historically, **SQL databases** (e.g. MySQL) were used for all data needs.
  - Now, **specialty data services** (often called “NoSQL”) exist for different data shapes (documents, graphs, key-value, time series, etc.).
  - **Examples**:
    - MySQL (relational queries)
    - Redis (in-memory cache)
    - ElasticSearch (text search)
    - MongoDB (JSON documents)
    - DynamoDB (key-value pairs)
    - Neo4J (graph data)
    - InfluxDB (time series)
  - **MongoDB** (used in this course):
    - Stores JSON-like documents in collections.
    - No strict schema; easy to evolve your data model.
    - Queries also in JavaScript-like syntax.
    - Hosted & managed option: **MongoDB Atlas** (easy to set up, free tier).
    - Keep your credentials out of code (use a `dbConfig.json` file, add to `.gitignore`).
    - Test the connection on startup (e.g., `db.command({ ping: 1 })`).
    - Insert, query, update docs using the MongoDB driver in Node.js.

---

- **Authorization Services**
  - If your app stores user data, it needs a login & user authorization system.
  - **Authentication** = verifying who the user is (email/password).
  - **Authorization** = what the user is allowed to do (roles, permissions).
  - Many options: build your own simple approach or use a service like AWS Cognito, Google Firebase, or others with OAuth, SAML, OIDC.
  - For this course, we implement a simple email/password system, storing hashed passwords (using `bcrypt`) and using cookies to track sessions.

---

- **Account Creation & Login**
  - **Endpoints**:
    - **POST /auth/create**: Creates new user credentials. Returns a cookie with an auth token.
    - **POST /auth/login**: Authenticates existing users. Returns a cookie with an auth token.
    - **GET /user/me**: Returns the currently logged-in user’s info (requires valid auth cookie).
  - **Implementation Details**:
    - Use **Express** to handle routes and **cookie-parser** to manage cookies.
    - Use **bcrypt** to hash passwords (never store plain-text passwords).
    - Use **uuid** to generate random tokens for authenticated sessions.
    - Use **MongoDB** to store user accounts (email, hashed password, token).
  - **Example Workflow** with curl:
    - `curl -X POST /auth/create` → creates user
    - `curl -X POST -c cookie.txt /auth/login` → logs in, stores cookie
    - `curl -b cookie.txt /user/me` → returns user data if auth cookie is valid

---

- **PM2 (Process Manager 2)**
  - A tool to keep Node.js apps running in the background on a server.
  - **Commands**:
    - `pm2 ls` — list all node processes
    - `pm2 start index.js -n <name>` — run an app with a given name
    - `pm2 stop <name>` / `pm2 restart <name>` — stop or restart a process
    - `pm2 delete <name>` — remove a process
    - `pm2 save` — save process list so it restarts after a reboot
    - `pm2 logs <name>` — view logs for that process
  - Useful for production: ensures apps keep running even if the terminal closes.

---

- **Hosting Another Web Service**
  - **Caddy** can reverse proxy subdomains to different ports on the same server.
  - Steps:
    1. Update **Caddyfile** with a new subdomain and port.
    2. Copy or create a new service folder (similar to your `startup` service).
    3. Run the new service on a **different port**.
    4. Register the service with **PM2** to keep it running.

---

- **UI Testing (Playwright)**
  - Automates browser interactions for testing frontend code.
  - **Playwright** steps:
    - `npm init playwright@latest` → sets up basic config & example tests.
    - Write tests in a `.spec.js` or `.ts` file, use `test()` blocks from Playwright.
    - Launch or debug tests in VS Code; can run headless or with a visible browser.
  - **BrowserStack** (optional tool):
    - Test your web app on many real devices & browsers remotely.

---

- **Endpoint Testing (with Jest)**
  - **Jest** is a popular testing framework in Node.js for backend services.
  - You can test Express endpoints using **supertest**:
    ```js
    request(app)
      .get('/store/provo')
      .expect(200)
      .expect({ name: 'provo' });
    ```
  - This is **much faster** and simpler than manual testing or spinning up full browsers.
  - Combine with TDD (Test Driven Development): write tests first, then code the endpoints to pass the tests.

---
# WebSocket
- **WebSocket**
  - Standard for **two-way, real-time** communication between a browser and a server (unlike HTTP’s request-response).
  - After an initial HTTP handshake, the connection “upgrades” to **WebSocket**, allowing **full duplex** communication.
  - Use the `ws` package in Node.js:
    ```js
    const { WebSocketServer } = require('ws');
    const wss = new WebSocketServer({ port: 9900 });
    wss.on('connection', (ws) => { ... });
    ```
  - In the browser:
    ```js
    const socket = new WebSocket('ws://...');
    socket.onmessage = (event) => console.log(event.data);
    socket.send('Hello');
    ```
  - Useful for chat apps, live notifications, real-time data updates.

---

- **WebSocket Chat Example**
  - **Client** has:
    - An HTML page with text input for name & message, a send button, and a chat display area.
    - A `WebSocket` object connecting to server (secure `wss://` or `ws://`).
    - Event handlers (`onopen`, `onmessage`, `onclose`) to manage chat state and display.
  - **Server**:
    - Uses Express to serve the static client files.
    - Uses `ws` to handle WebSocket connections on the same HTTP server.
    - Keeps track of all connected clients and **forwards messages** between them.
    - Periodically pings connections to ensure they’re still alive (removes dead ones).
  - Run multiple browser tabs to chat between them in real time.

# Security

- **Why Security Matters**
  - The internet is global and accessible 24/7, attracting malicious attackers.
  - Even a small or “unimportant” app can pose big risks (e.g., leaked user passwords).
  - Attackers can also use your compromised server to harm others.

- **Real Attacks on Your Server**
  - Check server auth logs (`sudo less +G /var/log/auth.log`) to see failed login attempts.
  - Attackers often try default or common credentials (“admin,” “password,” etc.).
  - **Example**: A TA set up a weak server login, and it was compromised in just 15 minutes.

- **Basic Security Terminology**
  - **Hacking**: Making a system do something unintended.
  - **Exploit**: Code or data that takes advantage of a flaw.
  - **Attack Vector**: Method the hacker uses (like open ports or endpoints).
  - **Attack Surface**: Everything that’s exposed to the attacker (ports, services, etc.).
  - **Attack Payload**: The malicious code or data itself.
  - **Input Sanitization**: Cleaning incoming data so it can’t harm your system.
  - **Penetration Testing**: Trying to break into your own system to find weaknesses.
  - **Mitigation**: Actions you take to reduce or remove a security threat.

- **Motivations for Attack**
  - **Disruption**: Locking or destroying systems (e.g., ransomware).
  - **Data Theft**: Stealing or exposing confidential data.
  - **Resource Misuse**: Using your servers to mine crypto or attack others.

- **Examples of Major Security Failures**
  - SQL injection allowing $100 million theft via insider trading.
  - Log4Shell vulnerability affecting 93% of cloud services at discovery.
  - Hackers installing backdoors on major government/enterprise computers.

- **Common Hacking Techniques**
  - **Injection (SQL, etc.)**: Malicious data input can alter or destroy a database.
  - **Cross-Site Scripting (XSS)**: Running malicious JS in another user’s browser.
  - **Denial of Service**: Overloading or crashing the service.
  - **Credential Stuffing**: Using passwords from one breach on other sites.
  - **Social Engineering**: Tricking humans into revealing secrets.

- **Security Best Practices**
  - **Sanitize All Input**: Treat incoming data as potentially harmful.
  - **Logging**: Keep detailed, tamper-proof logs for detective work and alerts.
  - **Traps**: Create “fake” data or endpoints as early warnings.
  - **Educate Everyone**: All team members and users should think securely.
  - **Reduce Attack Surfaces**: Close unnecessary ports, endpoints, or permissions.
  - **Layered Security**: Multiple defenses (physical, network, server, software).
  - **Least Privilege**: Give each user minimal access needed—no more.
  - **Protect Credentials**: Don’t store passwords in public repos; rotate them regularly.
  - **Public Review**: Don’t rely on security by obscurity; let experts test your system.

---

## OWASP Top Ten Overview

- **A01 Broken Access Control**  
  - Missing or incomplete permission checks on the server side.  
  - **Mitigation**: Enforce roles/permissions on the backend, not just the UI.

- **A02 Cryptographic Failures**  
  - Using weak or no encryption for sensitive data.  
  - **Mitigation**: Encrypt data in transit and at rest with up-to-date algorithms (e.g. TLS, AES).

- **A03 Injection**  
  - Inserting malicious input into queries or commands (SQL, NoSQL, etc.).  
  - **Mitigation**: Sanitize input, use prepared statements.

- **A04 Insecure Design**  
  - Flawed architecture ignoring security or failing to plan for it.  
  - **Mitigation**: Bake security into design, use secure design patterns, do scenario reviews.

- **A05 Security Misconfiguration**  
  - Default credentials, outdated server settings, overly permissive configs.  
  - **Mitigation**: Hardening, disable defaults, patch and update systems.

- **A06 Vulnerable & Outdated Components**  
  - Old software dependencies with known holes.  
  - **Mitigation**: Keep software updated, watch for alerts from package managers.

- **A07 Identification & Authentication Failures**  
  - Weak login processes or poor credential storage.  
  - **Mitigation**: Enforce strong passwords, rate-limit logins, hash passwords securely, consider MFA.

- **A08 Software & Data Integrity Failures**  
  - Trusted third-party code or data is compromised.  
  - **Mitigation**: Audit third-party code, sign and verify updates, use vetted package sources.

- **A09 Security Logging & Monitoring Failures**  
  - Missing or insufficient logs, no real-time alerts.  
  - **Mitigation**: Keep immutable logs, monitor abnormal activity, automate alerts.

- **A10 Server-Side Request Forgery (SSRF)**  
  - Tricking server into making unauthorized internal requests.  
  - **Mitigation**: Validate URLs, use domain whitelists, block internal requests.

---

## Security Practice with Juice Shop

- **Juice Shop**: An OWASP-provided intentionally vulnerable app.
- **Install**:
  1. `git clone https://github.com/juice-shop/juice-shop.git --depth 1`
  2. `cd juice-shop && npm install`
  3. `npm start` → runs on port `3000`.
- **Usage**:
  - Open browser at `localhost:3000`.
  - Explore hidden paths like `#/score-board` to see challenges.
  - Solve challenges, follow tutorials (e.g., DOM XSS).

