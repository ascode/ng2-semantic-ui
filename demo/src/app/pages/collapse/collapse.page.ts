import {Component} from '@angular/core';
import {ApiDefinition} from '../../components/api/api.component';

const exampleStandardTemplate = `
<div class="ui segments">
    <div class="ui segment">
        <button class="ui primary button" (click)="collapse = !collapse">
            Toggle Collapse
        </button>
    </div>
    <div class="ui segment">
        <div [suiCollapse]="collapse">
            <div class="ui segment">
                <h4 class="ui header">Collapsible Panel</h4>
                <p>Content of the panel.</p>
            </div>
        </div>
    </div>
</div>
`;

@Component({
    selector: 'demo-page-collapse',
    templateUrl: './collapse.page.html'
})
export class CollapsePage {
    public api:ApiDefinition = [
        {
            selector: "[suiCollapse]",
            properties: [
                {
                    name: "suiCollapse",
                    description: "Sets whether or not the element is collapsed.",
                    required: true
                },
                {
                    name: "collapseDuration",
                    description: "Sets the duration of the collapse animation.",
                    defaultValue: "350"
                }
            ]
        }
    ];
    public exampleStandardTemplate = exampleStandardTemplate;
}

@Component({
    selector: 'collapse-example-standard',
    template: exampleStandardTemplate
})
export class CollapseExampleStandard {
    public collapse:boolean = false;
}

export const CollapsePageComponents = [CollapsePage, CollapseExampleStandard];
