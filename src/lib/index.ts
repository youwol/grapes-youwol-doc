import { CoverPageBlock, SimplePageBlock, TextAndAppPageBlock } from './blocks'
import {
    CoverPageComponent,
    AppComponent,
    TextAppHeaderComponent,
} from './components'

export function getBlocks() {
    return [CoverPageBlock, SimplePageBlock, TextAndAppPageBlock]
}

export function getComponents() {
    return [CoverPageComponent, AppComponent, TextAppHeaderComponent]
}
