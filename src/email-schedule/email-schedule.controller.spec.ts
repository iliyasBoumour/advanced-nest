import { Test, TestingModule } from '@nestjs/testing';
import { EmailScheduleController } from './email-schedule.controller';
import { EmailScheduleService } from './email-schedule.service';

describe('EmailScheduleController', () => {
  let controller: EmailScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailScheduleController],
      providers: [EmailScheduleService],
    }).compile();

    controller = module.get<EmailScheduleController>(EmailScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
