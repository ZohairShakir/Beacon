# 🚨 Beacon - API Health Check & REST API Auditor

Beacon is a lightweight developer tool that instantly analyzes any public REST API endpoint for **performance, security, API quality, and best practices**, then generates a comprehensive health report with an overall score in seconds.

---

## 📸 Screenshots

|               Landing Page               |               Scan Report              |
| :--------------------------------------: | :------------------------------------: |
| ![Landing](docs/screenshots/landing.png) | ![Report](docs/screenshots/report.png) |

|           Authentication           |              Mobile Report             |
| :--------------------------------: | :------------------------------------: |
| ![Auth](docs/screenshots/auth.png) | ![Mobile](docs/screenshots/mobile.png) |

---

## ✨ What Beacon Does

Paste any public REST API endpoint and Beacon automatically:

1. **Validates** the endpoint URL
2. **Measures** real-world response performance
3. **Inspects** HTTP headers and security configuration
4. **Analyzes** response payload and content type
5. **Evaluates** API best practices
6. **Calculates** category scores
7. **Generates** an overall API health score
8. **Displays** an interactive report ready to share

```
beacon/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── scan.js
│   │   └── auth.js
│   ├── services/
│   │   ├── performance.js
│   │   ├── security.js
│   │   ├── quality.js
│   │   ├── scoring.js
│   │   └── validator.js
│   ├── middleware/
│   ├── utils/
│   └── config/
│
└── frontend/
    ├── app/
    ├── components/
    │   ├── Hero.tsx
    │   ├── ApiInput.tsx
    │   ├── ScoreCard.tsx
    │   ├── ScoreBreakdown.tsx
    │   ├── ReportSection.tsx
    │   ├── SecurityCard.tsx
    │   ├── PerformanceCard.tsx
    │   ├── ApiQualityCard.tsx
    │   └── Navbar.tsx
    └── lib/
```

---

# 🚀 Getting Started

## Prerequisites

* Node.js 18+
* npm / pnpm
* Railway account
* Vercel account

---

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/beacon.git

cd beacon
```

---

## 2. Configure Environment

Backend

```env
PORT=8000

FRONTEND_URL=http://localhost:3000

JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 3. Install Dependencies

Backend

```bash
cd backend

npm install

npm run dev
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 4. Open Beacon

```
Frontend

http://localhost:3000

Backend

http://localhost:8000
```

---

# 🔌 REST API

## Scan Endpoint

```
POST /api/scan
```

Example Request

```json
{
  "url": "https://jsonplaceholder.typicode.com/posts"
}
```

Example Response

```json
{
  "score": 84,
  "grade": "B",
  "performance": 88,
  "security": 67,
  "apiQuality": 100,
  "bestPractices": 83
}
```

---

## Authentication

```
POST /api/auth/google

POST /api/auth/login

POST /api/auth/register
```

---

# 📊 Scoring System

Beacon evaluates APIs across four categories.

| Category         | Description                                 | Weight |
| ---------------- | ------------------------------------------- | -----: |
| ⚡ Performance    | Response time, payload size, compression    |    35% |
| 🔒 Security      | HTTPS, HSTS, CSP, security headers          |    35% |
| 📄 API Quality   | Status codes, JSON validation, content type |    15% |
| ⭐ Best Practices | Cache headers, versioning, request IDs      |    15% |

Overall Score

```
Performance × 35%

+

Security × 35%

+

API Quality × 15%

+

Best Practices × 15%
```

Grades

|  Score | Grade |
| -----: | :---: |
| 97–100 |   A+  |
|  93–96 |   A   |
|  90–92 |   A−  |
|  87–89 |   B+  |
|  83–86 |   B   |
|  80–82 |   B−  |
|  75–79 |   C+  |
|  70–74 |   C   |
|  60–69 |   D   |
|    <60 |   F   |

---

# 🔍 What Beacon Checks

### ⚡ Performance

* Response Time
* Payload Size
* Compression
* Content Length

### 🔒 Security

* HTTPS
* HSTS
* CSP
* X-Frame-Options
* X-Content-Type-Options
* Referrer Policy
* CORS

### 📄 API Quality

* HTTP Status
* JSON Validation
* Content-Type
* UTF-8 Encoding

### ⭐ Best Practices

* Cache-Control
* API Versioning
* Rate Limit Headers
* Request ID
* Server Information

---

# 🔒 Security

Beacon only scans **publicly accessible HTTP/HTTPS endpoints**.

For security reasons Beacon rejects:

* localhost
* 127.0.0.1
* Private IP ranges
* Internal network addresses

All scan requests are validated before execution to help prevent SSRF attacks.

---

# 🎨 Design System

| Token          | Value     |
| -------------- | --------- |
| Background     | `#FAFAFA` |
| Surface        | `#FFFFFF` |
| Accent         | `#D9FF41` |
| Primary Text   | `#111111` |
| Secondary Text | `#6B7280` |
| Border         | `#EAEAEA` |
| Font           | Geist     |

---

# 📝 Tech Stack

| Layer          | Technology                             |
| -------------- | -------------------------------------- |
| Frontend       | Next.js 15                             |
| Styling        | Tailwind CSS                           |
| Authentication | Google OAuth + JWT                     |
| Backend        | Node.js + Express                      |
| API Requests   | Axios                                  |
| Deployment     | Vercel + Railway                       |
| Database       | PostgreSQL (optional for scan history) |
| Icons          | Lucide                                 |
| Animations     | Framer Motion                          |

---

# 📄 License

MIT License

---

> 🚨 **Beacon — because every API deserves a health check before it goes into production.**
