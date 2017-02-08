import { Component } from '@angular/core';
import {PostService} from '../services/post.service';

@Component({
  selector: 'user',
  template: `<h1>
    {{name}} </h1>
    <p> E-mail: {{email}} </p> 
    <p> {{address.street}}, {{address.city}}, {{address.state}} {{address.zip}} </p> 
    <button (click)= "toggleHobbies()"> {{showhobbies ? "Hide " : "Show "}} Hobbies</button>
    <div  *ngIf = "showhobbies">
      <h3> Hobbies </h3>
      <ul>
        <li *ngFor = 'let hobby of hobbies'>
          {{hobby}} <button (click)="deleteHobby(index)">x</button>
        </li>
      </ul>
      <form (submit)= "addHobby(hobby.value)">
        <label>Add hobby:</label><br />
        <input type="text" id="addHobby" #hobby /><br />
      </form>
    </div>
    <br />
    <hr />
    <h3>Edit User</h3>
    <form>
      <label>Name:</label><br />
      <input type="text" name="name" [(ngModel)]="name"/><br />
      <label>E-mail:</label><br />
      <input type="text" name="email" [(ngModel)]="email"/><br />
      <label>Street:</label><br />
      <input type="text" name="address.street" [(ngModel)]="address.street"/><br />
      <label>City:</label><br />
      <input type="text" name="address.city" [(ngModel)]="address.city"/><br />
      <label>State:</label><br />
      <input type="text" name="address.state" [(ngModel)]="address.state"/><br />
    </form>
    
  `,
  providers: [PostService],
})
export class UserComponent  { 
  name: string;
  email: string;
  address: address;
  hobbies: string[];
  showhobbies: boolean;
  posts: Post[];

  constructor(private postService: PostService) {
    this.name = 'Patrick Gomes';
    this.email= 'patrickgomes@gmail.com';
    this.address = {
      street: '326 Old York Rd',
      city: 'Irving',
      state: 'TX',
      zip: 75063 
    }
    this.hobbies = ['Music','Sports','Books']
    this.showhobbies = false;

    this.postService.getPosts().subscribe(posts => {
        this.posts = posts;
        console.log(posts)
    });
  }

  toggleHobbies() {
    this.showhobbies = !this.showhobbies;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
  }

  deleteHobby(i) {
    this.hobbies.splice(i,1);
  }
  
}

interface address {
    street: string;
    city: string;
    state: string;
    zip: number;  
}

interface Post{
    id: number;
    title: string;
    body: string;
}