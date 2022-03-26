import { CreateEmailDto } from './dto/create-email.dto';
import { Email } from './entities/Email.entity';

interface IEmailService {
  addEmail(email: CreateEmailDto): Promise<Email>;
  getAllEmails({}): Promise<{ data: Email[] }>;
}

export default IEmailService;
