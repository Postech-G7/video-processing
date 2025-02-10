import { VideoValidatorFactory } from './video.validator';
import { EntityValidationError } from '../../../shared/domain/errors/validation-error';
import { VideoProps } from '../entities/video.entity';

describe('VideoValidator', () => {
  describe('validate', () => {
    it('should validate a valid VideoProps object', () => {
      const validData: VideoProps = {
        base64: 'base64-encoded-string',
        title: 'Test Video',
        status: 'processing', // Agora o TypeScript sabe que deve ser um dos literais permitidos
        userId: 'user123',
        userEmail: 'test@example.com',
        createdAt: new Date(),
      };
      const validator = VideoValidatorFactory.create();
      const isValid = validator.validate(validData);
      expect(isValid).toBe(true);
    });

    it('should return false and populate errors for invalid data', () => {
      const invalidData = {
        base64: '', // Inválido (vazio)
        title: '', // Inválido (vazio)
        status: 'completed' as const, // Inválido (não está no conjunto permitido)
        userId: '', // Inválido (vazio)
        userEmail: 'invalid-email', // Inválido (não é um email válido)
        createdAt: 'not-a-date' as any, // Inválido (não é uma data)
      };
      const validator = VideoValidatorFactory.create();
      const isValid = validator.validate(invalidData);
      expect(isValid).toBe(false);
      expect(validator.errors).toBeDefined();
      expect(validator.errors.length).toBeGreaterThan(0);

      // Verifica alguns dos erros específicos
      /*   expect(
        validator.errors.some((error) => error.property === 'base64'),
      ).toBe(true);
      expect(validator.errors.some((error) => error.property === 'title')).toBe(
        true,
      );
      expect(
        validator.errors.some((error) => error.property === 'status'),
      ).toBe(true);
      expect(
        validator.errors.some((error) => error.property === 'userId'),
      ).toBe(true);
      expect(
        validator.errors.some((error) => error.property === 'userEmail'),
      ).toBe(true);
      expect(
        validator.errors.some((error) => error.property === 'createdAt'),
      ).toBe(true); */
    });

    it('should throw EntityValidationError if validation fails', () => {
      const invalidData: VideoProps = {
        base64: '', // Inválido (vazio)
        title: '', // Inválido (vazio)
        status: 'failed', // Inválido (não está no conjunto permitido)
        userId: '', // Inválido (vazio)
        userEmail: 'invalid-email', // Inválido (não é um email válido)
        createdAt: 'not-a-date' as any, // Inválido (não é uma data)
      };
      const validator = VideoValidatorFactory.create();
      expect(() => {
        if (!validator.validate(invalidData)) {
          throw new EntityValidationError(validator.errors);
        }
      }).toThrow(EntityValidationError);
    });
  });
});
