import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(){
    return window.localStorage['jwtToken'];
  }

  saveToken(token) {
    localStorage.setItem("jwtToken", token);
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  getPlayer(){
    return window.localStorage['player'];
  }

  savePlayer(token) {
    localStorage.setItem("player", JSON.stringify(token));
  }

  destroyPlayer() {
    window.localStorage.removeItem('player');
  }
}