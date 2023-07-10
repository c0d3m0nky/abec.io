import './common';
import {v1 as uuidv1} from 'uuid';
import jquery from 'jquery';
import Shuffle from 'shufflejs';

const $: JQueryStatic = jquery;

let _defaultTrackerValue = 10;

let masonryGrid = new Shuffle($('.masonry-grid')[0], {
    itemSelector: '.masonry-grid-item',
    sizer: '.masonry-grid-item'
});

function genId(name: string) {
    return `${name.replace(' ', '_')}_${uuidv1()}`;
}

function templateReplace(template: string, values: Dictionary<string | number>): string {
    let res: string = template

    for (let k of Object.keys(values)) {
        res = res.replace(`~${k}~`, values[k].toString())
    }

    return res;
}

let _initComplete = false;
let _groups: TrackerGroup[] = [];
let _trackers: Tracker[] = [];

interface ITrackerGroup {
    name: string
    trackers: ITracker[]
}

class TrackerGroup implements ITrackerGroup {
    readonly _template = `
<article id="~id~" class="masonry-grid-item">
    <div class="card border-0 bg-secondary">
        <div class="card-header pt-3 pb-2 tracker-group-name">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control in-place-edit">
                </div>
                <div class="col-1" style="margin-right: 9px;">
                    <button class="btn btn-xs btn-icon btn-secondary rounded-circle remove-group" type="button" style="margin-bottom: 4px;" tabindex="-1"><span>x</span></button>
                </div>
            </div>
        </div>
        <div class="card-body pt-3 pb-3">
            <div class="card-text">            
                <div id="~id~_-_add-tracker" class="row pt-3 add-tracker-row">
                    <button class="btn btn-sm btn-icon btn-secondary rounded-circle add-tracker" type="button"><span>+</span></button>
                </div>
            </div>
        </div>
    </div>
</article>`

    name: string
    _id: string
    trackers: Tracker[]
    _element: JQuery<HTMLElement>

    constructor(name: string) {
        this.name = name;
        this._id = genId(name);
        this.trackers = [];
        this._element = $(templateReplace(this._template, {
            id: this._id
        }));

        this._element.data('model', this);

        // noinspection TypeScriptValidateTypes
        this._element.find('.tracker-group-name input').val(this.name);

        // noinspection TypeScriptValidateTypes
        this._element.find('.tracker-group-name input').on('change', e => {
            this.name = (e.currentTarget as HTMLInputElement).value;
            saveSession();
        });

        // noinspection TypeScriptValidateTypes
        this._element.find('.btn.remove-group').on('click', () => {
            let i = _groups.indexOf(this);

            _groups.splice(i, 1);
            this._element.remove();
            masonryGrid.remove(this._element.get())
            saveSession();
        });

        // noinspection TypeScriptValidateTypes
        this._element.find('.btn.add-tracker').on('click', () => {
            this.addTracker();
        });
    }

    addTracker(obj: ITracker | null = null, select = true) {
        if (!obj) {
            obj = {
                name: 'Name',
                value: _defaultTrackerValue,
                max: _defaultTrackerValue
            }
        }
        let tr = new Tracker(obj.name, this._id, obj.value, obj.max);

        this.trackers.push(tr);
        _trackers.push(tr);
        // noinspection TypeScriptValidateTypes
        tr._element.insertBefore(this._element.find(`.add-tracker-row`));
        masonryGrid.update({recalculateSizes: true});
        if (select) {
            // noinspection TypeScriptValidateTypes
            tr._element.find('.tracker-item-title input').select();
        }
        saveSession();
    }

}

interface ITracker {
    name: string
    value: number
    max: number
}

class Tracker implements ITracker {
    readonly _template = `
<div id="~id~" class="row">
    <div class="col tracker-item-title">
        <input type="text" class="form-control in-place-edit">
    </div>
    <div class="col tracker-item-value">
        <input type="text" class="form-control in-place-edit" title="~max~">
    </div>
</div>`

    name: string
    _id: string
    value: number
    max: number
    _ticked: boolean
    _element: JQuery<HTMLElement>

