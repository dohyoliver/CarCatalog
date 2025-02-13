import { PartialType } from '@nestjs/mapped-types';
import { CreateCarcatalogDto } from './create-carcatalog.dto';
import {IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarcatalogDto extends PartialType(CreateCarcatalogDto) {
        @IsString()
        @ApiProperty({
            example: "Mazda"
        })
        vehicle:string
        
        @IsString()
        @ApiProperty({
            example: "SUV"
        })
        type:string
        
        @IsString()
        @ApiProperty({
            example: "red"
        })
        color:string
    
        @IsString()
        @ApiProperty({
            example: "gasoline"
        })
        fuel:string
    
        @IsString()
        @ApiProperty({
            example: "Kia"
        })
        manufacturer:string
    
        @IsString()
        @ApiProperty({
            example: "1500"
        })
        mass:number
}
