import {
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsInt,
  IsIn,
  IsEmail,
} from 'class-validator';

export class UpdateMemberDto {
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  age: number;

  @IsOptional()
  @IsIn(['M', 'F'])
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  address: string;
}
