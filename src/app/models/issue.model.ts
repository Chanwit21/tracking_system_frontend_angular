import { Status } from './status.model';
import { Type } from './type.model';
import { User } from './user.model';

export class Issue {
  id: string;
  title: string;
  description: string;
  attachment: string;
  createDate: Date;
  updateAtDateTime: Date;
  assignTo: User;
  createBy: User;
  type: Type;
  status: Status;

  constructor(
    id: string = '',
    title: string = '',
    description: string = '',
    attachment: string = '',
    createDate: Date = new Date(),
    updateAtDateTime: Date = new Date(),
    assignTo: User = new User(),
    createBy: User = new User(),
    type: Type = new Type(),
    status: Status = new Status()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.attachment = attachment;
    this.createDate = createDate;
    this.updateAtDateTime = updateAtDateTime;
    this.assignTo = assignTo;
    this.createBy = createBy;
    this.type = type;
    this.status = status;
  }
}
