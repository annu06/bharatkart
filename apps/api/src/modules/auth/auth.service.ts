import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async sendOtp(phone: string): Promise<{ message: string; success: boolean }> {
    // Validate phone format (Indian mobile numbers)
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      throw new BadRequestException('Invalid Indian phone number');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // In production, send via MSG91 or similar service
    // For development, log the OTP
    console.log(`[DEV] OTP for ${phone}: ${otp}`);

    // Store OTP in Redis with 5-minute expiry
    // await this.redisService.set(`otp:${phone}`, otp, 300);

    // TODO: Integrate MSG91 SMS API
    // await this.smsService.send(phone, `Your BharatKart OTP is ${otp}`);

    return { message: 'OTP sent successfully', success: true };
  }

  async verifyOtp(phone: string, otp: string) {
    // In development, accept "123456" as valid OTP
    const isDev = this.configService.get('NODE_ENV') === 'development';
    const isValidOtp = isDev ? otp === '123456' : await this.validateOtp(phone, otp);

    if (!isValidOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    // Find or create user
    let user = await this.usersService.findByPhone(phone);
    if (!user) {
      user = await this.usersService.create({
        phone,
        role: UserRole.CUSTOMER,
      });
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      ...tokens,
    };
  }

  async googleAuth(idToken: string, accessToken: string) {
    // Verify Google ID token
    // In production, use Google's token verification
    // const ticket = await this.googleClient.verifyIdToken({ idToken });

    // For now, decode the token (in production, properly verify)
    const payload = this.jwtService.decode(idToken) as any;

    if (!payload?.email) {
      throw new UnauthorizedException('Invalid Google token');
    }

    // Find or create user
    let user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      user = await this.usersService.create({
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        avatar: payload.picture,
        googleId: payload.sub,
        role: UserRole.CUSTOMER,
        isEmailVerified: true,
      });
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET') || 'default-dev-refresh-secret',
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user.id, user.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string) {
    // Blacklist the refresh token in Redis
    // await this.redisService.set(`blacklist:${refreshToken}`, '1', 604800);
    return { message: 'Logged out successfully' };
  }

  private generateTokens(userId: string, role: UserRole) {
    const payload = { sub: userId, role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET') || 'default-dev-secret-change-in-production',
      expiresIn: '7d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET') || 'default-dev-refresh-secret',
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  private async validateOtp(phone: string, otp: string): Promise<boolean> {
    // Retrieve OTP from Redis and validate
    // const storedOtp = await this.redisService.get(`otp:${phone}`);
    // return storedOtp === otp;
    return otp === '123456'; // Fallback for development
  }
}
