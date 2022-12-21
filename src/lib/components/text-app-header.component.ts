import * as grapesjs from 'grapesjs'

import { AppState } from '../utils'
import { TextAppHeaderComponentName } from '../constants'
import { setup } from '../../auto-generated'
import { componentModel } from './common'

export class TextAppHeaderComponent {
    static staticAttributes = {
        renderFctTarget: 'renderTextAppHeaderComponent',
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
        this.componentType = this.idFactory(TextAppHeaderComponentName)
        this.model = this.getModel()
        this.view = this.getView()
    }

    getModel() {
        return componentModel({
            defaultSrc: '',
            componentType: this.componentType,
            staticAttributes: TextAppHeaderComponent.staticAttributes,
        })
    }

    getView() {
        return {
            events: {},
        }
    }
}
