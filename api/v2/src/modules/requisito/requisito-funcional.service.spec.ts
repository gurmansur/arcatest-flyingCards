import { Test, TestingModule } from '@nestjs/testing';
import { RequisitoService } from './requisito-funcional.service';

describe('RequisitoService', () => {
  let service: RequisitoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequisitoService],
    }).compile();

    service = module.get<RequisitoService>(RequisitoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
