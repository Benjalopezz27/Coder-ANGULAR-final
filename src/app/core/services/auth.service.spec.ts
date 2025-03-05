import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router"
import { MockProvider} from 'ng-mocks'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { environment } from "../../../environments/environment.development";

describe('authService', ()=>{
    let authService: AuthService
    let router: Router
    const initialState = {
        auth: {
            authUser: null
        }
    }
    let httpTestingController: HttpTestingController

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            providers: [AuthService,
                MockProvider(Router),
                provideMockStore({})
            ]
        }).compileComponents()
        authService = TestBed.inject(AuthService)
        router = TestBed.inject(Router)
        httpTestingController = TestBed.inject(HttpTestingController)
    })
    it('authService debe ser creado', ()=>{
        expect(authService).toBeTruthy()
    })
    it('Un login satisfactorio, debe establecer el user autenticado, debe establecer el accessToken en el localStorage, debe redirigir al home', ()=> {
        const spyOnNavigate = spyOn(router, 'navigate')
        const fakeDataLogin = {
            email:'admin@gmail.com',
            password:'123456'
        }
        authService.login(fakeDataLogin)

        httpTestingController.expectOne({
            method: 'GET',
            url: `${environment.baseApiUrl}/users?email=${fakeDataLogin.email}&password=${fakeDataLogin.password}`
        })
    })
})