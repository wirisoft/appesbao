import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToUrl'
})
export class Base64ToUrlPipe implements PipeTransform {

  transform(base64String: string, contentType?: string): string {
    if (!base64String) return ''; // Manejo de caso si no hay cadena Base64

    // Determinar el tipo de contenido
    let type = contentType || 'image/jpeg';

    // Validar el tipo de contenido para asegurar que sea uno de los tipos admitidos
    if (!this.isValidContentType(type)) {
      type = 'image/jpeg'; // Si no es válido, usar JPEG como predeterminado
    }

    // Añadir la cabecera para el tipo de contenido de la imagen
    const base64Header = `data:${type};base64,`;

    // Concatenar la cabecera y la cadena Base64
    return base64Header + base64String;
  }

  private isValidContentType(type: string): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/svg+xml'];
    return validTypes.includes(type);
  }

}
