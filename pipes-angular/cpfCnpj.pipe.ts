import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "CPFCNPJ", //identificador do Pipe
})

export class CpfCnpjPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      if (value.length === 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4"); //CPF
      } else {
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5"); //CNPJ
      }     
    }
    return value;
  }
}
