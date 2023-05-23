import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDto } from '../../common/dto';
import { generateHash } from '../../common/utils';
import { defaultPassword, UserRole } from '../../constants';
import type { ResetPasswordDto } from './dto/request';
import { User } from './entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findUserByIdOrUsername({ id, username }: { id?: string; username?: string }) {
        return id
            ? this.userRepository.findOne({ where: { id } })
            : this.userRepository.findOne({ where: { username } });
    }

    async getAllParticipants() {
        return this.userRepository.find({ where: { role: UserRole.USER } });
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
