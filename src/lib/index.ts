import { CoverPageBlock, Blocks, TextAndAppPageBlock } from './blocks'
import {
    CoverPageComponent,
    AppComponent,
    TextAppHeaderComponent,
} from './components'

export function getBlocks() {
    return [CoverPageBlock, Blocks, TextAndAppPageBlock]
}

export function getComponents() {
    return [CoverPageComponent, AppComponent, TextAppHeaderComponent]
}
