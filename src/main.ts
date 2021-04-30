import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app.module";

console.log(`grpc options --> ${process.env.GRPC_OPTION_URL}`);
const port = process.env.SERVER_PORT_LISTENER;

const configurationOptions = {
	transport: Transport.GRPC,
	options: {
		url: process.env.GRPC_OPTION_URL,
		package: process.env.GRPC_OPTION_PACKAGE,
		protoPath: join(__dirname, process.env.GRPC_CONSUME_EVENTS_PATH),
	},
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const grpcApp = await NestFactory.createMicroservice(AppModule, configurationOptions);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();

	console.log(`server port: ${port}`);
	await app.listen(port);

	grpcApp.listen(() => {
		console.log(`env --> ${process.env.NODE_ENV}`);
	});
}
bootstrap();
