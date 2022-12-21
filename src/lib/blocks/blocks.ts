import * as grapesjs from 'grapesjs'
import { AppState } from '../utils'
import {
    AppComponentName,
    CoverPageBlockName,
    CoverPageComponentName,
    SimplePageBlockName,
    TextAndAppBlockName,
    TextAppHeaderComponentName,
} from '../constants'

export class CoverPageBlock {
    public readonly blockType: string
    public readonly label = 'Cover Page'
    public readonly content
    public readonly appState: AppState
    public readonly grapesEditor: grapesjs.Editor
    public readonly idFactory: (name: string) => string
    public readonly render = ({ el }: { el: HTMLElement }) => {
        el.classList.add('gjs-fonts', 'gjs-f-b1')
    }

    constructor(params: {
        appState: AppState
        grapesEditor: grapesjs.Editor
        idFactory: (name: string) => string
    }) {
        Object.assign(this, params)
        this.blockType = this.idFactory(CoverPageBlockName)
        this.content = {
            type: this.idFactory(CoverPageComponentName),
        }
    }
}

export class Blocks {
    public readonly blockType: string
    public readonly label = 'Simple Page'
    public readonly content
    public readonly appState: AppState
    public readonly grapesEditor: grapesjs.Editor
    public readonly idFactory: (name: string) => string
    public readonly render = ({ el }: { el: HTMLElement }) => {
        el.classList.add('fas', 'fa-file')
    }

    constructor(params: {
        appState: AppState
        grapesEditor: grapesjs.Editor
        idFactory: (name: string) => string
    }) {
        Object.assign(this, params)
        this.blockType = this.idFactory(SimplePageBlockName)
        this.content = `
<div class='grapes-yw-doc_page'>
    <section class='grapes-yw-doc_content' data-gjs-draggable='.row'  data-gjs-type="div" >
    </section>
</div>`
    }
}

export class TextAndAppPageBlock {
    public readonly blockType: string
    public readonly label = 'Text & App Page'
    public readonly content
    public readonly appState: AppState
    public readonly grapesEditor: grapesjs.Editor
    public readonly idFactory: (name: string) => string
    public readonly render = ({ el }: { el: HTMLElement }) => {
        el.classList.add('fas', 'fa-file')
    }

    constructor(params: {
        appState: AppState
        grapesEditor: grapesjs.Editor
        idFactory: (name: string) => string
    }) {
        Object.assign(this, params)
        this.blockType = this.idFactory(TextAndAppBlockName)
        this.content = `
<div class="h-100 w-100 d-flex flex-column">
    <div data-gjs-type="${this.idFactory(TextAppHeaderComponentName)}"></div>
    <div class='grapes-yw-doc_page flex-grow-1'>
        <section class='grapes-yw-doc_content' data-gjs-type="div" >
        </section>
        <section class='flex-grow-1 grapes-yw-doc_application' data-gjs-type="${this.idFactory(
            AppComponentName,
        )}" >
        </section>
    </div>
</div>
`
    }
}
