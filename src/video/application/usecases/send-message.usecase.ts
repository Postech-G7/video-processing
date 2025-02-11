import { publishMessage } from '../../../shared/infraestructure/messaging/config/pubsub-gcp.config';

export namespace SendMessageUseCase {
  export async function execute(data: any) {
    await publishMessage(data);
  }
}
