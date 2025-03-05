import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models';

@Component({
  selector: 'app-users-details',
  standalone: false,
  
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss'
})
export class UsersDetailsComponent implements OnInit {
  user: User | null = null
  constructor(private userService: UsersService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.userService.getUserDetails(this.route.snapshot.params['id']).subscribe({
      next: (data)=>{
        this.user = data
      },
      complete: ()=>{},
      error: ()=>{}
    })
  }

  

}
