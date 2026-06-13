import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Optional()
    @InjectRepository(User)
    private readonly userRepository?: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    if (!this.userRepository) {
      return { id: 'demo-user-id', ...data, referralCode: 'BKDEMO1' } as User;
    }
    const user = this.userRepository.create({
      ...data,
      referralCode: this.generateReferralCode(),
    });
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    if (!this.userRepository) return null;
    return this.userRepository.findOne({ where: { id } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    if (!this.userRepository) return null;
    return this.userRepository.findOne({ where: { phone } });
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!this.userRepository) return null;
    return this.userRepository.findOne({ where: { email } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    if (!this.userRepository) return null;
    return this.userRepository.findOne({ where: { googleId } });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    if (!this.userRepository) {
      return { id, ...data } as User;
    }
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async updateWalletBalance(id: string, amount: number): Promise<User> {
    if (!this.userRepository) {
      return { id, walletBalance: amount } as User;
    }
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.walletBalance = Number(user.walletBalance) + amount;
    return this.userRepository.save(user);
  }

  async getAllUsers(page: number = 1, limit: number = 20, role?: UserRole) {
    if (!this.userRepository) {
      return { users: [], pagination: { page, limit, total: 0, totalPages: 0 } };
    }
    const query = this.userRepository.createQueryBuilder('user');
    if (role) {
      query.where('user.role = :role', { role });
    }
    const [users, total] = await query
      .orderBy('user.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      users,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  private generateReferralCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'BK';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
