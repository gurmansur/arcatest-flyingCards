import { PartialType } from '@nestjs/swagger';
import { CreateSuiteDeTesteDto } from './create-suite-de-teste.dto';

export class UpdateSuiteDeTesteDto extends PartialType(CreateSuiteDeTesteDto) {}
