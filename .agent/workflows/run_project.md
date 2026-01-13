# Run LaClave Frontend & Backend

## Prerequisites
- **Node.js** (v20+ recommended)
- **npm** (comes with Node)
- **Java JDK 21** (or the version used for the Spring Boot project)
- **Maven** (or use the wrapper `./mvnw` which is bundled)
- Ensure ports are free: `5173` (Vite dev server) and `8080` (Spring Boot)

## 1️⃣ Start the Spring Boot Backend
```bash
# Navigate to the backend directory (if separate) or the root if the backend is in the same repo
cd d:\projects\LaClaveFronte   # adjust if backend lives elsewhere
# Using Maven wrapper (recommended)
./mvnw spring-boot:run   # Windows PowerShell: .\mvnw.cmd spring-boot:run
```
- The application will start on `http://localhost:8080`.
- Verify by opening the URL in a browser or `curl http://localhost:8080/actuator/health`.
- If you added the **CORS** configuration (see previous answer), the backend will accept requests from the Vite dev server.

## 2️⃣ Start the React/Vite Frontend
```bash
cd d:\projects\LaClaveFronte
npm install   # install dependencies (run once)
npm run dev   # starts Vite dev server on http://localhost:5173
```
- The app will automatically open in your default browser.
- Navigate to the page where you can submit an inquiry (e.g., `/myInquiryHistory` → “문의하기”).

## 3️⃣ Test the Connection
1. Open the browser dev‑tools → **Network** tab.
2. Click the **문의하기** button.
3. You should see a `POST http://localhost:8080/api/inquiry/create` request returning **200**.
4. If you see a **CORS** error, double‑check the `WebConfig` (or `@CrossOrigin`) in the Spring Boot project and restart the backend.

## 4️⃣ Production Build (optional)
```bash
# Build the frontend for production
npm run build   # generates ./dist
# Serve the static files with any HTTP server (e.g., Nginx, Apache) or let Spring Boot serve them.
```
- When deploying, update the Axios base URL to the production API endpoint (e.g., `https://api.yourdomain.com`).

---
**Tip:** Keep the backend running in one terminal window and the Vite dev server in another. Use `Ctrl + C` to stop each process.
