Pengujian API dengan Insomnia


## 1. Pastikan Server Berjalan

```bash
npm run dev

```

Server akan berjalan di `http://localhost:3000`

## 2. Setup Environment di Insomnia

Buka Insomnia, buat environment baru dengan nama `Crowdfunding API` dan tambahkan variable:

- `base_url`: `http://localhost:3000/api/v1`
- `auth_token`: (kosongkan dulu, akan terisi setelah login)

## 3. Uji Endpoint Register

### POST /auth/register

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/auth/register`
3. Headers:
    - Content-Type: application/json
4. Body (JSON):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}

```

1. Expected Response:
    - Status: 201 Created
    - Body:

```json
{
  "message": "User berhasil didaftarkan",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

```

## 4. Uji Endpoint Login

### POST /auth/login

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/auth/login`
3. Headers:
    - Content-Type: application/json
4. Body (JSON):

```json
{
  "email": "john@example.com",
  "password": "password123"
}

```

1. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}

```

1. Simpan token ke environment variable `auth_token` untuk pengujian endpoint lain

## 5. Uji Endpoint Get All Categories

### GET /categories

1. Buat request baru dengan metode GET
2. URL: `{{base_url}}/categories`
3. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil mengambil daftar kategori",
  "data": [
    {
      "id": 1,
      "name": "Teknologi",
      "created_at": "2025-05-05T10:00:00.000Z",
      "updated_at": "2025-05-05T10:00:00.000Z"
    },
    // ... kategori lainnya
  ]
}

```

## 6. Uji Endpoint Create Project

### POST /projects

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/projects`
3. Headers:
    - Content-Type: application/json
    - Authorization: Bearer {{auth_token}}
4. Body (JSON):

```json
{
  "category_id": 1,
  "title": "Project Teknologi Baru",
  "description": "Platform pendidikan berbasis teknologi AI",
  "goal_amount": 100000000,
  "start_date": "2025-05-05",
  "end_date": "2025-12-31"
}

```

1. Expected Response:
    - Status: 201 Created
    - Body:

```json
{
  "message": "Project berhasil dibuat",
  "data": {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Project Teknologi Baru",
    "description": "Platform pendidikan berbasis teknologi AI",
    "goal_amount": "100000000.00",
    "current_amount": "0.00",
    "start_date": "2025-05-05T00:00:00.000Z",
    "end_date": "2025-12-31T00:00:00.000Z",
    "created_at": "2025-05-05T10:00:00.000Z",
    "updated_at": "2025-05-05T10:00:00.000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "category": {
      "id": 1,
      "name": "Teknologi"
    }
  }
}

```

## 7. Uji Endpoint Get All Projects

### GET /projects

1. Buat request baru dengan metode GET
2. URL: `{{base_url}}/projects`
3. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil mengambil daftar project",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "category_id": 1,
      "title": "Project Teknologi Baru",
      "description": "Platform pendidikan berbasis teknologi AI",
      "goal_amount": "100000000.00",
      "current_amount": "0.00",
      "start_date": "2025-05-05T00:00:00.000Z",
      "end_date": "2025-12-31T00:00:00.000Z",
      "created_at": "2025-05-05T10:00:00.000Z",
      "updated_at": "2025-05-05T10:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "category": {
        "id": 1,
        "name": "Teknologi"
      }
    }
  ]
}

```

## 8. Uji Endpoint Get Project by ID

### GET /projects/{id}

1. Buat request baru dengan metode GET
2. URL: `{{base_url}}/projects/1`
3. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil mengambil detail project",
  "data": {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Project Teknologi Baru",
    "description": "Platform pendidikan berbasis teknologi AI",
    "goal_amount": "100000000.00",
    "current_amount": "0.00",
    "start_date": "2025-05-01T00:00:00.000Z",
    "end_date": "2025-12-31T00:00:00.000Z",
    "created_at": "2025-05-05T10:00:00.000Z",
    "updated_at": "2025-05-05T10:00:00.000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "category": {
      "id": 1,
      "name": "Teknologi"
    }
  }
}

```

## 9. Uji Endpoint Create Comment

### POST /projects/{id}/comments

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/projects/1/comments`
3. Headers:
    - Content-Type: application/json
    - Authorization: Bearer {{auth_token}}
4. Body (JSON):

```json
{
  "comment": "Project yang sangat menarik!"
}

```

1. Expected Response:
    - Status: 201 Created
    - Body:

```json
{
  "message": "Komentar berhasil dibuat",
  "data": {
    "id": 1,
    "user_id": 1,
    "project_id": 1,
    "comment": "Project yang sangat menarik!",
    "created_at": "2025-05-05T10:00:00.000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "project": {
      "id": 1,
      "title": "Project Teknologi Baru"
    }
  }
}

```

## 10. Uji Endpoint Become Backer

### POST /projects/{id}/backers

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/projects/1/backers`
3. Headers:
    - Content-Type: application/json
    - Authorization: Bearer {{auth_token}}
