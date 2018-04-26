import * as _ from "lodash"

export class ModalService {
    private modals: any[] = [];

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        let modalToRemove = _.find(this.modals, { id: id });
        this.modals = _.without(this.modals, modalToRemove);
    }

    open(id: string) {
        // open modal specified by id
        let modal = _.find(this.modals, { id: id });
        console.log("Modal open" + id);
        modal.open();
    }

    close(id: string) {
        // close modal specified by id
        let modal = _.find(this.modals, { id: id });
        console.log("Modal close" + id);
        modal.close();
    }
}
