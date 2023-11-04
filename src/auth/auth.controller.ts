import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from "./dto";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CookieService } from "./cookie.service";
import { Response } from "express";
import { AuthGuard } from "./auth.guard";
import { SessionInfo } from "./sessionInfo.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post("signUp")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async signUp(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signUp(body.email, body.password);

    this.cookieService.setToken(res, accessToken);
  }

  @Post("signIn")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInBodyDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signIn(body.email, body.password);

    this.cookieService.setToken(res, accessToken);
  }

  @Post("signOut")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get("session")
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
