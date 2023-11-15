import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
    

    @IsNotEmpty()
    @ApiProperty()
    username: string;



    @IsNotEmpty()
    @ApiProperty()
    master_password: string;
  }
  