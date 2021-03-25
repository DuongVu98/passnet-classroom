import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app.module";

// process.on("unhandledRejection", (reason, promise) => {
// 	console.log(`reason --> \n${reason} \n which promise --> \n${JSON.stringify(promise)}`);
// 	promise.catch((error) => {
// 		console.log(error);
// 	});
// });
const port = process.env.SERVER_PORT_LISTENER;

const configurationOptions = {
	transport: Transport.GRPC,
	options: {
		url: process.env.GRPC_OPTION_URL,
		package: process.env.GRPC_OPTION_PACKAGE,
		protoPath: join(__dirname, "proto/consume-events.proto"),
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
