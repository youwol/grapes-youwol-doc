import { CoverPageView, ErrorView, TextWithAppHeaderView } from './views'
import { render } from '@youwol/flux-view'

export async function renderAppComponent({
    parent,
    src,
}: {
    parent: HTMLElement
    src: string
}) {
    const { url } = await new Function(src)()(window)
    if (url == '') {
        const element = document.createElement('div')
        element.innerText = 'Please provide a valid url'
        parent.appendChild(element)
        return
    }
    const iframe: HTMLIFrameElement = document.createElement('iframe')
    iframe.src = url
    iframe.classList.add('p-2')
    iframe.width = '100%'
    iframe.height = '100%'
    parent.appendChild(iframe)
}

export async function renderCoverPageComponent({
    parent,
    src,
}: {
    parent: HTMLElement
    src: string
}) {
    const usualNpmGithubCdn = (packageName) => {
        return {
            github: `https://github.com/${packageName.replace('@', '')}`,
            npm: `https://www.npmjs.com/package/${packageName}`,
            cdn: `https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=${packageName}`,
        }
    }

    try {
        const parsedFct = new Function(src)()
        const obj = await parsedFct({ usualNpmGithubCdn, ...window })
        const coverView = new CoverPageView(obj)
        parent.appendChild(render(coverView))
    } catch (e) {
        const vDom = new ErrorView({
            reason: 'Error occurred while parsing the source code of the component',
        })
        parent.appendChild(render(vDom))
    }
}

export async function renderTextAppHeaderComponent({
    parent,
}: {
    parent: HTMLElement
    src: string
}) {
    const vDom = new TextWithAppHeaderView()
    parent.appendChild(render(vDom))
}
