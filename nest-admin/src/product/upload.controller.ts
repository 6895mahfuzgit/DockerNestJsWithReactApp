import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { AuthGuard } from "../auth/auth.guard";
import { v4 as uuidv4 } from 'uuid';
import { Response } from "express";

@UseGuards(AuthGuard)
@Controller()
export class UploadController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, `${uuidv4()}${file.originalname}`)
      }
    })
  }))

  uploadFile(@UploadedFile() file) {
    console.log(file);

    return {
      url: `http://localhost:8000/api/${file.path}`
    }

  }

    @Get('uploads/:path')
    async getImage(@Param('path') path,@Res() res:Response){
      res.sendFile(path,{root:'./uploads'});
    }

  

}