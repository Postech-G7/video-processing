import { validate } from 'class-validator';
import { UploadVideoDto } from './upload-video.dto';

describe('UploadVideoDto', () => {
  it('should create an instance of UploadVideoDto with valid fields', async () => {
    const dto = new UploadVideoDto();
    dto.file = 'mock-file-content'; // Simulando um arquivo válido
    dto.jwtToken = 'valid-jwt-token';

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Nenhum erro de validação deve ocorrer
  });

  it('should throw validation errors for missing or invalid fields', async () => {
    const dto = new UploadVideoDto();

    // Campos ausentes
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Deve haver erros de validação
    expect(errors.some((error) => error.property === 'file')).toBe(true);
    expect(errors.some((error) => error.property === 'jwtToken')).toBe(true);

    // Validação de file inválido
    dto.file = ''; // Forçando um valor inválido
    dto.jwtToken = 'valid-jwt-token';
    const fileErrors = await validate(dto);
    expect(fileErrors.length).toBeGreaterThan(0);
    expect(fileErrors[0].property).toBe('file');
    expect(fileErrors[0].constraints).toHaveProperty('isNotEmpty');

    // Validação de jwtToken inválido
    dto.file = 'mock-file-content';
    dto.jwtToken = ''; // Forçando um valor inválido
    const tokenErrors = await validate(dto);
    expect(tokenErrors.length).toBeGreaterThan(0);
    expect(tokenErrors[0].property).toBe('jwtToken');
    expect(tokenErrors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
