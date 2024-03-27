"use strict";

class Spielfeld {
  constructor(id, anzFelder, pixFeld) {
    // ablegen aller Daten vom Spieldfeld in this, damit es übergeben werden kann;
    let dasSplf = this;
    //console.log(dasSplf);
    this.anzFelder = anzFelder;
    this.pixFeld = pixFeld;
    this.h = anzFelder * pixFeld;
    this.w = anzFelder * pixFeld;
    this.farbe1 = "#B0B0B0";
    this.farbe2 = "#D8C6A9";
    this.interv = 500;
    this.zInterv = null;
    this.zCanvas = document.getElementById(id);
    this.c = this.zCanvas.getContext("2d");
    this.zCanvas.height = this.h;
    this.zCanvas.width = this.w;
    // erzeugen der Schlange und weiterreichen der Infos vom Spielfeld
    this.schlange = new Schlange(dasSplf);
    // erzeugen des Apfels und weiterreichen der Infos vom Spielfeld
    this.apfel = new Apfel(dasSplf);
    this.start();
  }

  start() {
    this.zInterv = setInterval(() => {
      this.paint();
      this.schlange.paint();
      this.apfel.paint();
    }, this.interv);
  }

  stop() {
    alert("Game over!");
    clearInterval(this.zInterv);
  }

  paint() {
    // Spielfeld
    // this.c.fillStyle = this.farbe1;
    // this.c.fillRect(0, 0, this.h, this.w);

    // Einzelne Felder im Schachbrettmuster
    for (let i = 0; i < this.anzFelder; i++) {
      // i = Zeile
      for (let j = 0; j < this.anzFelder; j++) {
        // j = Spalten komplett bis nach unten, dann nächste zeile i
        if ((i + j) % 2 === 0) {
          this.c.fillStyle = this.farbe2;
        } else {
          this.c.fillStyle = this.farbe1;
        }
        this.c.fillRect(
          j * this.pixFeld,
          i * this.pixFeld,
          this.pixFeld,
          this.pixFeld
        );
      }
    }
  }
}
