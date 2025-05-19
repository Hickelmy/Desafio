import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidade } from '../especialidades/especialidade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>
  ) {}

  async run() {
    const count = await this.especialidadeRepository.count();
    if (count > 0) {
      this.logger.log('Especialidades já existentes — seed ignorada.');
      return;
    }

    const nomes = [
      'Cardiologia',
      'Pediatria',
      'Ortopedia',
      'Ginecologia',
      'Dermatologia',
      'Urologia',
      'Oncologia'
    ];

    const especialidades = nomes.map(nome => this.especialidadeRepository.create({ nome }));
    await this.especialidadeRepository.save(especialidades);

    this.logger.log(`✅ ${especialidades.length} especialidades inseridas com sucesso.`);
  }
}
