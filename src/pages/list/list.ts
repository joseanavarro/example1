import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Logger } from "../../providers/logger/logger";

@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string; note: string; icon: string }>;
  logt: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: Logger
  ) {
    this.logt = "ListPage | ";
    let ti: string = this.logt + "constructor";

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get("item");
    // Escribir traza con información
    this.logger.error(ti, "Selected item #", this.selectedItem);
    //this.logger.error(ti, "** Seguna traza", "Esta traza sólo contiene texto");
    // Let's populate this page with some filler content for funzies
    this.icons = [
      "flask",
      "wifi",
      "beer",
      "football",
      "basketball",
      "paper-plane",
      "american-football",
      "boat",
      "bluetooth",
      "build"
    ];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: "Item " + i,
        note: "This is item #" + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
      //this.logger.debug(ti, "This is item #" + i);
    }
  }

  itemTapped(event, item) {
    // Cuando se hace click en cualquier itel de la página se vuelve a lanzar la misma página
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
