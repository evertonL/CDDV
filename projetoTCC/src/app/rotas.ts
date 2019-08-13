// COMPONENTES PADRÕES 
import { Routes } from '@angular/router';

import { AdministradorComponent               } from "./administrador/administrador.component";
import { CadastrarAdsComponent                } from "./cadastrar-ads/cadastrar-ads.component";
import { CadastrarPopulacaoComponent          } from "./cadastrar-populacao/cadastrar-populacao.component";
import { CadastrarUbsComponent                } from "./cadastrar-ubs/cadastrar-ubs.component";
import { CadastrarVacinaComponent             } from "./cadastrar-vacina/cadastrar-vacina.component";
import { CartaoPopulacaoComponent             } from './cartao-populacao/cartao-populacao.component';
import { LoginAdsComponent                    } from './login-ads/login-ads.component';
import { LoginPopulacaoComponent              } from './login-populacao/login-populacao.component';
import { LoginUbsComponent                    } from './login-ubs/login-ubs.component';
import { RelatorioUbsComponent                } from "./relatorio-ubs/relatorio-ubs.component";
import { TelaInicialComponent                 } from "./tela-inicial/tela-inicial.component";
import { WorkspaceUbsComponent                } from "./workspace-ubs/workspace-ubs.component";
import { WorkspaceAdsComponent                } from "./workspace-ads/workspace-ads.component";

export const rotas : Routes = [
    
    { path: ''                                  , component: TelaInicialComponent                  },
    { path: "login-ubs"                         , component: LoginUbsComponent                     },
    { path: "login-ads"                         , component: LoginAdsComponent                     },
    { path: "cadastrar-populacao"               , component: CadastrarPopulacaoComponent           },
    { path: "login-populacao"                   , component: LoginPopulacaoComponent               },
    { path: "workspace-ubs"                     , component: WorkspaceUbsComponent                 },
    { path: "workspace-ubs/cadastrar-ads"       , component: CadastrarAdsComponent                 },
    { path: "workspace-ubs/cadastrar-vacina"    , component: CadastrarVacinaComponent              },
    { path: "workspace-ubs/relatorio"           , component: RelatorioUbsComponent                 },
    { path: "workspace-ads"                     , component: WorkspaceAdsComponent                 },
    { path: "cartao-populacao"                  , component: CartaoPopulacaoComponent              },
    { path: "administrador"                     , component: AdministradorComponent                },
    { path: "administrador/cadastrar-ubs"       , component: CadastrarUbsComponent                 },
    { path: '', redirectTo :  ''                , pathMatch: 'full'                                }

];  