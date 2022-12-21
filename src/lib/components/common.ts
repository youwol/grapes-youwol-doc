import * as grapesjs from 'grapesjs'
import { BehaviorSubject, Subject } from 'rxjs'
import { withLatestFrom } from 'rxjs/operators'
import { AppState } from '../utils'
import { HTMLElement$, VirtualDOM } from '@youwol/flux-view'

export function componentModel({
    defaultSrc,
    componentType,
    staticAttributes,
}) {
    return {
        defaults: {
            script,
            tagName: 'div',
            droppable: false,
            attributes: {
                componentType: componentType,
                src: defaultSrc,
                data: JSON.stringify(staticAttributes),
            },
        },
    }
}

const codeMirrorConfiguration = {
    value: '',
    mode: 'javascript',
    lineNumbers: true,
    theme: 'blackboard',
    lineWrapping: false,
    indentUnit: 4,
}

export class HeaderView {
    public readonly run$ = new Subject()
    public readonly children: VirtualDOM[]
    public readonly connectedCallback: (
        elem: HTMLElement$ & HTMLDivElement,
    ) => void

    constructor(params: { run$?: Subject<undefined> }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'd-flex w-100 align-items-center',
                children: [
                    {
                        tag: 'i',
                        class: 'fv-pointer rounded m-1 fas fa-play fv-hover-text-focus',
                        onclick: () => this.run$.next(true),
                    },
                ],
            },
        ]
    }
}

export function componentParamsEditorView({
    grapesEditor,
    appState,
    staticAttributes,
}: {
    grapesEditor: grapesjs.Editor
    appState: AppState
    staticAttributes: {
        renderFctTarget: string
        version: string
        dependencies: string[]
    }
}) {
    return {
        events: {
            dblclick: 'editSrc',
        },
        editSrc: () => {
            const component = grapesEditor.getSelected()
            const src0 = component.getAttributes().src
            const src$ = new BehaviorSubject(src0)
            const run$ = new Subject<undefined>()
            run$.pipe(withLatestFrom(src$)).subscribe(([_, src]) => {
                component &&
                    component.addAttributes({
                        src,
                        data: JSON.stringify(staticAttributes),
                    })
                component.view.render()
            })

            appState.editCode({
                headerView: () => {
                    return new HeaderView({ run$ })
                },
                content$: src$,
                configuration: {
                    ...codeMirrorConfiguration,
                    extraKeys: {
                        'Ctrl-Enter': () => {
                            run$.next()
                        },
                    },
                },
                requirements: {
                    scripts: [
                        'codemirror#5.52.0~mode/javascript.min.js',
                        'codemirror#5.52.0~mode/css.min.js',
                        'codemirror#5.52.0~mode/xml.min.js',
                        'codemirror#5.52.0~mode/htmlmixed.min.js',
                    ],
                    css: [],
                },
            })
        },
    }
}

export function script() {
    /**
     * This function should not use symbols defined outside this very function
     */
    this.innerHTML = ``
    const cdn = window['@youwol/cdn-client']
    const src = this.getAttribute('src')
    const { version, dependencies, renderFctTarget } = JSON.parse(
        this.getAttribute('data'),
    )
    console.log({ src, version, dependencies, renderFctTarget })
    cdn.install({
        modules: dependencies,
        css: [`@youwol/grapes-youwol-doc#${version}~src/lib/style.css`],
        scripts: [
            `@youwol/grapes-youwol-doc#${version}~dist/@youwol/grapes-youwol-doc/rendering.js`,
        ],
        aliases: {
            rendering: `@youwol/grapes-youwol-doc/rendering_APIv01`,
        },
    }).then(({ rendering }) => {
        rendering[renderFctTarget]({
            parent: this,
            src: src,
        })
    })
}
