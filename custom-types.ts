import 'jquery';

declare global {
    interface JQuery {
        chromoselector(options?: any): any;
    }
}

if (typeof jQuery !== 'undefined' && jQuery.fn && typeof jQuery.fn.chromoselector !== 'undefined') {
    jQuery('.your-selector').chromoselector();
} else {
    console.warn('Metoda chromoselector nie istnieje lub biblioteka jQuery nie jest załadowana.');
}