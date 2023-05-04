import { Profile } from '../../../entities';

export class CreateChatDto {
  users: [Profile, Profile];
}
