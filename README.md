# Tugas 8: API Products dengan MongoDB

API Products dengan NestJS dan MongoDB (Mongoose)

## Struktur Folder

```
src/
├── main.ts                          
├── app.module.ts                    
└── products/
    ├── products.module.ts
    ├── products.controller.ts       
    ├── products.service.ts          
    ├── schemas/
    │   └── product.schema.ts       
    └── dto/
        ├── create-product.dto.ts    
        └── update-product.dto.ts    
```
## Daftar Endpoint

| Method | Endpoint                     | Deskripsi                                       |
|--------|------------------------------|-------------------------------------------------|
| POST   | `/products`                  | Menambah produk baru                            |
| GET    | `/products`                  | Mendapatkan semua produk                        |
| GET    | `/products/search?q=keyword` | Mencari produk berdasarkan nama (tambahan)      |
| GET    | `/products/:id`              | Mendapatkan produk berdasarkan ID               |
| PUT    | `/products/:id`              | Mengupdate produk (partial update)              |
| DELETE | `/products/:id`              | Menghapus produk                                |
