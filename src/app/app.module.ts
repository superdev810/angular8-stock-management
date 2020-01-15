import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { 
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatSortModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './api.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
