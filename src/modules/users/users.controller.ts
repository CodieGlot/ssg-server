import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiAcceptedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseDto } from '../../common/dto';
import { UserRole } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { ResetPasswordDto } from './dto/request';
import { User } from './entities';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    @Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: User,
        description: 'Get user by id'
    })
    @ApiOperation({ summary: 'Get user by id' })
    async getUserByUsername(@Param('id') id: string) {
        const user = await this.usersService.findUserByIdOrUsername({ id });

        return user?.toResponseDto();
    }

    @Patch('reset-password/:id')
    @Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ResponseDto,
        description: 'Reset password by admin'
    })
    @ApiOperation({ summary: 'Reset password by admin' })
    async resetPassByAdmin(@Param('id') id: string) {
        return this.usersService.resetPassByAdmin(id);
    }

    @Patch('reset-password')
    @Auth([UserRole.ADMIN, UserRole.USER])
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiAcceptedResponse({
        type: ResponseDto,
        description: 'Reset password successfully'
    })
    @ApiOperation({ summary: 'Reset password' })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @AuthUser() user: User) {
        return this.usersService.changePassword(user.id, resetPasswordDto);
    }

    @Delete(':id')
    @Auth([UserRole.ADMIN])
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiAcceptedResponse({
        type: ResponseDto,
        description: 'Delete user successfully'
    })
    @ApiOperation({ summary: 'Delete user by id' })
    async deleteUserById(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
