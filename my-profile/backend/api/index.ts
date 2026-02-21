import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createServer = async () => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors({
        origin: ['http://localhost:5173', 'https://webprog-2025-2026-t2-react-nestjs241.vercel.app', /\.vercel\.app$/],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.init();
    return server;
};

export default async (req: any, res: any) => {
    console.log('Incoming Vercel Request:', req.url);
    await createServer();
    server(req, res);
};
