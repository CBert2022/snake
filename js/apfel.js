"use strict";

class Apfel {
  constructor(dasSpfl) {
    this.zSpielfeld = dasSpfl; // das Spld übergeben von spielfeld
    this.spalte = null;
    this.zeile = null;

    this.farbe = "darkred";
    this.c = this.zSpielfeld.c;
    this.pixFeld = this.zSpielfeld.pixFeld;
    this.img = new Image();
    this.img.src = "./img/apple.png";
    this.newPosition();
    this.apfelAufSchlange = false;
  }

  newPosition() {
    let neuepos = false;
    let koerper = this.zSpielfeld.schlange.koerper;
    console.log("newPos");
    do {
      neuepos = false;
      this.spalte = Math.floor(Math.random() * this.zSpielfeld.anzFelder);
      this.zeile = Math.floor(Math.random() * this.zSpielfeld.anzFelder);
      if (
        this.spalte == this.zSpielfeld.schlange.spalte &&
        this.zeile == this.zSpielfeld.schlange.zeile
      ) {
        neuepos = true;
        console.log(
          "Treffer Kopf" +
            this.spalte +
            "-" +
            this.zeile +
            "-" +
            this.zSpielfeld.schlange.spalte +
            "-" +
            this.zSpielfeld.schlange.zeile
        );
      }
      for (let z = 0; z < koerper.length; z++) {
        if (this.spalte == koerper[z][0] && this.zeile == koerper[z][1]) {
          neuepos = true;
          console.log(
            "Treffer Koerper" +
              this.spalte +
              "-" +
              this.zeile +
              "-" +
              koerper[z][0] +
              "-" +
              koerper[z][1]
          );
        }
      }
    } while (neuepos);
  }

  paint() {
    this.c.drawImage(
      this.img,
      this.spalte * this.pixFeld,
      this.zeile * this.pixFeld,
      this.pixFeld,
      this.pixFeld
    );
  }
}
