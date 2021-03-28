import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

const config = {
	envFilePath: `${process.env.ENV_PATH}/.${process.env.NODE_ENV}.env`,
};

@Module({
	imports: [ConfigModule.forRoot(config)],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class AppConfigModule {}
