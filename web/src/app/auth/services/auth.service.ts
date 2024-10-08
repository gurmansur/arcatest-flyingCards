import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador';
import { ColaboradorSignin } from '../models/colaborador-signin';
import { StakeholderSignin } from '../models/stakeholder-signin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  signinColaborador(colaboradorSignin: ColaboradorSignin): Observable<{
    accessToken: string;
    usu_email: string;
    usu_name: string;
    usu_id: number;
    usu_role: string;
    message: string;
  }> {
    return this.httpClient.post<{
      accessToken: string;
      usu_email: string;
      usu_name: string;
      usu_id: number;
      usu_role: string;
      message: string;
    }>(this.servicesRootUrl + '/signin-colaborador', colaboradorSignin, {
      responseType: 'json',
    });
  }

  signinStakeholder(stakeholderSignin: StakeholderSignin): Observable<any> {
    return this.httpClient.post<StakeholderSignin>(
      this.servicesRootUrl + '/signin-stakeholder',
      stakeholderSignin
    );
  }

  signup(colaborador: Colaborador): Observable<any> {
    return this.httpClient.post<Colaborador>(
      this.servicesRootUrl + '/signup',
      colaborador
    );
  }

  verifyLogin(): Observable<any> {
    return this.httpClient.get(this.servicesRootUrl + '/verify', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
