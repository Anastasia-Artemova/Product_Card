# Product API – Backend Service
This is the backend API for the Product Shop application.
It is built using Node.js, TypeScript, Express, and Prisma ORM with a PostgreSQL database.

# Running the Project
1. Install dependencies
   ``` bash
   npm install
   ```
2. Configure environment variables
   Create a .env file in the project root:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/yourdb?schema=public"
   ```
3. Apply Prisma migrations
   ```bash
   npx prisma migrate dev
   ```
4. Seed the database (optional)
   ```bash
   npm run seed
   ```
5. Start the development server
   ```bash
   npm run dev
   ```
6. Build for production
   ```bash
   npm run build
   ```
7. Start in production mode
  ```bash
  npm start
  ```

# API Endpoints
GET /products
Returns a list of all products.

GET /products/:id
Returns a single product by ID.

POST /products
Creates a new product.

DELETE /products/:id
Deletes a product.

Expected json body:
```json
{
  "name": "New Product",
  "description": "New Product description",
  "price": 29.99,
  "category": "Electronics",
  "quantity": 5,
  "images": ["https://example.com/img1.jpg"]
}
```

# Live API
👉 https://product-card-d1jl.onrender.com

### Example endpoints
- `GET /products`  
  https://product-card-d1jl.onrender.com/products
