/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

import 'jquery'; // importowanie biblioteki jQuery

declare global {
    interface JQuery {
        chromoselector(options?: any): any;
    }
}

// Sprawdzenie, czy metoda chromoselector istnieje, zanim zostanie użyta
if (typeof jQuery !== 'undefined' && jQuery.fn && typeof jQuery.fn.chromoselector !== 'undefined') {
    // Użycie metody chromoselector
    jQuery('.your-selector').chromoselector();
} else {
    console.warn('Metoda chromoselector nie istnieje lub biblioteka jQuery nie jest załadowana.');
    // Tutaj można podjąć odpowiednie działania w przypadku braku metody chromoselector lub biblioteki jQuery
}