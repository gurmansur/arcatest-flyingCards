import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from 'src/app/shared/card/card.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { PlusIconComponent } from '../../../shared/icons/plus-icon/plus-icon.component';
import { ProjectHeaderComponent } from '../../../shared/project-header/project-header.component';
import {
  CasoDeTeste,
  ECategoria,
  EComplexidade,
  EPrioridade,
  ETecnica,
} from '../../models/casoDeTeste';
import { casoUso } from '../../models/casoUso';
import { Colaborador } from '../../models/colaborador';
import { PlanoDeTeste } from '../../models/planoDeTeste';
import { SuiteDeTeste } from '../../models/suiteDeTeste';
import { CasoDeTesteService } from '../../services/casoDeTeste.service';
import { CasoUsoService } from '../../services/casoUso.service';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-arcatest-casos-form',
  standalone: true,
  templateUrl: './arcatest-casos-form.component.html',
  styleUrl: './arcatest-casos-form.component.css',
  imports: [
    ProjectHeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    PlusIconComponent,
    ButtonComponent,
  ],
})
export class ArcatestCasosFormComponent {
  projectId!: number;
  idCaso!: number;
  isEdit: boolean = false;
  casoDeTesteFormGroup: any;
  formBuilder: FormBuilder = new FormBuilder();
  casoDeTeste?: CasoDeTeste;
  planosDeTeste: PlanoDeTeste[] = [];
  suites: SuiteDeTeste[] = [];

  testadores: Colaborador[] = [];

  mockupData: CasoDeTeste[] = [];
  casosDeUso: casoUso[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly casoDeTesteService: CasoDeTesteService,
    private readonly casoDeUsoService: CasoUsoService,
    private readonly projetoService: ProjetoService
  ) {
    this.projectId = this.route.parent?.snapshot.params['id'];
    this.idCaso = this.route.snapshot.params['idCaso'];
    this.isEdit = !!this.idCaso;

    this.getCasosDeUso();
    this.getColaboradores();
  }

  navigateToArcaTest() {
    this.router.navigate([
      '/dashboard/projeto/',
      this.projectId,
      'painel-arcatest',
    ]);
  }

  getCasosDeUso() {
    this.casoDeUsoService.list().subscribe({
      next: (casos) => {
        this.casosDeUso = casos.items;
      },
    });
  }

  getColaboradores() {
    this.projetoService.getColaboradoresByProjeto(this.projectId).subscribe({
      next: (colaboradores) => {
        this.testadores = colaboradores.items;
      },
    });
  }

  createTestCase() {
    this.casoDeTesteService.create(this.casoDeTesteFormGroup.value).subscribe({
      next: () => {
        this.navigateToTestCases();
      },
    });
  }

  updateTestCase() {
    this.casoDeTesteService
      .update(this.idCaso, this.casoDeTesteFormGroup.value)
      .subscribe({
        next: () => {
          this.navigateToArcaTest();
        },
      });
  }

  getCase() {
    this.casoDeTesteService.getById(this.idCaso).subscribe({
      next: (caso) => {
        this.casoDeTeste = caso;
        this.createFormGroup();
      },
    });
  }

  createFormGroup() {
    this.casoDeTesteFormGroup = this.formBuilder.group({
      nome: new FormControl(this.casoDeTeste?.nome || '', Validators.required),
      descricao: new FormControl(
        this.casoDeTeste?.descricao || '',
        Validators.required
      ),
      preCondicao: new FormControl(this.casoDeTeste?.preCondicao || ''),
      posCondicao: new FormControl(this.casoDeTeste?.posCondicao || ''),
      prioridade: new FormControl(
        this.casoDeTeste?.prioridade || EPrioridade.BAIXA,
        Validators.required
      ),
      complexidade: new FormControl(
        this.casoDeTeste?.complexidade || EComplexidade.SIMPLES,
        Validators.required
      ),
      tecnica: new FormControl(
        this.casoDeTeste?.tecnica || ETecnica.FUNCIONAL,
        Validators.required
      ),
      metodo: new FormControl(
        this.casoDeTeste?.metodo || ECategoria.MANUAL,
        Validators.required
      ),
      suiteDeTesteId: this.route.snapshot.queryParams['suiteId'] || '',
      testadorDesignadoId: new FormControl(
        this.casoDeTeste?.testadorDesignadoId || ''
      ),
      observacoes: new FormControl(this.casoDeTeste?.observacoes || ''),
      resultadoEsperado: new FormControl(
        this.casoDeTeste?.resultadoEsperado || '',
        Validators.required
      ),
      dadosEntrada: new FormControl(
        this.casoDeTeste?.dadosEntrada || '',
        Validators.required
      ),
      casoDeUsoId: new FormControl(this.casoDeTeste?.casoDeUsoId || ''),
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      this.getCase();
    }
    this.createFormGroup();
  }

  get nome() {
    return this.casoDeTesteFormGroup.get('nome');
  }

  get descricao() {
    return this.casoDeTesteFormGroup.get('descricao');
  }

  get preCondicao() {
    return this.casoDeTesteFormGroup.get('preCondicao');
  }

  get posCondicao() {
    return this.casoDeTesteFormGroup.get('posCondicoes');
  }

  get prioridade() {
    return this.casoDeTesteFormGroup.get('prioridade');
  }

  get complexidade() {
    return this.casoDeTesteFormGroup.get('complexidade');
  }

  get tecnica() {
    return this.casoDeTesteFormGroup.get('tecnica');
  }

  get suite() {
    return this.casoDeTesteFormGroup.get('suite');
  }

  get testador() {
    return this.casoDeTesteFormGroup.get('testador');
  }

  get dataCriacao() {
    return this.casoDeTesteFormGroup.get('dataCriacao');
  }

  get observacoes() {
    return this.casoDeTesteFormGroup.get('observacoes');
  }

  get resultadoEsperado() {
    return this.casoDeTesteFormGroup.get('resultadoEsperado');
  }

  get entrada() {
    return this.casoDeTesteFormGroup.get('entrada');
  }

  get isFormValid() {
    return this.casoDeTesteFormGroup.valid;
  }

  navigateToTestCases() {
    this.router.navigate([
      '/dashboard/projeto/',
      this.projectId,
      'painel-arcatest',
      'arvore',
    ]);
  }
}
