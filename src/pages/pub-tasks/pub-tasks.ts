import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConstants } from "../../providers/app-constants/app-constants";
import { DatabaseService } from "../../providers/database-service/database-service";
import { EstadoProvider } from "../../providers/estado/estado";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-pub-tasks',
  templateUrl: 'pub-tasks.html',
})
export class PubTasksPage {

  logt: string;
  ti: string;
  pubTasks: Object[];
  pubItems: Object[];
  tasksCompletion: Object[];
  viewList: boolean;
  pubOnPlatform: boolean;
  closeButton: string;
  not_allowed_pub: string;
  not_allowed: string;
  task_started: string;
  pub_started_desc: string;
  task_ended: string;
  task_ended_desc: string;
  txtAcceptButton: string;
  txtCancelButton: string;
  confirmMessage: string;
  confirmTitle: string;
  timerId;

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public logger: Logger,
    public db: DatabaseService,
    public util: UtilProvider,
    public dialogs: Dialogs,
    public st: EstadoProvider,
    public localNotifications: LocalNotifications,
    public navParams: NavParams
  ) {
    this.logt = "PubTasksPage | ";
    this.ti = this.logt + "constructor";

    this.translate.get("not_possible_pub").subscribe(value => this.not_allowed_pub = value);
    this.translate.get("not_allowed_task").subscribe(value => this.not_allowed = value);
    this.translate.get("close_button").subscribe(value => this.closeButton = value);
    this.translate.get("task_started").subscribe(value => this.task_started = value);
    this.translate.get("pub_started_desc").subscribe(value => this.pub_started_desc = value);
    this.translate.get("task_ended").subscribe(value => this.task_ended = value);
    this.translate.get("task_ended_desc").subscribe(value => this.task_ended_desc = value);
    this.translate.get("cancel").subscribe(value => this.txtCancelButton = value);
    this.translate.get("accept").subscribe(value => this.txtAcceptButton = value);
    this.translate.get("delete_pub_task").subscribe(value => this.confirmTitle = value);
    this.translate.get("delete_pub_task_confirm").subscribe(value => this.confirmMessage = value);

  }

  ionViewDidLoad() {
    this.logt = "PubTasksPage | ";
    this.ti = this.logt + "constructor";


  }

  /**
  * Se ejecuta siempre que se entra en la página
  * 
  * @memberof PubTasksPage
  */
  ionViewWillEnter() {
    this.ti = this.logt + "ionViewWillEnter";
    this.viewList = true;

    this.loadAllTasks()
      .then(() => this.viewList = true)
      .catch(() => this.viewList = false);

    if (this.st.get() == AppConstants.ST_PUBLISHING) {
      this.pubOnPlatform = true;
      this.refreshList();
    } else {
      this.pubOnPlatform = false;
    }

  }

  /**
   * Refrescar lista de tareas
   *
   * @memberof PubTasksPage
   */
  refreshList() {
    this.ti = this.logt + "refreshList";

    this.timerId = setInterval(() => {
      if (this.st.get() === AppConstants.ST_PUBLISHING) {
        this.logger.debug(this.ti, 'Refrescar lista');
        this.loadAllTasks()
          .then(() => this.viewList = true)
          .catch(() => this.viewList = false);
      } else {
        // Desactivar el timer
        clearInterval(this.timerId);
        this.pubOnPlatform = false;
      }
    }, 1000 * 2); // x segundos
  }

  /**
  * Fired when you leave a page, before it stops being the active one. 
  * Use it for things you need to run every time you are leaving a page 
  * (deactivate event listeners, etc.).
  *
  * @memberof PubTasksPage
  */
  ionViewWillUnload() {
    this.ti = this.logt + "ionViewWillUnload";

    // Desactivar el timer
    clearInterval(this.timerId);
    this.logger.debug(this.ti, 'Detener refresco de lista');

  }


  /**
   * Muestra todas las tareas de publicación
   * 
   * @returns
   * @memberof PubTasksPage
   */
  loadAllTasks() {
    this.ti = this.logt + "loadAllTasks";
    return new Promise((resolve, reject) => {
      //Leer tabla de Taskslist
      this.db.getAllTasks(true)
        .then((result) => {
          if (result !== null) {
            // Iterar por las tareas
            this.pubItems = new Array();
            this.pubTasks = new Array();
            if (result.length > 0) {
              this.viewList = true;
              this.logger.debug(this.ti, 'Encontradas tareas de publicación');
              /* jshint loopfunc:true */
              for (let i = 0; i < result.length; i++) {
                //this.logger.debug(this.ti, 'tasktype: ' + result.item(i).tasktype);
                let name: string = result.item(i).name ? this.limitTo(result.item(i).name, '35') : result.item(i).panoid;
                result.item(i).name = name;
                if (result.item(i).tasktype == AppConstants.TSK_INIT_PUB) {
                  this.pubTasks.push(result.item(i))
                  //this.logger.debug(this.ti, 'pubTasks(' + i.toString + ') = ' + JSON.stringify(result.item(i)));
                } else if (result.item(i).tasktype == AppConstants.TSK_PANO) {
                  this.pubItems.push(result.item(i))
                  //this.logger.debug(this.ti, 'pubItems(' + i.toString + ') = ' + JSON.stringify(result.item(i)));
                }
              }
              resolve();
            } else {
              this.viewList = false;
              reject();
            }
          } else {
            this.viewList = false;
            reject();
          }
        }, (err) => {
          this.logger.error(this.ti, 'Error leyendo tareas de publicación: ', err);
          reject();
        });
    });
  }

  /**
   * Iniciar proceso de publicación
   *
   * @memberof PubTasksPage
   */
  startPub() {
    if (this.st.set(AppConstants.ST_PUBLISHING)) {
      this.pubOnPlatform = true;
      this.refreshList();
      this.logger.debug(this.ti, 'Inicia proceso de publicación');
      // this.util.presentAlert(this.task_started, this.pub_started_desc, this.closeButton);
      // this.localNotifications.schedule({
      //   id: 1,
      //   title: this.task_started,
      //   text: this.pub_started_desc,
      //   smallIcon: 'res://icon',
      //   icon: 'file://assets/img/icon.png'
      // });
    } else {
      this.pubOnPlatform = false;
      this.util.presentAlert(this.not_allowed, this.not_allowed_pub, this.closeButton);
    }
  }

  /**
   * Finalizar publicación
   *
   * @memberof PubTasksPage
   */
  endPub() {
    this.ti = this.logt + "endPub";

    if (this.st.set(AppConstants.ST_IDLE)) {
      this.pubOnPlatform = false;
      clearInterval(this.timerId);
      this.logger.debug(this.ti, 'Detener refresco de lista');
      // this.localNotifications.cancel({
      //   id: 1
      // });
      this.logger.debug(this.ti, 'End process ');
      // this.util.presentAlert(this.task_ended, this.task_ended_desc, this.closeButton);
    } else {
      this.pubOnPlatform = true;
      this.util.presentAlert(this.not_allowed, this.not_allowed, this.closeButton);
    }
  }

  /**
   * Eliminar tour de la lista de tareas
   *
   * @param {number} taskid
   * @memberof PubTasksPage
   */
  detelePubTour(taskid) {
    this.ti = this.logt + "detelePubTour";
    this.logger.debug(this.ti, 'Borrar tarea: ' + taskid);

    this.db.get_task(taskid)
      .then((data) => {
        if (data.progress != -1) {
          let ctx = this;
          let buttons = [this.txtAcceptButton, this.txtCancelButton];
          ctx.dialogs.confirm(ctx.confirmMessage, ctx.confirmTitle, buttons)
            .then((result) => {
              // result = 1 -> ok
              // result = 2 -> cancel
              ctx.logger.debug(ctx.ti, 'Opción seleccionada: ', result.toString());
              if (result === 1) {
                ctx.db.remove_task(taskid)
                  .then(() => {
                    ctx.logger.debug(ctx.ti, 'Tarea eliminada');
                    this.loadAllTasks()
                      .then(() => this.viewList = true)
                      .catch(() => this.viewList = false);
                  })
                  .catch(() => ctx.logger.error(ctx.ti, 'Error eliminando tarea'));
              } else {
                ctx.logger.debug(ctx.ti, 'Se decide no borrar la tarea');
              }
            });
        } else {
          this.db.remove_task(taskid)
            .then(() => {
              this.logger.debug(this.ti, 'Tarea eliminada');
              this.loadAllTasks()
                .then(() => this.viewList = true)
                .catch(() => this.viewList = false);
            })
            .catch(() => this.logger.error(this.ti, 'Error eliminando tarea'));
        }
      });

  }

  /**
   * Limitar la longitud de un string
   *
   * @param {string} value
   * @param {string} args
   * @returns {string}
   * @memberof PubTasksPage
   */
  limitTo(value: string, args: string): string {
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // let trail = args.length > 1 ? args[1] : '...';
    let limit = args ? parseInt(args, 10) : 10;
    let trail = "...";

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
