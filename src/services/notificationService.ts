import amqp from 'amqplib';

export const sendNotification = async (message: string) => {
  try {
    const amqpServer = process.env.RABBITMQ_URL;
    if (!amqpServer) {
      console.error("❌ RABBITMQ_URL belum disetting di .env!");
      return;
    }

    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    const queue = 'notification_queue';
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log("📨 [Node.js] Notifikasi dikirim ke Queue:", message);

    setTimeout(() => {
      connection.close();
    }, 500);
    
  } catch (error) {
    console.error("❌ Gagal mengirim ke RabbitMQ:", error);
  }
};