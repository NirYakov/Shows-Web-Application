import { Injectable } from '@angular/core';
import { Clip } from './clip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { ShowGame } from '../shows-game/shows-game-highlow/showGame.model';

@Injectable({
  providedIn: 'root'
})
export class ClipsService {

  basePath = `http://localhost:3000`


  constructor(private http: HttpClient) { }



  getClips(routId: string) {

    console.log("GetClips Front");


  }


  addClip(category: string, ytLink: string, userId: string) {

  }

  updateInternal() {

  }


  //   addPost(title: string, content: string) {
  //     const post: Post = { id: "", title: title, content: content };

  //     this.http.post(this.basePath + "/posts", post )
  //     .subscribe((responseData) =>
  //     {
  //         console.log(responseData);
  //         this.posts.push(post);
  //         this.postUpdate.next([...this.posts]);

  //     });

  // }

  // getPosts() {
  //   this.http.get<{ message: string, posts: Post[] }>(this.basePath + "/posts")
  //       .subscribe((postData) => {
  //           this.posts = postData.posts;
  //           this.postUpdate.next([...this.posts]);
  //       });

  //   // return [...this.posts];
  // }


  shows: ShowGame[] = [
    {
      title: "Rick and Morty",
      img: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_Ratio0.6716_AL_.jpg",
      rating: 9.1,
    },
    {
      title: "Better Call Saul",
      img: "https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_Ratio0.6716_AL_.jpg",
      rating: 8.9,
    },
    {
      title: "Breaking Bad",
      img: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_Ratio0.6716_AL_.jpg",
      rating: 9.4,
    },
    {
      title: "Peaky Blinders",
      img: "https://m.media-amazon.com/images/M/MV5BZjYzZDgzMmYtYjY5Zi00YTk1LThhMDYtNjFlNzM4MTZhYzgyXkEyXkFqcGdeQXVyMTE5NDQ1MzQ3._V1_Ratio0.7910_AL_.jpg",
      rating: 8.7,

    },
    {
      title: "Friends",
      img: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_Ratio0.6716_AL_.jpg",
      rating: 8.8,

    },
    {
      title: "Seinfeld",
      img: "https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_Ratio0.7015_AL_.jpg",
      rating: 8.9,
    },

  ];

}
