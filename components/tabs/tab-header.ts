import {Component, HostBinding, Input, Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[suiTabHeader]'
})
export class SuiTabHeader {
    @HostBinding('class.item')
    private _headerClasses:boolean;

    @Input("suiTabHeader")
    public id:string;

    // Internally keeps track of whether the header is active.
    private _isActive:boolean;

    // Enables use of [(isActive)] so state can be set using booleans.
    @Output()
    public isActiveChange:EventEmitter<boolean>;

    // Fires only when `isActive` changes due to user input.
    public isActiveExternalChange:EventEmitter<boolean>;

    // Fires whenever a tab is activated having previously been deactivated.
    @Output("activate")
    public onActivate:EventEmitter<void>;

    // Fires whenever a tab is deactivated having previously been activated.
    @Output("deactivate")
    public onDeactivate:EventEmitter<void>;

    @HostBinding('class.active')
    @Input()
    public get isActive() {
        return this._isActive;
    }

    public set isActive(active:boolean) {
        // Only used by @Input(), runs whenever user input changes `isActive`.
        // Run in timeout because `isDisabled` can prohibit user from changing `isActive` so update is delayed to avoid 'changed after checked' error.
        setTimeout(() => {
            // Only allow change if tab header is not disabled.
            active = !this.isDisabled ? active : false;
            this.setActiveState(active);

            // Fire 'external change' event as user input has occured.            
            this.isActiveExternalChange.emit(active);
        });
    }

    private _isDisabled:boolean;

    @HostBinding('class.disabled')
    @Input()
    public get isDisabled() {
        return this._isDisabled;
    }

    public set isDisabled(disabled:boolean) {
        // Only update if value provided is different to current one.
        if (this._isDisabled != disabled) {
            this._isDisabled = disabled;
            
            // If now disabled, then tab header must be deactivated.
            if (this.isDisabled) {
                this.isActive = false;
            }
        }
    }

    constructor() {
        this._isActive = false;
        this.isActiveChange = new EventEmitter<boolean>();
        this.isActiveExternalChange = new EventEmitter<boolean>();

        this.onActivate = new EventEmitter<void>();
        this.onDeactivate = new EventEmitter<void>();

        this.isDisabled = false;

        this._headerClasses = true;
    }

    // Internally update active state.
    public setActiveState(active:boolean) {
        // If (cast) active value has changed:
        if (!!this._isActive != active) {
            // Update to the new value.
            this._isActive = active;

            // Fire the appropriate activation event.
            if (active) {
                this.onActivate.emit();
            }
            else {
                this.onDeactivate.emit();
            }
        }

        // Regardless, emit a change to `isActive`, so [(isActive)] works correctly.
        this.isActiveChange.emit(active);
    }

    @HostListener('click')
    private onClick() {
        if (!this.isDisabled) {
            // Activate the tab when clicked, so long as it isn't disabled.
            this.isActive = true;
        }
    }
}