4. Body (JSON):

```json
{
  "amount": 1000000
}

```

1. Expected Response:
    - Status: 201 Created
    - Body:

```json
{
  "message": "Berhasil menjadi backer",
  "data": {
    "id": 1,
    "user_id": 1,
    "project_id": 1,
    "amount": "1000000.00",
    "created_at": "2025-05-05T10:00:00.000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "project": {
      "id": 1,
      "title": "Project Teknologi Baru"
    }
  }
}

```

## 11. Uji Endpoint Payment Checkout

### POST /payments/checkout

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/payments/checkout`
3. Headers:
    - Content-Type: application/json
    - Authorization: Bearer {{auth_token}}
4. Body (JSON):

```json
{
  "project_id": 1,
  "amount": 1000000,
  "payment_method": "bank_transfer"
}

```

1. Expected Response:
    - Status: 201 Created
    - Body:

```json
{
  "message": "Pembayaran berhasil diproses",
  "data": {
    "id": 1,
    "backer_id": 1,
    "status": "success",
    "payment_method": "bank_transfer",
    "payment_date": "2025-05-05T10:00:00.000Z",
    "created_at": "2025-05-05T10:00:00.000Z",
    "backer": {
      "id": 1,
      "user_id": 1,
      "project_id": 1,
      "amount": "1000000.00",
      "created_at": "2025-05-05T10:00:00.000Z"
    }
  }
}

```

## 12. Uji Endpoint Get Project Backers

### GET /projects/{id}/backers

1. Buat request baru dengan metode GET
2. URL: `{{base_url}}/projects/1/backers`
3. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil mengambil daftar backers",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "project_id": 1,
      "amount": "1000000.00",
      "created_at": "2025-05-05T10:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}

```

## 13. Uji Endpoint Get Project Comments

### GET /projects/{id}/comments

1. Buat request baru dengan metode GET
2. URL: `{{base_url}}/projects/1/comments`
3. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil mengambil daftar komentar",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "project_id": 1,
      "comment": "Project yang sangat menarik!",
      "created_at": "2025-05-05T10:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}

```

## 14. Uji Endpoint Get Projects by User ID

### GET /projects/user/{user_id}

1. Buat request baru dengan metode GET
2. URL: `{{base_url}}/projects/user/1`
3. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil mengambil daftar project untuk user ID 1",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "category_id": 1,
      "title": "Project Teknologi Baru",
      "description": "Platform pendidikan berbasis teknologi AI",
      "goal_amount": "100000000.00",
      "current_amount": "1000000.00",
      "start_date": "2025-05-05T00:00:00.000Z",
      "end_date": "2025-12-31T00:00:00.000Z",
      "created_at": "2025-05-05T10:00:00.000Z",
      "updated_at": "2025-05-05T10:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "category": {
        "id": 1,
        "name": "Teknologi"
      }
    }
  ]
}

```

## 15. Uji Endpoint Get Projects by Category ID

### GET /projects/category/{category_id}

1. Buat request baru dengan metode GET
2. URL: `{{base_url}}/projects/category/1`
3. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil mengambil daftar project untuk kategori ID 1",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "category_id": 1,
      "title": "Project Teknologi Baru",
      "description": "Platform pendidikan berbasis teknologi AI",
      "goal_amount": "100000000.00",
      "current_amount": "1000000.00",
      "start_date": "2025-05-05T00:00:00.000Z",
      "end_date": "2025-12-31T00:00:00.000Z",
      "created_at": "2025-05-05T10:00:00.000Z",
      "updated_at": "2025-05-05T10:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "category": {
        "id": 1,
        "name": "Teknologi"
      }
    }
  ]
}

```

## 16. Uji Endpoint Forgot Password

### POST /auth/forgot-password

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/auth/forgot-password`
3. Headers:
    - Content-Type: application/json
4. Body (JSON):

```json
{
  "email": "john@example.com"
}

```

1. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Jika email terdaftar, link reset password akan dikirim"
}

```

## 17. Uji Endpoint Logout

### POST /auth/logout

1. Buat request baru dengan metode POST
2. URL: `{{base_url}}/auth/logout`
3. Headers:
    - Authorization: Bearer {{auth_token}}
4. Expected Response:
    - Status: 200 OK
    - Body:

```json
{
  "message": "Berhasil logout"
}

```

## 18. Uji Validasi Error

Coba beberapa skenario error untuk memastikan validasi berjalan:

1. Register tanpa nama:

```json
{
  "email": "john2@example.com",
  "password": "password123",
  "role": "user"
}

```

Expected Response:

```json
{
  "errors": [
    {
      "msg": "Nama harus diisi",
      "param": "name",
      "location": "body"
    }
  ]
}

```

1. Login dengan password salah:

```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}

```

Expected Response:

```json
{
  "error": "Email atau password salah"
}

```

1. Create project tanpa autentikasi
Hapus header Authorization dan coba kirim request
Expected Response:

```json
{
  "error": "Token tidak ditemukan"
}

```
