import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ColaboradorAtual = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentColaborator;
  },
);
