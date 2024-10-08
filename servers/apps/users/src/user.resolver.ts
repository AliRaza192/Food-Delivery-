import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dto/user.dto";
import { RegisterRespose } from "./types/user.type";
import { BadRequestException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Response } from "express";

@Resolver('User')
// useFillters

export class UserResolver {
    constructor(
        private readonly userService: UsersService
    ) { }

    @Mutation(() => RegisterRespose)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context: { res: Response }

    ): Promise<RegisterRespose> {
        if (!registerDto.name || !registerDto.email || !registerDto.password) {
            throw new BadRequestException('Please fill the all fields')
        }

        const user = await this.userService.register(registerDto, context.res)
        return { user }
    }

    @Query(() => [User])
    async getUsers() {
        return this.userService.getUsers()
    }
}