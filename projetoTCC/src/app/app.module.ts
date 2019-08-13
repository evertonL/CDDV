// MÓDULOS PADRÕES
import { BrowserModule    } from '@angular/platform-browser';
import { NgModule         } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule     } from '@angular/router';
import { FormsModule      } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// COMPONENTES PADRÕES
import { AppComponent     } from './app.component';

// MÓDULOS PERSONALIZADOS
import { TelaInicialModule } from './tela-inicial/tela-inicial.module';
import { LoginPopulacaoModule } from './login-populacao/login-populacao.module';
import { LoginAdsModule } from './login-ads/login-ads.module';
import { LoginUbsModule } from './login-ubs/login-ubs.module';
import { CadastrarPopulacaoComponent } from './cadastrar-populacao/cadastrar-populacao.component';
import { CadastrarAdsComponent } from './cadastrar-ads/cadastrar-ads.component';
import { CadastrarUbsComponent } from './cadastrar-ubs/cadastrar-ubs.component';
import { CadastrarVacinaComponent } from './cadastrar-vacina/cadastrar-vacina.component';
import { CartaoPopulacaoModule } from './cartao-populacao/cartao-populacao.module';
import { WorkspaceUbsComponent } from './workspace-ubs/workspace-ubs.component';
import { WorkspaceAdsComponent } from './workspace-ads/workspace-ads.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { RelatorioUbsComponent } from './relatorio-ubs/relatorio-ubs.component';

import { rotas            } from './rotas';

const appRoutes = rotas

@NgModule({
  declarations: [
    AppComponent,
    CadastrarPopulacaoComponent,
    CadastrarAdsComponent,
    CadastrarUbsComponent,
    CadastrarVacinaComponent,
    WorkspaceUbsComponent,
    WorkspaceAdsComponent,
    AdministradorComponent,
    RelatorioUbsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    
    TelaInicialModule,
    LoginPopulacaoModule,
    LoginAdsModule,
    LoginUbsModule,
    CartaoPopulacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
