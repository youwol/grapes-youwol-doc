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

export class SimplePageBlock {
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
<div class='grapes-yw-doc_page overflow-auto'>
    <section class='grapes-yw-doc_content fv-font-family-regular' data-gjs-type="div" >
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
    <div class='h-100 w-100 grapes-yw-doc_page grapes-yw-doc_text-app-page-block'>
        <div class="w-50 h-100 grapes-yw-doc_text_column overflow-auto">                
            <div class='grapes-yw-doc_content fv-font-family-regular' data-gjs-type="div">
            </div>
        </div>
        <div data-gjs-type="${this.idFactory(
            TextAppHeaderComponentName,
        )}"></div>
        <div class="flex-grow-1 h-100 grapes-yw-doc_app_column">                
            <div class='w-100 h-100 grapes-yw-doc_application' data-gjs-type="${this.idFactory(
                AppComponentName,
            )}" >
            </div>
        </div>
    </div>
`
    }
}
