import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [];
  accion = "Agregar";
  form: FormGroup;
  id:number|undefined;

  constructor(private fb: FormBuilder,private toastr: ToastrService, private _tarjetaService: TarjetaService ) { 
    this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta:['',[ Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion:['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.ObtenerTarjetas();
  }

  ObtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data=>
      {
          console.log(data);
          this.listTarjetas = data;
      },error=>{
        console.log(error);
      } 
      );
  }

  guardarTarjeta(){
    console.log(this.form);
    console.log(this.id);
    const tarjeta:any = {
      titular : this.form.get('titular')?.value,
      numeroTarjeta :  this.form.get('numeroTarjeta')?.value,
      fechaExpiracion : this.form.get('fechaExpiracion')?.value,
      cvv : this.form.get('cvv')?.value
    }
    if(this.id == undefined)
    {
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(
        data=>{
          this.toastr.success("La tarjeta fue registrada con exito.","Tarjeta Credito");
          this.ObtenerTarjetas();
          this.form.reset();
        
      }, error=>{
        this.toastr.error("Error guardando tarjeta", "Guardando Tarjeta");
        console.log(error);
      });
    }
    else
    {
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(
        data=>{
          this.toastr.success("La tarjeta fue actualizada con exito.","Tarjeta Credito");
          this.ObtenerTarjetas();
          this.form.reset();
        this.accion = "agregar";
        this.id = undefined;
      }, error=>{
        this.toastr.error("Error guardando tarjeta", "Guardando Tarjeta");
        console.log(error);
      });
    }
    console.log(tarjeta);
    
    

  }

  eliminarTarjeta(id:number){
    console.log(id);
    this._tarjetaService.deleteTarjeta(id).subscribe(data=>{
      this.toastr.error("La tarjeta fue eliminada.","Tarjeta Eliminada");
      console.log(data);
      this.ObtenerTarjetas();
    },
    error=>{
      console.log(error);
    }
    );

    //this.listTarjetas.splice(index, 1);
    
  }

  editarTarjeta(tarjeta:any){
    this.accion = "Editar";
    this.id = tarjeta.id  ;
    console.log(tarjeta);
    this.form.patchValue({
      titular : tarjeta.titular,
      numeroTarjeta : tarjeta.numeroTarjeta,
      cvv : tarjeta.cvv,
      id : tarjeta.id,
      fechaExpiracion : tarjeta.fechaExpiracion
    });
  }

}
