import * as grapesjs from 'grapesjs'
import { AppState } from '../utils'
import { AppComponentName } from '../constants'
import { setup } from '../../auto-generated'
import { componentModel, componentParamsEditorView } from './common'

const defaultSrc = `
return async () => ({
    url: ''
})`

export class AppComponent {
    static staticAttributes = {
        renderFctTarget: 'renderAppComponent',
        version: setup.version,
        dependencies: setup.getCdnDependencies('rendering'),
    }
    public readonly appState: AppState
    public readonly grapesEditor: grapesjs.Editor
    public readonly idFactory: (name: string) => string

    public readonly componentType: string

    public readonly extendFn = ['initialize']
    isComponent = (el: HTMLElement) => {
        return (
            el.getAttribute &&
            el.getAttribute('componentType') == this.componentType
        )
    }
    public readonly model
    public readonly view

    constructor(params: {
        appState: AppState
        grapesEditor: grapesjs.Editor
        idFactory: (name: string) => string
    }) {
        Object.assign(this, params)
        this.componentType = this.idFactory(AppComponentName)
        this.model = this.getModel()
        this.view = this.getView()
    }

    getModel() {
        return componentModel({
            defaultSrc,
            componentType: this.componentType,
            staticAttributes: AppComponent.staticAttributes,
        })
    }

    getView() {
        return componentParamsEditorView({
            grapesEditor: this.grapesEditor,
            appState: this.appState,
            staticAttributes: AppComponent.staticAttributes,
        })
    }
}
