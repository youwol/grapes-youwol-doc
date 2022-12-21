import { VirtualDOM } from '@youwol/flux-view'
import { Subject } from 'rxjs'

export interface AppState {
    editCode: (param: {
        headerView: () => VirtualDOM
        content$: Subject<string>
        configuration: { [k: string]: unknown }
        requirements: {
            scripts: string[]
            css: string[]
        }
    }) => void
}
