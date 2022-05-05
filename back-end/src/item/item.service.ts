import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
 constructor(@InjectRepository(Item) private readonly repository: Repository<Item>) { }

 create(createItemDto: CreateItemDto): Promise<Item> {
   const item = this.repository.create(createItemDto);
   return this.repository.save(item);
 }

 async findAll(filter?: string): Promise<Item[]> {
   if (filter){
     console.log(filter)
     const item = await this.repository.find({name: ILike('%'+filter+'%')});
     if (item.length == 0){
      throw new NotFoundException(`Item ${filter} not found`);
   }
    return item;
     
   }
   return this.repository.find({order: {name: 'ASC'}});
 }

 async findOne(id: string): Promise<Item> {
   const item = await this.repository.findOne(id);
   if (!item){
      throw new NotFoundException(`Item ${id} not found`);
   }
   return item;
 }

 async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
   const item = await this.repository.preload({
     id: id,
     ...updateItemDto,
   });
   if (!item) {
     throw new NotFoundException(`Item ${id} not found`);
   }
   return this.repository.save(item);
 }

 async remove(id: string) {
   const item = await this.findOne(id);
   return this.repository.remove(item);
 }
}
