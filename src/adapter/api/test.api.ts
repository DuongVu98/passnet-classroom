import { Controller, Get } from "@nestjs/common";
import { SomeService } from "src/usecases/some.service";

@Controller("test")
export class TestApi {
    
    constructor(private someService: SomeService){}

    @Get()
    test(): void {
        this.someService.someExecute();
    }
}