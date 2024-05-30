import { Canvas } from "fabric/fabric-impl";
import { Tool } from './tool';

// TODO Handle crossing x or y

/*
 *
 * Free drawing triangle tool constructor class
 *
 */
export class TriangleTool extends Tool {
    constructor(editor: Canvas | null) {
        super(editor, 'Triangle')
        this.editor = editor;
    }
}