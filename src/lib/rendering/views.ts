import { attr$, VirtualDOM } from '@youwol/flux-view'
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs'

export class TextWithAppHeaderView {
    public readonly class = 'd-flex flex-column justify-content-center py-1'
    public readonly children: VirtualDOM[]
    public readonly selected$: BehaviorSubject<{ text: boolean; app: boolean }>
    public readonly connectedCallback: (htmlElement: HTMLElement) => void
    public readonly htmlContainerElement$ = new ReplaySubject<HTMLDivElement>(1)

    constructor() {
        this.selected$ = new BehaviorSubject({ text: true, app: true })
        const commonClasses =
            'mx-2 fv-pointer p-2 fv-hover-bg-background fv-text-primary fv-bg-background-alt rounded'

        combineLatest([this.selected$, this.htmlContainerElement$]).subscribe(
            ([mode, container]) => {
                const elems = [
                    '.grapes-yw-doc_app_column',
                    '.grapes-yw-doc_text_column',
                ]

                elems.forEach((selector) => {
                    container.querySelector(selector).classList.add('d-none')
                })
                if (mode.app) {
                    container.querySelector(elems[0]).classList.remove('d-none')
                }
                if (mode.text) {
                    container.querySelector(elems[1]).classList.remove('d-none')
                }
            },
        )
        this.children = [
            {
                class: attr$(
                    this.selected$,
                    (selected): string =>
                        selected.text ? 'fv-text-focus' : '',
                    {
                        wrapper: (d) =>
                            `${d} fas fa-align-justify ${commonClasses}`,
                    },
                ),
                onclick: () => {
                    const actual = this.selected$.value
                    this.selected$.next({ text: !actual.text, app: actual.app })
                },
            },
            {
                class: attr$(
                    this.selected$,
                    (selected): string => (selected.app ? 'fv-text-focus' : ''),
                    {
                        wrapper: (d) => `${d} fas fa-play ${commonClasses}`,
                    },
                ),
                onclick: () => {
                    const actual = this.selected$.value
                    this.selected$.next({ text: actual.text, app: !actual.app })
                },
            },
        ]
        this.connectedCallback = (element: HTMLElement) => {
            this.htmlContainerElement$.next(
                element.parentElement.parentElement as HTMLDivElement,
            )
        }
    }
}

export class TitleView implements VirtualDOM {
    public readonly class = 'w-100'
    public readonly children: VirtualDOM[]

    constructor(params: {
        title: string
        subTitle: string
        npm: string
        github: string
        cdn: string
    }) {
        Object.assign(this, params)
        const icons = {
            npm: 'fab fa-npm fa-2x',
            github: 'fab fa-github fa-2x',
            cdn: 'fas fa-box fa-2x',
        }
        const usualLinks = [
            { name: 'npm', link: params.npm },
            { name: 'github', link: params.github },
            { name: 'cdn', link: params.cdn },
        ]
            .filter(({ link }) => link != undefined)
            .map(({ name, link }) => {
                return {
                    tag: 'a',
                    class: icons[name],
                    target: '_blank',
                    href: link,
                }
            })
        this.children = [
            {
                tag: 'h1',
                innerText: params.title,
            },
            {
                tag: 'h3',
                innerText: params.subTitle,
            },
            {
                class: 'mx-auto w-50 d-flex justify-content-around my-3',
                children: usualLinks,
            },
        ]
    }
}

export class SynopsisView implements VirtualDOM {
    public readonly class = 'w-100 text-justify'
    public readonly children: VirtualDOM[]

    constructor(params: { synopsis: string[] }) {
        this.children = [
            {
                style: {
                    fontSize: 'x-large',
                    fontWeight: 'bolder',
                },
                innerText: 'Abstract',
            },
            ...params.synopsis
                .filter(({ link }) => link != undefined)
                .map((content) => {
                    return {
                        tag: 'p',
                        innerHTML: content.replace('\n', ''),
                    }
                }),
        ]
    }
}

export class CoverPageView implements VirtualDOM {
    public readonly class =
        'w-100 h-100 text-center grapes-yw-doc_page overflow-auto'
    public readonly children: VirtualDOM[]
    constructor(params: {
        title: string
        subTitle: string
        synopsis: string[]
        npm: string
        github: string
        cdn: string
        extraLinks: { name: string; url: string }[]
    }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'd-flex flex-column justify-content-around grapes-yw-doc_content mx-auto',
                children: [
                    new TitleView(params),
                    params.synopsis && new SynopsisView(params),
                ].filter((d) => d != undefined),
            },
        ]
    }
}

export class ErrorView implements VirtualDOM {
    public readonly class =
        'w-100 h-100 d-flex flex-column justify-content-around fv-text-error text-center'
    public readonly children: VirtualDOM[]

    constructor(params: { reason: string }) {
        this.children = [
            {
                innerText:
                    "An error occurred while processing the 'cover-page' component",
            },
            {
                innerText: params.reason,
            },
        ]
    }
}
