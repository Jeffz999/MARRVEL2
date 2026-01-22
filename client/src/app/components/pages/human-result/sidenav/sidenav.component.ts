import { Component, OnChanges, input, output, model } from "@angular/core";
import { DOCUMENT, NgIf } from "@angular/common";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"],
    imports: [MatIconButton, MatIcon, NgIf, MatTooltip],
})
export class SidenavComponent implements OnChanges {
    readonly gene = input<object | null>(undefined);
    readonly variant = input<string | null>(undefined);
    readonly change = output<any>();

    readonly sidenavOpened = model(true);
    readonly smallScreen = input(false);

    constructor() {}

    ngOnChanges(): void {}

    toggleSidenav(): void {
        this.sidenavOpened.set(!this.sidenavOpened());
        this.change.emit({
            sidenavOpened: this.sidenavOpened(),
        });
    }

    scrollTo(id: string): void {
        this.change.emit({
            scrollTo: id,
        });
    }
}
