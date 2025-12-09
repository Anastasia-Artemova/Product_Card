import express from "express";
import cors from "cors";
import { error } from "node:console";
import {PrismaClient} from '../generated/prisma/client'
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
    adapter,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const {category} = req.query;
    const products = await prisma.product.findMany({
        where: category ? {
          category: {
            equals: String(category).toLowerCase(),
            mode: 'insensitive'  
          }
        } : undefined
    });
    res.json(products);
  } catch (e: any) {
    console.error("Prisma error in GET /products:", e);
    res.status(500).json({ error: e?.message || "Unknown error" });
  }
});

app.get("/products/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);
        if(Number.isNaN(id)){
            return res.status(400).json({error: "Invalid product id"});
        }
        const product = await prisma.product.findUnique({
            where: {id},
        });
        if(!product){
            return res.status(404).json({error: "No product with the given id found..."});
        }
        res.json(product);
    }
    catch(e){
        res.status(500).json({error: "Failed to fetch the product"});
    }
});

app.post("/products", async(req, res) => {
    try{ 
        const {name, description, price, images, quantity, category} = req.body;
        if(!name || typeof name != "string"){
            return res.status(400).json({error: "Name is required"});
        }
        if(!description || typeof description != "string"){
            return res.status(400).json({error: "Description is required"});
        }
        if(!price || typeof price != "number"){
            return res.status(400).json({error: "Price is required"});
        }
        if(!quantity || typeof quantity != "number"){
            return res.status(400).json({error: "Quantity is required"});
        }
        if(!category || typeof category != "string"){
            return res.status(400).json({error: "Specifying category is required"});
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                images: Array.isArray(images) ? images : [],
                quantity,
                category,
            }
        });
        res.status(201).json(product);
    }
    catch(e){
        res.status(500).json({error: "Failed to post the product"});
    }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
