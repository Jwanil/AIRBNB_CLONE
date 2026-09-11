import { app } from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

async function bootstrap() {
  // Connect to database
  await connectDB();

  // Start HTTP server
  app.listen(env.PORT, () => {
    console.log(`🚀 Airbnb Auth Server running on http://localhost:${env.PORT}`);
    console.log(`📡 Accepting requests from: ${env.CLIENT_URL}`);
    console.log(`🔒 Mode: ${env.NODE_ENV}`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
