import { Directive, ElementRef, input, inject, computed, effect } from "@angular/core";

@Directive({
    selector: "[appUnit]",
})
export class UnitDirective {
    private el = inject(ElementRef);

    readonly count = input<number>(0);
    readonly unit = input<string>("");
    readonly plural = input<string>("");

    private derivedPlural = computed(() => this.plural() || this.unit() + "s");

    constructor() {
        effect(() => {
            const count = this.count();
            const unit = this.unit();
            const plural = this.derivedPlural();

            if (!unit || unit === "") {
                this.el.nativeElement.innerHTML = "" + count;
            } else if (count >= 2) {
                this.el.nativeElement.innerHTML = `${count} ${plural}`;
            } else {
                this.el.nativeElement.innerHTML = `${count} ${unit}`;
            }
        });
    }
}
