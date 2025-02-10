import { PubSub } from '@google-cloud/pubsub';
import * as path from 'path';

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  throw new Error(
    'GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set',
  );
}

const keyFilePath = path.resolve(
  process.cwd(),
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
);
const pubsub = new PubSub({
  keyFilename: keyFilePath,
  projectId: process.env.GCLOUD_PROJECT_ID,
});

if (!process.env.GCLOUD_PUBSUB_TOPIC) {
  throw new Error('GCLOUD_PUBSUB_TOPIC environment variable is not set');
}

export const topic = pubsub.topic(process.env.GCLOUD_PUBSUB_TOPIC);

export const publishMessage = async (data: any) => {
  try {
    const messageId = await topic.publish(Buffer.from(JSON.stringify(data)));
    console.log(`Message ${messageId} published.`);
    return messageId;
  } catch (error) {
    console.error('Error publishing message:', error);
    throw error;
  }
};
