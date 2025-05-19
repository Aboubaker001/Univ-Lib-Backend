# 🚀 Getting Started

First install dependencies:
```
bash
npm install
```

Then build the application:
```bash
npm run build
```

To start the application run:
```bash
npm run start
```

# 📚 Book API Documentation

## Base URL
```
http://localhost:5000
```

---

## 1. 📘 Create Book

**Endpoint:**  
```
POST /api/book/
```

**Description:**  
Creates a new book entry.

**Request Body:**
```json
{
  "title": "string (min 3 characters)",
  "edition": "string",
  "isbn": "string (exactly 10 characters)",
  "publisher": "string",
  "publicationYear": number,
  "pageCout": number (positive),
  "language": "string",
  "digitalCopyUrl": "string (valid URL)",
  "keywords": ["string", ...],
  "authors": ["string", ...]
}
```

**Response (Success):**
```json
{
  "ok": true,
  "msg": "Book created successfully"
}
```

**Response (Failure):**
```json
{
  "ok": false,
  "msg": "Validation error or creation failed"
}
```

---

## 2. 🖼️ Upload Book Image

**Endpoint:**  
```
POST /api/image/:id
```

**Description:**  
Uploads a JPG or JPEG image for a book by its ID.

**Path Parameter:**
- `id` — Book ID

**Form Data:**
- `image` — File (JPG or JPEG)

**Headers:**
```
Content-Type: multipart/form-data
```

**Response (Success):**
```json
{
  "ok": true,
  "msg": "Image uploaded successfully"
}
```

**Response (Failure):**
```json
{
  "ok": false,
  "msg": "Invalid file type or upload failed"
}
```

---

## 3. 📚 Get Book List

**Endpoint:**  
```
GET /api/book/all
```

**Description:**  
Retrieves a list of all books.

**Response (Success):**
```json
{
  "ok": true,
  "data": [ /* array of book objects */ ]
}
```

**Response (Failure):**
```json
{
  "ok": false,
  "msg": "Failed to fetch books"
}
```

---

## 4. 📖 Get Specific Book

**Endpoint:**  
```
GET /api/book/:id
```

**Description:**  
Retrieves a specific book by its ID.

**Path Parameter:**
- `id` — Book ID

**Response (Success):**
```json
{
  "ok": true,
  "data": { /* book object */ }
}
```

**Response (Failure):**
```json
{
  "ok": false,
  "msg": "Book not found or invalid ID"
}
```