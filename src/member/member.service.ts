import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMemberDto } from './../dtos/create-memeber.dto';
import { UpdateMemberDto } from './../dtos/update-memeber.dto';

export interface Member {
  account: string;
  password: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  address: string;
}

@Injectable()
export class MemberService {
  members: Member[] = [];

  addMember(createMemberDto: CreateMemberDto) {
    const { account, password, name, age, gender, email, address } =
      createMemberDto;
    if (this.members.some((el) => el.account === account)) {
      throw new HttpException('MEMBER_EXIST', HttpStatus.BAD_REQUEST);
    }
    this.members.push({ account, password, name, age, gender, email, address });
    return this.members.find((el) => el.account === account);
  }

  findAllMember(data: Member): Member[] {
    return this.members.filter((el) => {
      const accountCond = data.account ? el.account === data.account : true;
      const nameCond = data.name ? el.name === data.name : true;
      const ageCond = data.age ? el.age === data.age : true;
      const genderCond = data.gender ? el.gender === data.gender : true;
      const emailCond = data.email ? el.email === data.email : true;
      const addressCond = data.address ? el.address === data.address : true;
      return (
        accountCond &&
        nameCond &&
        ageCond &&
        genderCond &&
        emailCond &&
        addressCond
      );
    });
  }

  updateMember(account: string, updateMemberDto: UpdateMemberDto): Member {
    const myMember = this.members.find((el) => el.account === account);
    if (!myMember) {
      throw new HttpException('MEMBER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }
    if (updateMemberDto.password) {
      myMember.password = updateMemberDto.password;
    }
    if (updateMemberDto.name) {
      myMember.name = updateMemberDto.name;
    }
    if (updateMemberDto.age) {
      myMember.age = updateMemberDto.age;
    }
    if (updateMemberDto.gender) {
      myMember.gender = updateMemberDto.gender;
    }
    if (updateMemberDto.email) {
      myMember.email = updateMemberDto.email;
    }
    if (updateMemberDto.address) {
      myMember.address = updateMemberDto.address;
    }
    return myMember;
  }

  deleteMember(account: string) {
    const myMember = this.members.find((el) => el.account === account);
    if (!myMember) {
      throw new HttpException('MEMBER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }
    this.members = this.members.filter((el) => el.account !== account);
  }
}
