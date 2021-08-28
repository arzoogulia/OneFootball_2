import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlayerDataService} from '../services/playerData.service';
import {Player, PlayerInfo} from '../services/playerDataType';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  searchText: '';
  data: Player;
  profileData: PlayerInfo;
  errorFlag = false;
  flag1 = false;
  submittedid: string;
  submittedactive: string;
  submittedprofileid: string;
  age: string;
  picture: string;
  role: string;
  team: string;
  id: string;

  constructor(private route: Router,
              private playerData: PlayerDataService) {
  }

  ngOnInit(): void {
  }

  onSubmit(searchText) {
    this.playerData.dataAPI(searchText).subscribe((data: Player) => {
      this.data = data;
      this.submittedactive = this.data.active;
      this.submittedid = this.data.id;
      this.submittedprofileid = this.data['profile-id'];

      if (this.data != null) {
        if (this.data.active === 'true') {
          this.playerData.profileAPI(this.data['profile-id']).subscribe((infoData: PlayerInfo) => {
            this.flag1 = true;
            this.profileData = infoData;
            this.id = this.profileData.id;
            this.age = this.profileData.profile.age;
            this.role = this.profileData.profile.role;
            this.team = this.profileData.profile.team;
            this.picture = this.profileData.profile.picture;
          });
        } else {
          this.errorFlag = true;
          this.flag1 = false;
        }
      }
    }, (error) => {
      console.log('Error', error);
      this.errorFlag = true;
      this.flag1 = false;
    });
    this.searchText = '';
    this.errorFlag = false;
  }

}