    constructor(name: string, parentId: string, value: number, max: number) {
        this.name = name;
        this._id = `${parentId}_-_${genId(name)}`;
        this.value = value;
        this.max = max;
        this._ticked = false;
        this._element = $(templateReplace(this._template, {
            id: this._id,
            name: this.name,
            value: this.value,
            max: this.max
        }));

        this._element.data('model', this);

        // noinspection TypeScriptValidateTypes
        this._element.find('.tracker-item-title input').val(this.name);
        this.setMax(this.max)
        this.setValue(this.value);

        // noinspection TypeScriptValidateTypes
        this._element.find('.tracker-item-title input').on('change', e => {
            this.name = (e.currentTarget as HTMLInputElement).value;
            saveSession();
        });

        // noinspection TypeScriptValidateTypes
        this._element.find('.tracker-item-value input').on('change', e => {
            let v = parseInt((e.currentTarget as HTMLInputElement).value);

            if (isNaN(v)) this.setValue(this.value);
            else this.setValue(v);
            saveSession();
        });
    }

    setMax(value: number) {
        this.max = value;
        $('.tracker-item-value input').attr('title', this.max);
    }

    setValue(value: number) {
        if (value < 0) value = 0;

        this.value = value;

        if (!this._ticked && this.value > this.max) this.setMax(this.value);

        // noinspection TypeScriptValidateTypes
        this._element.find('.tracker-item-value input').val(this.value);

        if (this.value === 0) {
            this._element.removeClass('tracker-low');
            this._element.addClass('tracker-expired');
        } else if (this.value < this.max / 2) {
            this._element.removeClass('tracker-expired');
            this._element.addClass('tracker-low');
        } else {
            this._element.removeClass('tracker-expired');
            this._element.removeClass('tracker-low');
        }
    }

    roundTicked() {
        this._ticked = true;
        this.setValue(this.value - 1);
    }
}

function addTrackerGroup(obj: ITrackerGroup | null = null): void {
    let select = false;

    if (!obj) {
        select = true;
        obj = {
            name: 'Name',
            trackers: [
                {
                    name: 'Name',
                    value: _defaultTrackerValue,
                    max: _defaultTrackerValue
                }
            ]
        }
    }
    let tg = new TrackerGroup(obj.name);

    _groups.push(tg);

    $('#tracker-groups').append(tg._element);
    masonryGrid.add(tg._element.get());


    for (let t of obj.trackers) {
        tg.addTracker(t, false)
    }

    if (select) {
        // noinspection TypeScriptValidateTypes
        tg._element.find('.tracker-group-name input').select();
    }

    if (_initComplete) saveSession();
}

function tickRound() {
    for (let t of _trackers) {
        t.roundTicked();
    }
    saveSession();
}

function serializerFilter(key: string, value: any) {
    if (key.startsWith('_')) return undefined;
    else return value;
}

function saveSession() {
    localStorage.setItem('trackerGroups', JSON.stringify(_groups, serializerFilter));
}

setTimeout(() => {
    let grid = $('#tracker-groups');

    grid.css('min-height', grid.css('height'));
    grid.css('height', '');

    $('.add-group').on('click', () => addTrackerGroup())
    $('.tick-round').on('click', () => tickRound())

    let skipTestInit = false
    let lastSession = localStorage.getItem('trackerGroups');

    if (lastSession) {
        let ls: TrackerGroup[] = JSON.parse(lastSession);

        if (ls.length > 0) skipTestInit = true;
        for (let tg of ls) {
            addTrackerGroup(tg);
        }
    }

    if (!skipTestInit && window.location.search.includes('init_test_groups')) {
        addTrackerGroup({
            name: 'Rocky',
            trackers: [
                {
                    name: 'Storm Rune',
                    value: _defaultTrackerValue,
                    max: _defaultTrackerValue
                },
                {
                    name: 'Hill Rune',
                    value: _defaultTrackerValue - 2,
                    max: _defaultTrackerValue - 2
                },
                {
                    name: 'Storm Rune',
                    value: _defaultTrackerValue + 3,
                    max: _defaultTrackerValue + 3
                },
                {
                    name: 'Hill Rune',
                    value: _defaultTrackerValue - 1,
                    max: _defaultTrackerValue - 1
                },
                {
                    name: 'Storm Rune',
                    value: _defaultTrackerValue + 1,
                    max: _defaultTrackerValue + 1
                },
                {
                    name: 'Hill Rune',
                    value: _defaultTrackerValue - 3,
                    max: _defaultTrackerValue - 3
                }
            ]
        });
        addTrackerGroup({
            name: 'Costis',
            trackers: [
                {
                    name: 'Target',
                    value: _defaultTrackerValue,
                    max: _defaultTrackerValue
                }
            ]
        });
    }
}, 500);