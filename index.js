require('dotenv').config(); // Secures variables
const app = require('./utils/app'); // Backend App (server)
const { connectToDatabase } = require('./utils/mongo'); // MongoDB (database)
const { PORT } = require('./constants');
const authRoutes = require('./routes/auth');

async function bootstrap() {
    await connectToDatabase(); // Corrected function call

    app.get('/', (req, res) => res.status(200).json({ message: 'Hello GOUSHIK!' }));
    app.get('/healthz', (req, res) => res.status(200).send());
    app.use(authRoutes);

    app.listen(PORT, () => {
        console.log(`✅ Server is listening on port: ${PORT}`);
    });
}

bootstrap();
