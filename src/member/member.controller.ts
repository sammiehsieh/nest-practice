import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Member, MemberService } from './member.service';
import { UpdateMemberDto } from './../dtos/update-memeber.dto';
import { CreateMemberDto } from './../dtos/create-memeber.dto';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  @HttpCode(201)
  postMember(
    @Body(new ValidationPipe()) createMemberDto: CreateMemberDto,
  ): Member {
    return this.memberService.addMember(createMemberDto);
  }

  @Get('all')
  getMember(@Query() query: Member): Member[] {
    return this.memberService.findAllMember(query);
  }

  @Put(':account')
  putMember(
    @Param('account') account: string,
    @Body(new ValidationPipe()) updateMemberDto: UpdateMemberDto,
  ): Member {
    return this.memberService.updateMember(account, updateMemberDto);
  }

  @Delete(':account')
  deleteMemeber(@Param('account') account: string) {
    this.memberService.deleteMember(account);
  }
}
