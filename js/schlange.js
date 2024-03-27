"use strict";

class Schlange {
  constructor(dasSpfl) {
    // ablegen aller Daten vom Spieldfeld in this, damit es übergeben werden kann;
    this.zSpielfeld = dasSpfl; // dasSpld übergeben von spielfeld
    this.spalte = Math.floor(Math.random() * this.zSpielfeld.anzFelder * 0.7);
    this.zeile = Math.floor(Math.random() * this.zSpielfeld.anzFelder * 0.7);
    //console.log(this.spalte, this.zeile);
    this.richtung = ""; //l,r,o,u
    this.farbe = "#635369";
    this.koerper = [];
    this.c = this.zSpielfeld.c;
    this.pixFeld = this.zSpielfeld.pixFeld;
    this.points = 0;

    //Bewegung
    document.addEventListener("keydown", (e) => {
      //console.log(e.keyCode);
      if (e.keyCode == 38) {
        this.richtung = "o";
      }
      if (e.keyCode == 40) {
        this.richtung = "u";
      }
      if (e.keyCode == 37) {
        this.richtung = "l";
      }
      if (e.keyCode == 39) {
        this.richtung = "r";
      }

      //console.log(this.richtung);
    });
  }
  fressen() {
    //prüfen, ob die gleichen koordi wie apfel hat
    if (
      this.spalte === this.zSpielfeld.apfel.spalte &&
      this.zeile === this.zSpielfeld.apfel.zeile
    ) {
      //apfel neu positionieren newposition() aus Apfel aufrufen
      this.zSpielfeld.apfel.newPosition();
      //zähler hochsetzen
      this.points++;

      //console.log(this.points);
      document.getElementById("score").innerHTML = "Score: " + this.points;
    } else {
      this.koerper.pop();
    }
  }

  paint() {
    let gameOver = false;
    //Kopf der Schlange ins Array legen vor der Bewegung
    this.koerper.unshift([this.spalte, this.zeile]);

    // console.log(this.koerper);
    //console.log(this.richtung);
    if (this.richtung == "o") {
      if (this.zeile > 0) {
        this.zeile--;
      } else {
        gameOver = true;
      }
    }

    if (this.richtung == "u") {
      if (this.zeile < this.zSpielfeld.anzFelder - 1) {
        //-1, weil wir bei 0 beginnen zu zählen
        this.zeile++;
      } else gameOver = true;
    }
    if (this.richtung == "l") {
      if (this.spalte > 0) {
        this.spalte--;
      } else gameOver = true;
    }

    if (this.richtung == "r") {
      if (this.spalte < this.zSpielfeld.anzFelder - 1) {
        this.spalte++;
      } else gameOver = true;
    }

    // Test Kopf trifft Körper

    for (let i = 1; i < this.koerper.length; i++) {
      if (
        this.spalte === this.koerper[i][0] &&
        this.zeile === this.koerper[i][1]
      ) {
        gameOver = true;
      }
    }

    if (gameOver == true) {
      this.zSpielfeld.stop();
    }
    //Kopf
    console.log(gameOver);

    // Set the fill style first
    this.c.fillStyle = "#635369";
    this.c.beginPath();
    let kopfMitteX = this.spalte * this.pixFeld + this.pixFeld / 2;
    let kopfMitteY = this.zeile * this.pixFeld + this.pixFeld / 2;
    this.c.arc(
      kopfMitteX, // x-Koordinate des Mittelpunkts
      kopfMitteY, // y-Koordinate des Mittelpunkts
      this.pixFeld / 2, // Radius
      0,
      2 * Math.PI
    );
    this.c.fill();

    // Zeichne den äußeren schwarzen Kreis
    this.c.fillStyle = "black";
    this.c.beginPath();
    this.c.arc(
      kopfMitteX,
      kopfMitteY,
      this.pixFeld / 2 - 5, // Radius des schwarzen Kreises
      0,
      2 * Math.PI
    );
    this.c.fill();

    // Zeichne den inneren weißen Kreis im ersten Auge
    this.c.fillStyle = "white";
    this.c.beginPath();
    this.c.arc(
      kopfMitteX - 5, // x-Koordinate des weißen Kreises im ersten Auge
      kopfMitteY,
      5, // Radius des weißen Kreises
      0,
      2 * Math.PI
    );
    this.c.fill();

    this.c.fillStyle = "black"; // Setze die Farbe für die Pupille auf Schwarz
    this.c.beginPath();
    this.c.arc(
      this.spalte * this.pixFeld + this.pixFeld / 2 - 5, // x-Koordinate der Pupille im ersten Auge
      this.zeile * this.pixFeld + this.pixFeld / 2,
      2, // Radius der Pupille
      0,
      2 * Math.PI
    );
    this.c.fill();

    // Zeichne den inneren weißen Kreis im zweiten Auge
    this.c.fillStyle = "white";
    this.c.beginPath();
    this.c.arc(
      this.spalte * this.pixFeld + this.pixFeld / 2 + 5, // x-Koordinate des weißen Kreises im zweiten Auge
      this.zeile * this.pixFeld + this.pixFeld / 2,
      5, // Radius des weißen Kreises
      0,
      2 * Math.PI
    );
    this.c.fill();

    this.c.fillStyle = "black"; // Setze die Farbe für die Pupille auf Schwarz
    this.c.beginPath();
    this.c.arc(
      this.spalte * this.pixFeld + this.pixFeld / 2 + 5, // x-Koordinate der Pupille im zweiten Auge
      this.zeile * this.pixFeld + this.pixFeld / 2,
      2, // Radius der Pupille
      0,
      2 * Math.PI
    );
    this.c.fill();

    // Körper
    this.c.fillStyle = "#554f7a";
    for (let i = 0; i < this.koerper.length; i++) {
      this.c.fillRect(
        this.koerper[i][0] * this.pixFeld,
        this.koerper[i][1] * this.pixFeld,
        this.pixFeld,
        this.pixFeld
      );
      // Draw black border around the element
      this.c.strokeStyle = "black"; // Set border color to black
      this.c.lineWidth = 1; // Set border
    }

    this.fressen();
  }
}
