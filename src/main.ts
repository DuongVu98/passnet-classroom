import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// process.on("unhandledRejection", (reason, promise) => {
// 	console.log(`reason --> \n${reason} \n which promise --> \n${JSON.stringify(promise)}`);
// 	promise.catch((error) => {
// 		console.log(error);
// 	});
// });
const port = process.env.SERVER_PORT_LISTENER;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	console.log(`env --> ${process.env.NODE_ENV}`);

	await app.listen(port);
}
bootstrap();
