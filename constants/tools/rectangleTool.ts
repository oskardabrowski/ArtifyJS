import { Canvas } from "fabric/fabric-impl";
import { Tool } from './tool';

// TODO Handle crossing x or y

/*
 *
 * Free drawing rectangle tool constructor class
 *
 */
export class RectangleTool extends Tool {
    constructor(editor: Canvas | null) {
        super(editor, 'Rect')
        this.editor = editor;
    }
}