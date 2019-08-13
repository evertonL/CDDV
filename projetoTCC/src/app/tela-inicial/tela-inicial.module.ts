// MÓDULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { TelaInicialComponent        } from './tela-inicial.component';

import { rotas                          } from 'src/app/rotas';

const appRoutes = rotas

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ]
})
export class TelaInicialModule { }