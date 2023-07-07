import './common.js'
import jquery from 'jquery'


const $: JQueryStatic = (window as any)["jQuery"];

function nameToId(name: string) {
    return name.replace(' ', '_')
}

function templateReplace(template: string, values: Dictionary<string | number>): string {
    let res: string = template

    for (let k of Object.keys(values)) {
        res = res.replace(`~${k}~`, values[k].toString())
    }

    return res;
}

class TrackerGroup {
    readonly _template = `
<article id="~id~" class="masonry-grid-item">
    <div class="card border-0 bg-secondary">
        <div class="card-header pt-3 pb-3">~name~</div>
        <div class="card-body pt-3 pb-3">
            <div class="row">~body~</div>
        </div>
    </div>
</article>`

    name: string
    id: string
    trackers: Tracker[]

    constructor(name: string) {
        this.name = name;
        this.id = nameToId(name);
        this.trackers = []
    }

    getHtmlStr(): string {
        return templateReplace(this._template, {
            id: this.id,
            name: this.name,
            body: this.trackers.map(t => t.getHtmlStr()).join('\n')
        });
    }

    getJq(): JQuery<HTMLElement> {
        return $(this.getHtmlStr());
    }
}

class Tracker {
    readonly _template = `
<div id="~id~" class="row">
    <div class="col tracker-item-title">~name~</div>
    <div class="col tracker-item-value">~value~</div>
</div>`

    name: string
    id: string
    value: number

    constructor(name: string, parentId: string, value: number) {
        this.name = name;
        this.id = `${parentId}_-_${nameToId(name)}`;
        this.value = value;
    }

    getHtmlStr(): string {
        return templateReplace(this._template, {
            id: this.id,
            name: this.name,
            value: this.value
        });
    }

    getJq(): JQuery<HTMLElement> {
        return $(this.getHtmlStr());
    }
}

function addTrackerGroup(): void {
    let tg = new TrackerGroup('Rocky');

    $('#tracker-groups').append(tg.getJq());
    // $grid.masonry();
}

$('.add-group').on('click', _ => addTrackerGroup())