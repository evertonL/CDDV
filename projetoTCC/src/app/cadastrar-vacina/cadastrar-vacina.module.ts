// MÓDULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { CadastrarVacinaComponent        } from './cadastrar-vacina.component';

import { rotas                          } from 'src/app/rotas';

const appRoutes = rotas

@NgModule({
  declarations: [
    CadastrarVacinaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ]
})
export class CadastrarVacinaModule { }