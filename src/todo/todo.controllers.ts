import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";


@Controller('todos')
export class TodoController{
    constructor(private readonly todoService: TodoService){}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTodoDto: CreateTodoDto):Promise<Todo>{
        return this.todoService.create(createTodoDto);
    }

    @Get()
    async findAll(@Query('completed') comopleted?:string):Promise<Todo[]>{
        if(comopleted!==undefined){
            const isCompleted = comopleted === 'tree'
            return this.todoService.findByStatus(isCompleted)
        }
        return this.todoService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id : number):Promise<Todo>{
        return this.todoService.findOne(id);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number):Promise<void>{
        this.todoService.remove(id);
    }

    @Patch('id/toggle')
    async toggleComple(@Param('id', ParseIntPipe) id : number):Promise<Todo>{
        return this.todoService.completeTask(id);
    }
}