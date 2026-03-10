import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class TodoService{
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ){}

    async create(createTodoDto:CreateTodoDto) :Promise<Todo> {
        const todo = this.todoRepository.create(createTodoDto)
        return await this.todoRepository.save(todo);
    }

    async findAll():Promise<Todo[]>{
        return await this.todoRepository.find({
            order: {
                priority: 'DESC',
                createAt: 'DESC',
            },
        });
    }
    async findOne(id: number):Promise<Todo>{
        const todo = await this.findOne(id);
        return todo;
    }
    async remove(id: number):Promise<void>{
        const todo = await this.findOne(id);
        await this.todoRepository.remove(todo);
    }

    async completeTask(id:number) :Promise<Todo> {
        const todo = await this.findOne(id);
        todo.completed = !todo.completed;
        return await this.todoRepository.save(todo);
    }

    async findByStatus(completed: boolean): Promise<Todo[]> {
        return await this.todoRepository.find({
        where: { completed },
        order: { priority: 'DESC' },
        });
    }


}