import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CheckOtpAuthDto } from './dto/checkotp-auth.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SendOtpAuthDto } from './dto/getotp-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly userservice: UsersService,
  ) {}
  // Checks if the user with the specified mobile number already exists
  // async checkUserExists(mobile: string): Promise<boolean> {
  //   const existUser = await this.userservice.FindUserByMobile(mobile);
  //   return existUser ? true : false;
  // }

  // // Sends an OTP code to the specified mobile number
  // async sendOtp(mobile: string): Promise<string> {
  //   const otp = Math.floor(1000 + Math.random() * 9000).toString();
  //   await this.cache.set(mobile, otp, 12000);
  //   return otp;
  // }

  // // Registers a new user account
  // async register(registerOtpDto: SendOtpAuthDto): Promise<any> {
  //   // Check if the user already exists
  //   const existUser = await this.checkUserExists(registerOtpDto.mobile);

  //   if (existUser) {
  //     return 'user mobile exist';
  //   }

  //   // Send an OTP code
  //   const otp = await this.sendOtp(registerOtpDto.mobile);

  //   // Validate OTP code
  //   if (!otp && otp !== registerOtpDto.mobile) {
  //     return 'Invalid OTP code';
  //   }

  //   // Create a new user account
  //   const created = await this.userservice.CreateUser({
  //     username: registerOtpDto.username,
  //     mobile: registerOtpDto.mobile,
  //   });

  //   return created;
  // }

  // async SendOtp(check: SendOtpAuthDto): Promise<string> {
  //   const { mobile } = check;
  //   const cheched = await this.cache.get(mobile);
  //   if (cheched) return undefined;
  //   const otpcode = Math.floor(1000 + Math.random() * 9000).toString();
  //   await this.cache.set(mobile, otpcode, 12000);
  //   return otpcode;
  // }
  // async register(registerotp: SendOtpAuthDto): Promise<any> {
  //   const existuser = await this.userservice.FindUserByMobile(
  //     registerotp.mobile,
  //   );
  //   if (existuser) {
  //     return 'user mobile exist';
  //   } else {
  //     const { username, mobile } = registerotp;
  //     const cacheotp = await this.cache.get(mobile);
  //     if (!cacheotp || cacheotp !== code) {
  //       return 'Invited Otp code';
  //     }
  //     const created = await this.userservice.CreateUser({ username, mobile });
  //     return created;
  //   }
  // }

  // async login(loginOtp: CheckOtpAuthDto): Promise<any> {
  //   try {
  //     const { mobile, code } = loginOtp;

  //     // Check if the mobile number exists in the database
  //     const existUser = await this.userservice.FindUserByMobile(mobile);
  //     if (!existUser) {
  //       return 'Mobile number does not exist';
  //     }

  //     // Validate the OTP code
  //     const cachedOtp = await this.cache.get(mobile);
  //     if (!cachedOtp && cachedOtp !== code) {
  //       throw new NotFoundException('Invalid OTP code');
  //     }
  //     return 'Login successfully';
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

  async sendOtp(sendOtpDto: SendOtpAuthDto): Promise<string> {
    const { mobile } = sendOtpDto;
    const cachedOtp = await this.cache.get(mobile);
    if (cachedOtp) return undefined;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await this.cache.set(mobile, otp, 120000);
    return otp;
  }

  async checkOtp(checkOtpDto: CheckOtpAuthDto): Promise<boolean> {
    const { mobile, code } = checkOtpDto;
    const cachedOtp = await this.cache.get(mobile);
    if (cachedOtp && cachedOtp === code) {
      await this.cache.del(mobile);
      return true;
    } else {
      return false;
    }
  }

  async register(registerDto: SendOtpAuthDto): Promise<any> {
    try {
      const { mobile, username } = registerDto;

      // Check if the mobile number already exists
      const existUser = await this.userservice.FindUserByMobile(mobile);

      if (existUser) {
        throw new Error('User with this mobile number already exists');
      }

      // Send OTP to the mobile number
      const otp = await this.sendOtp({
        mobile,
        username: '',
      });

      // Create a new user account if OTP is sent successfully
      if (otp) {
        const created = await this.userservice.CreateUser({
          username,
          mobile,
        });
        return created;
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      return error.message;
    }
  }

  async login(loginDto: CheckOtpAuthDto): Promise<any> {
    try {
      const { mobile, code } = loginDto;

      // Check if the mobile number exists in the database
      const existUser = await this.userservice.FindUserByMobile(mobile);

      if (!existUser) {
        throw new Error('Mobile number does not exist');
      }

      // Verify OTP code
      const isOtpValid = await this.checkOtp({ mobile, code });

      if (isOtpValid) {
        return 'Login successful';
      } else {
        throw new Error('Invalid OTP code');
      }
    } catch (error) {
      return error.message;
    }
  }
}
