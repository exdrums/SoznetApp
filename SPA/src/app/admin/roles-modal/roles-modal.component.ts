import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from '../../../../node_modules/ngx-bootstrap';
import { User } from '../../_models/User';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {

  @Output() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];

constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
