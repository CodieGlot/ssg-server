import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import { generateHash } from '../../common/utils';
import { defaultPassword, UserRole } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { CreateUsersDto, ResetPasswordDto, UserInfoDto } from './dto/request';
import { User } from './entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ApiConfigService
    ) {}

    async findUserByIdOrUsername({ id, username }: { id?: string; username?: string }) {
        return id
            ? this.userRepository.findOne({ where: { id } })
            : this.userRepository.findOne({ where: { username } });
    }

    async getAllParticipants() {
        return this.userRepository.find({ where: { role: UserRole.USER } });
    }

    async createUser(dto: UserInfoDto) {
        const user = await this.findUserByIdOrUsername({ username: dto.username });

        if (user) {
            throw new ConflictException('User already exists');
        }

        const userEntity = this.userRepository.create({
            username: dto.username,
            password: generateHash(dto.password)
        });

        return this.userRepository.save(userEntity);
    }

    async createUsers(dto: CreateUsersDto) {
        const promiseSavedUsers = dto.userInfos.map(async (user) => {
            const hasSavedUser = await this.findUserByIdOrUsername({ username: user.username });

            if (hasSavedUser) {
                return null;
            }

            const userEntity = this.userRepository.create({
                username: user.username,
                password: generateHash(user.password)
            });

            return this.userRepository.save(userEntity);
        });

        return Promise.all(promiseSavedUsers);
    }

    async resetPassByAdmin(id: string) {
        await this.findUserByIdOrUsername({ id });

        await this.userRepository.update(id, { password: generateHash(defaultPassword) });

        return new ResponseDto({ message: 'Reset password successfully' });
    }

    async changePassword(id: string, dto: ResetPasswordDto) {
        if (dto.firstPassword !== dto.secondPassword) {
            throw new BadRequestException('Password not match');
        }

        await this.userRepository.update(id, { password: generateHash(dto.firstPassword) });

        return new ResponseDto({ message: 'Reset password successfully' });
    }

    async deleteUser(id: string): Promise<ResponseDto> {
        await this.findUserByIdOrUsername({ id });

        await this.userRepository.delete(id);

        return new ResponseDto({ message: 'User deleted successfully' });
    }
}
