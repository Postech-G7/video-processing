import { validate } from 'class-validator';
import { UpdateVideoDto } from './update-video.dto';

describe('UpdateVideoDto', () => {
  it('should create an instance of UpdateVideoDto with valid fields', async () => {
    const dto = new UpdateVideoDto();
    dto.status = 'completed';
    dto.id = 'video123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Nenhum erro de validação deve ocorrer
  });

  it('should throw validation errors for missing or invalid fields', async () => {
    const dto = new UpdateVideoDto();

    // Campos ausentes
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Deve haver erros de validação
    expect(errors.some((error) => error.property === 'status')).toBe(true);
    expect(errors.some((error) => error.property === 'id')).toBe(true);

    // Validação de status inválido
    dto.status = 'invalid-status' as any; // Forçando um valor inválido
    dto.id = 'video123';
    const statusErrors = await validate(dto);
    expect(statusErrors.length).toBeGreaterThan(0);
    expect(statusErrors[0].property).toBe('status');
    expect(statusErrors[0].constraints).toHaveProperty('isIn');

    // Validação de ID inválido
    dto.status = 'completed';
    dto.id = ''; // Forçando um valor inválido
    const idErrors = await validate(dto);
    expect(idErrors.length).toBeGreaterThan(0);
    expect(idErrors[0].property).toBe('id');
    expect(idErrors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
