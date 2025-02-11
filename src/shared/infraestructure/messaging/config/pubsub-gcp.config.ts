import { PubSub } from '@google-cloud/pubsub';

if (!process.env.GCLOUD_PROJECT_ID) {
  throw new Error('GCLOUD_PROJECT_ID environment variable is not set');
}

const pubsub =
  process.env.NODE_ENV === 'test' || !process.env.NODE_ENV
    ? new PubSub({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFile: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      })
    : new PubSub({
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
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
