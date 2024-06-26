import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Req,
  BadRequestException,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { Public } from './decorators/public.decorator';
import { RegisterUserInput } from './dto/register.input';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ApiKeyParam } from 'src/api-key/decorators/apikey.decorator';
import { ImpersonatorGuard } from 'src/api-key/guards/impersonator.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.login(req.user);
    await this.authService.setRefreshTokenCookie(res, tokens.refresh_token);
    return tokens;
  }

  @Public()
  @Post('register')
  async register(@Body() registrationDetails: RegisterUserInput) {
    return this.authService.register(registrationDetails);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { ...req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('keys')
  getApiKeyForUser(@Request() req, @ApiKeyParam() apiKey) {
    return { api_key: apiKey };
  }

  @Post('refresh')
  async refresh(@Req() request, @Res() res) {
    const refreshToken = request.body.refreshToken;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const newAccessToken = await this.authService.refreshTokens(refreshToken);
      await this.authService.setRefreshTokenCookie(
        res,
        newAccessToken.refresh_token,
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
