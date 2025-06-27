import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-western-union',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './western-union.component.html',
  styleUrl: './western-union.component.css'
})
export class WesternUnionComponent {

}
