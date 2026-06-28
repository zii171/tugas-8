import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private validateObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`ID "${id}" tidak valid`);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Product> {
    this.validateObjectId(id);

    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    this.validateObjectId(id);

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true, runValidators: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<{ message: string; deleted: Product }> {
    this.validateObjectId(id);

    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }

    return {
      message: `Produk dengan ID ${id} berhasil dihapus`,
      deleted: deletedProduct,
    };
  }

  async search(query: string): Promise<Product[]> {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Query parameter "q" tidak boleh kosong');
    }

    return this.productModel
      .find({ name: { $regex: query, $options: 'i' } })
      .exec();
  }
}
