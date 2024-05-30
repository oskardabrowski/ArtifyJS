import { Canvas } from "fabric/fabric-impl";
import { Tool } from './tool';

// TODO Handle crossing x or y

/*
 *
 * Free drawing circle tool constructor class
 *
 */
export class EllipseTool extends Tool {
    constructor(editor: Canvas | null) {
        super(editor, 'Ellipse')
        this.editor = editor;
    }
}