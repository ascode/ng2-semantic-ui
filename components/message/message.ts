import {Component, Input, Output, EventEmitter, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import {SuiTransition, Transition, TransitionDirection} from '../transition/transition';
import {TransitionController} from '../transition/transition-controller';

export interface IMessage {
    dismiss():void;
}

@Component({
    selector: 'sui-message',
    template: `
<div class="ui message {{ _classes }}" *ngIf="!isDismissed" [suiTransition]="_transition">
    <i class="close icon" *ngIf="isDismissable" (click)="dismiss()"></i>
    <ng-content></ng-content>
</div>
`
})
export class SuiMessage implements IMessage {
    @Input()
    public isDismissable:boolean;

    @Output("dismiss")
    public onDismiss:EventEmitter<SuiMessage>;

    public isDismissed:boolean;

    private _transition:TransitionController;

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    @Input("class")
    private _classes:string;

    constructor() {
        this.isDismissable = true;
        this.onDismiss = new EventEmitter<SuiMessage>();

        this.isDismissed = false;

        this._transition = new TransitionController();
        this.transition = "fade";
        this.transitionDuration = 300;

        this._classes = "";
    }

    public dismiss() {
        this._transition.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, () => {
            this.isDismissed = true;
            this.onDismiss.emit(this);
        }));
    }
}
