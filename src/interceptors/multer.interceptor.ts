import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';

export const MulterInterceptor = FileInterceptor('image', {
  storage: memoryStorage(),
});
