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
		url: "localhost:50051",
		package: "consumeEvents",
		protoPath: join(__dirname, "proto/consume-events.proto"),
	},
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const grpcApp = await NestFactory.createMicroservice(AppModule, configurationOptions);

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    
	grpcApp.listen(() => {
		console.log(`env --> ${process.env.NODE_ENV}`);
	});
	console.log(`env --> ${process.env.NODE_ENV}`);

	await app.listen(port);
}
bootstrap();
